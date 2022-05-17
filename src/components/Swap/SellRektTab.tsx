import { FC, useRef, useState, useEffect } from "react";
import {
    Button, FormControl, Heading,
    HStack, Input, InputRightElement, Text, VStack,
	Box
} from "@chakra-ui/react";

import { Contract, utils, ethers } from 'ethers'
import { Trade, TradeType, TokenAmount, Route, Fetcher, WETH, ChainId } from '@uniswap/sdk'

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";

import REKT_COIN_BATCH_ABI from '../../abis/rektcoinBatch.json';
import REKT_COIN_ABI from '../../abis/rektcoin.json';
import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
import { Props } from "../../types/TabProps/TabProps";

import { useUserStore } from '../../stores/UserStore';
import { ACTION_TABS } from "./responsive/breakpoints";

export const formatBal = (bal: number, decimals: number): string => {
	const balStr = bal.toString();
	const decimalPos = balStr.search("\\.");
	return balStr.substring(0, decimalPos + decimals + 1);
}


const rektBalanceDecimalsToShow = 2;
const formatRekt = (bal: number): string => {
	return formatBal(bal, rektBalanceDecimalsToShow);
}


export const SellRektTab: FC<Props> = ({
    tabTitle
}) => {


    const [userInputSellAmount, setUserInputSellAmount] = useState<string>("");
    const [expectedOutput, setExpectedOutput] = useState<string>("")
    const timeRef = useRef<number | undefined>(undefined);

    const { active, library, account } = useWeb3React<Web3Provider>();
	const [rektBal, setRektBal] = useState<number | null>(null);

	const getRektCoinContract = (): any => {
		return new Contract(
			defaultContracts.REKT_COIN.address,
			REKT_COIN_ABI,
			library?.getSigner()
		);
	}
	
	const updateBals = async (addr: string | null | undefined) => {
		if (!active) 
			setRektBal(null);
		else if (typeof addr === "string") {
			const rektCoin = getRektCoinContract();
			const bal = await rektCoin.balanceOf(addr);
			setRektBal(parseFloat(utils.formatUnits(bal)));
		} 
	}
	
	// TODO add parameters
	useEffect(() => {updateBals(account);}, [account, active]);

    const chainId = ChainId.KOVAN;
    const wethToken = WETH[chainId];

    const updateOutputAmount = async () => {
        const amount = utils.parseEther(userInputSellAmount.toString());
        const rektCoin = await Fetcher.fetchTokenData(chainId, defaultContracts.REKT_COIN.address);
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
            const tx = await rektBatchet.functions["sellRektCoin"](amount);
			setRektBal(
				(currentBal: number | null) => currentBal !== null?
					currentBal - parseFloat(userInputSellAmount) : null
			);
            console.log(tx);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <VStack
            width={ACTION_TABS.VStackWidth}
            spacing={4}
            alignItems="stretch"
        >
            <HStack
                p={ACTION_TABS.HStackGeneralPadding}
                w="full"
                justifyContent="space-between">
                <Heading size="md" fontSize={ACTION_TABS.HeadingFontSize} >{tabTitle}</Heading>
				<Box textAlign={"right"} fontSize={ACTION_TABS.BoxFontSize} >
					{rektBal === null? "" : `REKT balance: ${formatRekt(rektBal)}`}
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
                    <Button
                        size="md"
                        w="full"
                        onClick={sellRektCoin}
                    >
                        Sell
                    </Button>
                }
            </HStack>

        </VStack>
    )
}
