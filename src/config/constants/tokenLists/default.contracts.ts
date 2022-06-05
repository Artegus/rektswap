export const defaultContracts = {
    WETH: {
        name: 'WETH',
        address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C'
    },
    REKT_COIN: {
        name: 'REKT',
        address: '0x33632E8362e9084F36Ab68BF59269F54BDe787AE'
    },
    REKT_TRANSACTION_BATCHER: {
        name: 'RektTransactionBatcher',
        address: '0x4b170fA8934740a3a753E2C7cfD2Dd1D973FaC93'
    },
    UNISWAPV2_ROUTER02: {
        name: 'UniswapV2Router02',
        address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    }, 
	UNISWAPV2_PAIR: {
		name: 'UniswapV2Pair',
		address: '0x747830b2d511ABB860C1623015ed6396297f132f'
	},
	RANDOMNESS_FULFILLER: {
		name: 'RandomnessFulfiller',
		address: '0x42543C0E9092cf56674ECC50908ff3C4F35E4808'
	}
}

export const REKTCOIN = defaultContracts.REKT_COIN.address;
export const REKT_TX_BATCHER = defaultContracts.REKT_TRANSACTION_BATCHER.address;
export const UNISWAPV2 = defaultContracts.UNISWAPV2_ROUTER02.address;