export const defaultContracts = {
    WETH: {
        name: 'WETH',
        address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
    },
    REKT_COIN: {
        name: 'REKT',
        address: '0x349E01edd13Da1C92607939F6647B2D8dc9fA382'
    },
    REKT_TRANSACTION_BATCHER: {
        name: 'RektTransactionBatcher',
        address: '0x9CC361465f8bCEaC367E3248cb46097Ea70191E5'
    },
    UNISWAPV2_ROUTER02: {
        name: 'UniswapV2Router02',
        address: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
    }, 
	UNISWAPV2_PAIR: {
		name: 'UniswapV2Pair',
		address: '0xd7EC5C3569aCc64a705968bBDe6D2bdcE784B2B0'
	},
}

export const WETH = defaultContracts.WETH.address;
export const REKTCOIN = defaultContracts.REKT_COIN.address;
export const REKT_TX_BATCHER = defaultContracts.REKT_TRANSACTION_BATCHER.address;
export const UNISWAPV2 = defaultContracts.UNISWAPV2_ROUTER02.address;
export const REKT_WETH_LP = defaultContracts.UNISWAPV2_PAIR.address;
