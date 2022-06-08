import { BigNumber } from 'ethers'
import { Trade, TradeType, TokenAmount, Token, Route, Fetcher, WETH, ChainId } from 'quickswap-sdk'

import { REKTCOIN, defaultContracts } from '../config/constants/tokenLists/default.contracts';
import { config } from '../config/config';
import { Web3Provider } from '@ethersproject/providers';

const rektCoin = new Token(config.CHAIN_ID, REKTCOIN, 18);
const wethToken = new Token(config.CHAIN_ID, defaultContracts.WETH.address, 18);

export const getTrade = async (amount: BigNumber, type: 'sell' | 'buy') => {
    const tokenToTrade = type === 'sell' ? rektCoin : wethToken;
    const pairWethRekt = await Fetcher.fetchPairData(wethToken, rektCoin, new Web3Provider(window.ethereum));
    const routeWethRekt = new Route([pairWethRekt], tokenToTrade);

    return new Trade(
        routeWethRekt, new TokenAmount(tokenToTrade, amount.toString()), TradeType.EXACT_INPUT
    );
}