import { config } from '../../config'

export const defaultContracts = {
    WETH: {
        name: 'WETH',
        address: config.WETH
    },
    REKT_COIN: {
        name: 'REKT',
        address: config.REKT_COIN
    },
    REKT_TRANSACTION_BATCHER: {
        name: 'RektTransactionBatcher',
        address: config.REKT_TXS_BATCHER
    },
    UNISWAPV2_ROUTER02: {
        name: 'UniswapV2Router02',
        address: config.UNIV2_ROUTER02
    }, 
	UNISWAPV2_PAIR: {
		name: 'UniswapV2Pair',
		address: config.UNIV2_PAIR
	},
}

export const WETH = defaultContracts.WETH.address;
export const REKTCOIN = defaultContracts.REKT_COIN.address;
export const REKT_TX_BATCHER = defaultContracts.REKT_TRANSACTION_BATCHER.address;
export const UNISWAPV2 = defaultContracts.UNISWAPV2_ROUTER02.address;
export const REKT_WETH_LP = defaultContracts.UNISWAPV2_PAIR.address;
