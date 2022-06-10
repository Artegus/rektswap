import React, { FC, useRef, useState } from 'react'

import { Button, Input } from '@chakra-ui/react'
import { ethers, Contract, utils } from 'ethers'
import { Trade, TradeType, TokenAmount, Route, Fetcher, WETH, ChainId } from '@uniswap/sdk'
import { defaultContracts } from '../../config/constants/tokenLists/default.contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

import REKT_COIN_ABI from '../../abis/rektcoin.json'
import REKT_COIN_BATCH_ABI from '../../abis/rektcoinBatch.json'
import UNISWAPV2ROUTER_ABI from '../../abis/IUniswapV2Router.json'

export const SwapTest: FC = () => {

    const [userInputAmount, setInputAmount] = useState<string>("");
    const [userOutputAmount, setOutputAmount] = useState<string>("");
    const [userInputSellAmount, setUserInputSellAmount] = useState<string>("");
   
    const timeRef = useRef<undefined | number>(undefined);
    const { active, library, account } = useWeb3React<Web3Provider>();

    const chainId = ChainId.KOVAN;
    const wethToken = WETH[chainId];

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

    const onKeyUpInputAmount = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        window.clearTimeout(timeRef.current)

        timeRef.current = window.setTimeout(async () => {
            if (value !== "" && userInputAmount !== "") {
                await updateOutputAmount();
            }
        }, 1000)
    }

    const swapWithUniswapRouterV2 = async () => {
        const signer = library?.getSigner()
        const uniswapRouterV2 = new Contract(
						defaultContracts.UNISWAPV2_ROUTER02.address,
						UNISWAPV2ROUTER_ABI,
						signer
				);
        const currentTimeStamp = new Date().getTime() / 1000;
        const minutes = 3;
        const seconds = 60 * minutes;
        const deadLine = new Date((currentTimeStamp + seconds) * 1000).getTime();
        const overrides = {
            value: ethers.utils.parseEther(userInputAmount)
        };
        try {
            const swapTx = await uniswapRouterV2.functions["swapExactETHForTokensSupportingFeeOnTransferTokens"](
                0,
                [defaultContracts.WETH.address, defaultContracts.REKT_COIN.address],
                account,
                deadLine,
                overrides
            );
        } catch (e) {
            console.error(e);
        }
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
        } catch (e) {
            console.error(e);
        }
    }

    const aproveeContract = async () => {
        const rektContract = new Contract(defaultContracts.REKT_COIN.address, REKT_COIN_ABI, library?.getSigner());
        try {
            const txApprove = await rektContract.functions["approve"](
                defaultContracts.REKT_TRANSACTION_BATCHER.address, 
                utils.parseEther("99999")
            );
        } catch (e) {
            console.error(e)
        }

    }

    const checkAllowance = async () => {
        const rektContract = new Contract(defaultContracts.REKT_COIN.address, REKT_COIN_ABI, library?.getSigner());
        try {
            const txCheck = await rektContract.functions["allowance"](account, defaultContracts.REKT_TRANSACTION_BATCHER.address);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="inputAmount">ETH</label>

                <Input
                    pr='4.5rem'
                    h='3rem'
                    placeholder="0.0"
                    _placeholder={{ fontWeight: 'bold' }}
                    type="number"
                    onKeyUp={onKeyUpInputAmount}
                    onChange={(e) => {
                        setInputAmount(e.currentTarget.value)
                    }}
                    value={userInputAmount}
                />
            </div>

            <div>
                <label htmlFor="outputAmount">REKT</label>
                <Input
                    pr='4.5rem'
                    h='3rem'
                    placeholder="0.0"
                    _placeholder={{ fontWeight: 'bold' }}
                    type="number"
                    onChange={(e) => setOutputAmount(e.currentTarget.value)}
                    value={userOutputAmount}
                />
            </div>

            <div>
                {active ?
                    <>
                        <Button
                            size="md"
                            w="full"
                            onClick={swapWithUniswapRouterV2}
                        >
                            Swap
                        </Button>

                        <Button
                            size="md"
                            w="full"
                            onClick={sellRektCoin}
                        >
                            Sell
                        </Button>
                    </> :
                    <span>Please connect your wallet</span>
                }
            </div>

            <div>
                <p>WETH: {userInputAmount}</p>
                <p>REKT: {userOutputAmount}</p>
            </div>
        </div>
    )
}
