import { FC, useRef, useEffect } from "react";
import {
    VStack, useToast, 
    Alert, AlertTitle,
    Spinner, useColorModeValue
} from "@chakra-ui/react";

import { Contract, utils } from 'ethers';
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { useOrdersStore } from "../../stores/OrdersStore";
import { getTrade } from "../../utils/getTrade";
import { useSwapStore } from "../../stores/SwapStore";
import { InputSwap } from "./InputSwap/InputSwap";
import { FormatUtils } from "../../utils/FormatUtils";
import { HeaderTabSwap } from "./HeaderTabSwap/HeaderTabSwap";
import { ActionSwap } from "./ActionSwap/ActionSwap";

import { Props } from "../../types/TabProps/TabProps";

import { WETH, REKTCOIN, UNISWAPV2 } from "../../config/constants/tokenLists/default.contracts";
import UNISWAPV2ROUTER_ABI from '../../abis/IUniswapV2Router.json'
import { ValidationUtils } from "../../utils/ValidationUtils";
import { TransactionResponse } from "../../types/TransactionTypes";


export const BuyRektTab: FC<Props> = ({
    tabTitle
}) => {

    const {
        ethBalance, swap: { inputAmount, outputAmount },
        setBuyInputAmount, setBuyOutputAmount, setEthBalance
    } = useSwapStore();

    const { addTransaction } = useOrdersStore();
    const toast = useToast({
        variant: 'defaultToast',
    });

    const toastColor = useColorModeValue('#F3EDFC', '#1a263c')

    const timeRef = useRef<undefined | number>(undefined);
    const { active, library, account } = useWeb3React<Web3Provider>();

    const updateEthBalance = async () => {
        if (account) {
            const balance = await library!.getBalance(account);
            setEthBalance(utils.formatUnits(balance));
        } else {
            setEthBalance('');
        }
    }


    const onKeyUpInputAmount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        window.clearTimeout(timeRef.current)

        timeRef.current = window.setTimeout(async () => {
            if (value !== "" && inputAmount !== "" && inputAmount !== "0") {
                await updateOutputAmount();
            } else {
                setBuyOutputAmount("");
            }
        }, 1000)
    }

    const updateOutputAmount = async () => {
        const amount = utils.parseEther(inputAmount);
        const trade = await getTrade(amount, 'buy');
        const { outputAmount: output } = trade;
        const parsedOutputAmount = output.toFixed(2);
        setBuyOutputAmount(parsedOutputAmount);
    }

    const swapWithUniswapRouterV2 = async () => {
        const signer = library?.getSigner();
        const uniswapRouterV2 = new Contract(
            UNISWAPV2, UNISWAPV2ROUTER_ABI, signer
        );
        const currentTimeStamp = new Date().getTime() / 1000;
        const minutes = 3;
        const seconds = 60 * minutes;
        const deadLine = new Date((currentTimeStamp + seconds) * 1000).getTime();
        const path = [WETH, REKTCOIN];
        const overrides = {
            value: utils.parseEther(inputAmount)
        };
        try {
            const swapTx: TransactionResponse = await uniswapRouterV2.functions[
                "swapExactETHForTokensSupportingFeeOnTransferTokens"
            ](
                0,
                path,
                account,
                deadLine,
                overrides
            );

            setEthBalance(utils.formatUnits(
                utils.parseEther(ethBalance)
                .sub(utils.parseEther(inputAmount)))
            );

            toast({
                title: 'Buying REKTcoin',
                duration: 9000000,
                position: 'top',
                render: () => (
                    <Alert
                        borderRadius='md'
                        opacity='1'
                        bgColor={toastColor}
                    >
                        <Spinner pr={2} mr={2} />
                        <AlertTitle>Buying REKTcoin</AlertTitle>
                    </Alert>
                )
            });
            const tx = await swapTx.wait();
            addTransaction(tx);
            toast.closeAll();
            toast({
                title: 'Buy completed',
                description: `You bought 
                ${FormatUtils.formatRekt(utils.formatUnits(tx.logs[4].data))} 
                REKT for ${FormatUtils.formatEth(utils.formatUnits(tx.logs[2].data))} MATIC`,
                status: 'success',
                position: 'top',
                isClosable: true,
            });
        } catch (e) {
            console.error(e);
            toast.closeAll();
            toast({
                title: 'Transaction error',
                position: 'top',
                description: 'There was an error processing your transaction',
                status: 'error',
                isClosable: true
            });
        }
    }

    const setInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        if (ValidationUtils.validateNumber(value)) {
            setBuyInputAmount(value);
        } else {
            setBuyInputAmount('');
        }
    }

    useEffect(() => {
        if (account) {
            updateEthBalance();
        }
    }, [account, active]);

    return (
        <VStack
            spacing={4}
            alignItems="stretch"
        >
            <HeaderTabSwap
                tabTitle={tabTitle}
                tokenName='MATIC'
                balance={ethBalance}
            />
            <InputSwap
                tokenName="MATIC"
                amount={inputAmount}
                setAmount={setInputAmount}
                updateOutputAmount={onKeyUpInputAmount}
            />
            <InputSwap
                tokenName="REKT"
                amount={outputAmount}
                inputProps={{ isDisabled: true }}
            />
            <ActionSwap
                active={active}
                actionTab={{
                    text: 'Buy',
                    handleOnClick: swapWithUniswapRouterV2
                }}
            />
        </VStack>
    )
}
