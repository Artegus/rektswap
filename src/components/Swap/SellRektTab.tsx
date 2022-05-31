import { FC, useRef, useState, useEffect } from "react";
import {
    Button, FormControl, Heading,
    HStack, Input, InputRightElement, Text, VStack,
    Box, useDisclosure, useToast, Alert, Spinner,
	AlertTitle
} from "@chakra-ui/react";

import { Contract, utils, BigNumberish } from 'ethers'
import { Trade, TradeType, TokenAmount, Route, Fetcher, WETH, ChainId, Token } from '@uniswap/sdk'

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";

import REKT_COIN_BATCH_ABI from '../../abis/rektcoinBatch.json';
import REKT_COIN_ABI from '../../abis/rektcoin.json';
import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
import { Props } from "../../types/TabProps/TabProps";

import { useSwapStore } from '../../stores/SwapStore';
import { useOrdersStore } from "../../stores/OrdersStore";
import { OrderHistory } from "../OrderHistory/OrderHistory";
import { ACTION_TABS } from "./responsive/breakpoints";


export const formatBal = (bal: number, decimals: number): string => {
    const balStr = bal.toString();
    const decimalPos = balStr.search("\\.");
    return balStr.substring(0, decimalPos + decimals + 1);
}


const rektBalanceDecimalsToShow = 2;
export const formatRekt = (bal: number): string => {
    return formatBal(bal, rektBalanceDecimalsToShow);
}

export const getRektCoinContract = (library: any): any => {
    return new Contract(
        defaultContracts.REKT_COIN.address,
        REKT_COIN_ABI,
        library?.getSigner()
    );
}


