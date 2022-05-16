import { FC, useRef, useState, useEffect } from "react";
import {
    Button, FormControl, Heading,
    HStack, Input, InputRightElement, Text, VStack,
	Box
} from "@chakra-ui/react";

import { Contract, utils, ethers } from 'ethers';
import { ChainId, Fetcher, Route, TokenAmount, Trade, TradeType, WETH } from "@uniswap/sdk";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
import UNISWAPV2ROUTER_ABI from '../../abis/IUniswapV2Router.json'

import { Props } from "../../types/TabProps/TabProps";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";
import { formatBal } from "./SellRektTab";

declare global {
	interface Window {
		ethereum: any;
	}
}



const ethBalanceDecimalsToShow = 4;
const formatEth = (bal: number): string => {
	return formatBal(bal, ethBalanceDecimalsToShow);
}

export const getEthBlanaceOf = async (addr: string): Promise<any> => {
	const prov = new ethers.providers.Web3Provider(
		window.ethereum
	);
	return await prov.getBalance(addr);
}

export const BuyRektTab: FC<Props> = ({
    tabTitle
}) => {

    const [userInputAmount, setInputAmount] = useState<string>("");
    const [expectedOutput, setOutputAmount] = useState<string>("");

    const timeRef = useRef<undefined | number>(undefined);
    const { active, library, account } = useWeb3React<Web3Provider>();
	const [ethBal, setEthBal] = useState<number | null>(null);
	
	const updateBals = async (addr: string | null | undefined) => {
		if(typeof addr === "string")
			setEthBal(parseFloat(
				utils.formatUnits(await getEthBlanaceOf(addr))
			));
	}
	
	// TODO add parameters
	useEffect(() => {updateBals(account);}, [account]);

    const chainId = ChainId.KOVAN;
    const wethToken = WETH[chainId];

    const onKeyUpInputAmount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        window.clearTimeout(timeRef.current)

        timeRef.current = window.setTimeout(async () => {
            if (value !== "" && userInputAmount !== "" && userInputAmount !== "0") {
                await updateOutputAmount();
            } else {
                setOutputAmount("");
            }
        }, 1000)
    }

    const updateOutputAmount = async () => {
        const amount = utils.parseEther(userInputAmount.toString());
        const rektCoin = await Fetcher.fetchTokenData(chainId, defaultContracts.REKT_COIN.address);
        const pairWethRekt = await Fetcher.fetchPairData(wethToken, rektCoin);
        const routeWethRekt = new Route([pairWethRekt], wethToken);

        const trade = new Trade(routeWethRekt, new TokenAmount(wethToken, amount.toString()), TradeType.EXACT_INPUT);
        const { outputAmount } = trade;
        const parsedOutputAmount = outputAmount.toSignificant(6);

        setOutputAmount(parsedOutputAmount);
    }

    const swapWithUniswapRouterV2 = async () => {
        const signer = library?.getSigner()
        const uniswapRouterV2 = new Contract(
			defaultContracts.UNISWAPV2_ROUTER02.address, UNISWAPV2ROUTER_ABI, signer
		);
        const currentTimeStamp = new Date().getTime() / 1000;
        const minutes = 3;
        const seconds = 60 * minutes;
        const deadLine = new Date((currentTimeStamp + seconds) * 1000).getTime();
        const path = [defaultContracts.WETH.address, defaultContracts.REKT_COIN.address];
        const overrides = {
            value: utils.parseEther(userInputAmount)
        };
        try {
            const swapTx = await uniswapRouterV2.functions["swapExactETHForTokensSupportingFeeOnTransferTokens"](
                0,
                path,
                account,
                deadLine,
                overrides
            );
			setEthBal(
				(currentBal: number | null) => currentBal !== null?
					currentBal - parseFloat(userInputAmount) : null
			);
            console.log("Txn: ", swapTx);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <VStack
            width="450px"
            borderRadius='md'
            borderWidth='1px'
            spacing={4}
            alignItems="stretch"
        >
            <HStack
                p={5}
                w="full"
                justifyContent="space-between">
                <Heading size="md">{tabTitle}</Heading>
				<Box>
					{ethBal === null? "" : `ETH balance: ${formatEth(ethBal)}`}
				</Box>
            </HStack>

            <HStack px={5} >
                <FormControl>
                    <Input
                        pr='4.5rem'
                        h='3rem'
                        placeholder="0.0"
                        _placeholder={{ fontWeight: 'bold' }}
                        type="number"
                        onKeyUp={onKeyUpInputAmount}
                        onChange={(e) => setInputAmount(e.currentTarget.value.trim())}
                        value={userInputAmount}
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
            <HStack px={5} >
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
                            <Text>REKT</Text>
                        </Button>
                    </InputRightElement>
                </FormControl>
            </HStack>

            <HStack px={5} paddingTop={2} paddingBottom={5} >
                {!active ?
                    <ConnectWallet
                        size="md"
                        w="full"
                    /> :
                    <Button
                        size="md"
                        w="full"
                        onClick={swapWithUniswapRouterV2}
                    >
                       	Buy 
                    </Button>
                }
            </HStack>

        </VStack>
    )
}
