export const defaultContracts = {
    WETH: {
        name: 'WETH',
        address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
    },
    REKT_COIN: {
        name: 'REKT',
        address: '0x6810eB4C954eE77E4fe5d4Af59EF1AA15E25B70F'
    },
    REKT_TRANSACTION_BATCHER: {
        name: 'RektTransactionBatcher',
        address: '0x686EC0d335B843Ce76EFB1a5EA458169aA2F2518'
    },
    UNISWAPV2_ROUTER02: {
        name: 'UniswapV2Router02',
        address: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
    }, 
	UNISWAPV2_PAIR: {
		name: 'UniswapV2Pair',
		address: '0x61D59367dAA096199E0070414e8A33EfaA44DF62'
	},
	RANDOMNESS_FULFILLER: {
		name: 'RandomnessFulfiller',
		address: '0x42543C0E9092cf56674ECC50908ff3C4F35E4808'
	}
}

export const REKTCOIN = defaultContracts.REKT_COIN.address;
export const REKT_TX_BATCHER = defaultContracts.REKT_TRANSACTION_BATCHER.address;
export const UNISWAPV2 = defaultContracts.UNISWAPV2_ROUTER02.address;