export const SellRektTab: FC<Props> = ({
    tabTitle
}) => {

    const [userInputSellAmount, setUserInputSellAmount] = useState<string>("");
    const [expectedOutput, setExpectedOutput] = useState<string>("")
    const [allowedTosell, setAllowedTosell] = useState<boolean>(false);
    const timeRef = useRef<number | undefined>(undefined);

    const { active, library, account } = useWeb3React<Web3Provider>();
    const [rektBal, setRektBal] = useState<number | null>(null);
	const { addTransaction } = useOrdersStore();

    const { setLastTx } = useSwapStore();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

    const getCurrentRektContract = (): any => getRektCoinContract(library);

    const updateBals = async (addr: string | null | undefined) => {
        if (!active)
            setRektBal(null);
        else if (typeof addr === "string") {
            const rektCoin = getCurrentRektContract();
            const bal = await rektCoin.balanceOf(addr);
            setRektBal(parseFloat(utils.formatUnits(bal)));
        }
    }


    const chainId = ChainId.KOVAN;
    const wethToken = WETH[chainId];

    const updateOutputAmount = async () => {
        const amount = utils.parseEther(userInputSellAmount.toString());
        const rektCoin = new Token(chainId, defaultContracts.REKT_COIN.address, 18);
        const pairWethRekt = await Fetcher.fetchPairData(wethToken, rektCoin);
        const routeWethRekt = new Route([pairWethRekt], rektCoin);

        const trade = new Trade(
            routeWethRekt, new TokenAmount(rektCoin, amount.toString()), TradeType.EXACT_INPUT
        );
        const { outputAmount } = trade;
        const parsedOutputAmount = outputAmount.toSignificant(6);

        setExpectedOutput(parsedOutputAmount);
    }

    const onKeyUpInputAmount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        window.clearTimeout(timeRef.current)

        timeRef.current = window.setTimeout(async () => {
            if (value !== "" && userInputSellAmount !== "")
                await updateOutputAmount();
            else setExpectedOutput("");
        }, 1000)
    }

    const sellRektCoin = async () => {
        const rektBatchet = new Contract(
            defaultContracts.REKT_TRANSACTION_BATCHER.address,
            REKT_COIN_BATCH_ABI,
            library?.getSigner()
        );
        const amount = utils.parseEther(userInputSellAmount);
        try {
            const swapTx = await rektBatchet.functions["sellRektCoin"](amount);
            setLastTx(swapTx);
            setRektBal(
                (currentBal: number | null) => currentBal !== null ?
                    currentBal - parseFloat(userInputSellAmount) : null
            );
			console.log('Txn: ', swapTx);
			toast({
				title: 'Selling REKTcoin',
				duration: 9000000,
				render: () => (
					<Alert borderRadius='md'>
						<Spinner pr={2} mr={2}/>
					  	<AlertTitle>Selling REKTcoin</AlertTitle>
					</Alert>
				)
			});
			const tx = await swapTx.wait();
			addTransaction(tx);
			toast.closeAll();
			toast({
				title: 'Sell order submited',
				description: `You submited an ${
					formatRekt(parseFloat(utils.formatUnits(tx.logs[0].data)))
				} REKT sell order to the batcher, you can see its status at the recent orders tab`, 
				status: 'success',
				duration: 7000,
				isClosable: true
			});
        } catch (e) {
            console.error(e);
			toast.closeAll();
			toast({
				title: 'Transaction error',
				description: 'There was an error processing your transaction',
				status: 'error'
			});
        }
    }

    const approveAllowance = async (): Promise<void> => {
        const rektContract: Contract = getRektCoinContract(library!);

        try {
            const txApprove = await rektContract.functions["approve"](
                defaultContracts.REKT_TRANSACTION_BATCHER.address,
                utils.parseEther("99999")
            );
            console.log(txApprove);
            setAllowedTosell(true);
        } catch (e) {
            console.error(e)
            setAllowedTosell(false);
        }
    }

    const checkAllowance = async () => {
        const rektContract: Contract = getRektCoinContract(library!);
        try {
            const allowanceAmount: BigNumberish = await rektContract.functions["allowance"](account, defaultContracts.REKT_TRANSACTION_BATCHER.address);
            const amountAllowed = utils.parseEther(allowanceAmount.toString());
            const isAprroved = amountAllowed.gt(utils.parseEther("1"));
            setAllowedTosell(isAprroved);
        } catch (e) {
            console.error(e);
            setAllowedTosell(false);
        }
    }

    const renderActionButton = () => {
        return <Button
            size="md"
            w="full"
            onClick={allowedTosell ? sellRektCoin : approveAllowance}
        >
            {allowedTosell ? "Sell" : "Approve"}
        </Button>
    }

    useEffect(() => {
        if (active && typeof account === 'string') {
            checkAllowance();
        }
    }, [account, active])

    useEffect(() => { updateBals(account); }, [account, active]);

    return (
        <VStack
            spacing={4}
            alignItems="stretch"
        >
            <HStack
                p={ACTION_TABS.HStackGeneralPadding}
                w="full"
                justifyContent="space-between"
            >
                <Heading
                    size="md"
                    fontSize={ACTION_TABS.HeadingFontSize}
                >{tabTitle}</Heading>
                <Box textAlign={"right"} fontSize={ACTION_TABS.BoxFontSize} >
                    {rektBal === null ? "" : `REKT balance: ${formatRekt(rektBal)}`}
                </Box>
            </HStack>

            <HStack px={ACTION_TABS.HStackLeftRightPadding} >
                <FormControl>
                    <Input
                        pr='4.5rem'
                        h='3rem'
                        placeholder="0.0"
                        _placeholder={{ fontWeight: 'bold' }}
                        type="number"
                        onKeyUp={onKeyUpInputAmount}
                        onChange={(e) => setUserInputSellAmount(e.currentTarget.value.trim())}
                        value={userInputSellAmount}
                    />
                    <InputRightElement
                        width='auto'
                        h='full'
                        px={1}
                    >
                        <Button
                            h='2.5rem' size='md'
                            disabled
                        >
                            <Text>REKT</Text>
                        </Button>
                    </InputRightElement>
                </FormControl>
            </HStack>

            <HStack px={ACTION_TABS.HStackLeftRightPadding} >
                <FormControl>
                    <Input
                        pr='4.5rem'
                        h='3rem'
                        disabled
                        placeholder="0.0"
                        _placeholder={{ fontWeight: 'bold' }}
                        type="number"
                        value={expectedOutput}
                    />
                    <InputRightElement
                        width='auto'
                        h='full'
                        px={1}
                    >
                        <Button
                            h='2.5rem' size='md'
                            disabled
                        >
                            <Text>ETH</Text>
                        </Button>
                    </InputRightElement>
                </FormControl>
            </HStack>

            <HStack px={ACTION_TABS.HStackLeftRightPadding} paddingTop={2} paddingBottom={5} >
                {!active ?
                    <ConnectWallet
                        size="md"
                        w="full"
                    /> :
                    renderActionButton()
                }
            </HStack>
			<OrderHistory isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </VStack>
    )
}
