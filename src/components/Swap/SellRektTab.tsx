import { FC, useRef, useState, useEffect } from "react";
import {
    Button, FormControl, Heading,
    HStack, Input, InputRightElement, Text, VStack,
    Box, useToast, Alert, Spinner,
    AlertTitle,
    Tooltip
} from "@chakra-ui/react";

import { utils, BigNumberish } from 'ethers'
import { Trade, TradeType, TokenAmount, Route, Fetcher, WETH, ChainId, Token } from '@uniswap/sdk'

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";

import { REKTCOIN, REKT_TX_BATCHER } from "../../config/constants/tokenLists/default.contracts";
import { Props } from "../../types/TabProps/TabProps";
import { useOrdersStore } from "../../stores/OrdersStore";
import { useRektContract, useRektTxsBatcherContract } from '../../hooks/useContract';
import { ACTION_TABS } from "./responsive/breakpoints";
import { useTxsBatcherStore } from "../../stores/TransactionBatcherStore";


export const formatBal = (bal: number, decimals: number): string => {
    const balStr = bal.toString();
    const decimalPos = balStr.search("\\.");
    return balStr.substring(0, decimalPos + decimals + 1);
}

const rektBalanceDecimalsToShow = 2;
export const formatRekt = (bal: number): string => {
    return formatBal(bal, rektBalanceDecimalsToShow);
}

export const SellRektTab: FC<Props> = ({
    tabTitle
}) => {

    const [userInputSellAmount, setUserInputSellAmount] = useState<string>("");
    const [expectedOutput, setExpectedOutput] = useState<string>("")
    const [allowedTosell, setAllowedTosell] = useState<boolean>(false);
    const timeRef = useRef<number | undefined>(undefined);

    const { active, account } = useWeb3React<Web3Provider>();
    const [rektBal, setRektBal] = useState<number | null>(null);
    const { addTransaction } = useOrdersStore();

    const toast = useToast();

    const rektContract = useRektContract();
    const rektTxsBatcherContract = useRektTxsBatcherContract();
    const { updateRektBatcherStatus, statusBatcher } = useTxsBatcherStore();


    const updateBals = async (addr: string | null | undefined) => {
        if (!active)
            setRektBal(null);
        else if (typeof addr === "string") {
            if (rektContract) {
                const balance = await rektContract.balanceOf(addr);
                setRektBal(parseFloat(utils.formatUnits(balance)));
            }
        }
    }

    const chainId = ChainId.KOVAN;
    const wethToken = WETH[chainId];

    const updateOutputAmount = async () => {
        const amount = utils.parseEther(userInputSellAmount.toString());
        const rektCoin = new Token(chainId, REKTCOIN, 18);
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
        if (rektTxsBatcherContract && userInputSellAmount !== '') {
            const amount = utils.parseEther(userInputSellAmount);
            updateRektBatcherStatus()

            try {
                const swapTx = await rektTxsBatcherContract.sellRektCoin(amount);
                setRektBal(
                    (currentBal: number | null) => currentBal !== null ?
                        currentBal - parseFloat(userInputSellAmount) : null
                );
                toast({
                    title: 'Selling REKTcoin',
                    duration: 9000000,
                    position: 'top',
                    render: () => (
                        <Alert borderRadius='md'>
                            <Spinner pr={2} mr={2} />
                            <AlertTitle>Selling REKTcoin</AlertTitle>
                        </Alert>
                    )
                });
                const tx = await swapTx.wait();
                addTransaction(tx);
                toast.closeAll();
                toast({
                    title: 'Sell order submited',
                    description: `You submited an ${formatRekt(parseFloat(utils.formatUnits(tx.logs[0].data)))
                        } REKT sell order to the batcher, you can see its status at the recent orders tab`,
                    status: 'success',
                    duration: 7000,
                    isClosable: true,
                    position: 'top',
                });
            } catch (e) {
                toast.closeAll();
				const fee = utils.formatUnits(await rektTxsBatcherContract.getCurrentRektFee())
				if(parseFloat(userInputSellAmount) < parseFloat(fee))
					toast({
						position: 'top',
						title: `The minimum sell amount is ${fee} REKT`,
						status: 'error'
					})
				else
					toast({
						position: 'top',
						title: 'Transaction error',
						description: 'There was an error processing your transaction',
						status: 'error'
					});
            }
        }

    }

    const approveAllowance = async (): Promise<void> => {
        if (rektContract) {
            try {
                const tx = await rektContract.approve(REKT_TX_BATCHER, utils.parseEther('9999'));
                await tx.wait();
                setAllowedTosell(true);
            } catch (approveError) {
                setAllowedTosell(false);
            }
        }
    }

    const checkAllowance = async () => {
        if (rektContract && account) {
            try {
                const allowanceAmount: BigNumberish = await rektContract.allowance(account, REKT_TX_BATCHER);
                const amountAllowed = utils.parseEther(allowanceAmount.toString());
                const isApproved = amountAllowed.gt(utils.parseEther('1'));
                setAllowedTosell(isApproved);
            } catch (e) {
                setAllowedTosell(false);
            }
        }
    }

    const renderActionButton = () => {
        return (
            <Button
                size="md"
                w="full"
                onClick={allowedTosell ? sellRektCoin : approveAllowance}
            >
                {allowedTosell ? "Sell" : "Approve"}
            </Button>
        )
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
                            <Text>MATIC</Text>
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
        </VStack>
    )
}
