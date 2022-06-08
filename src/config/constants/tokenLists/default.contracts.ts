export const defaultContracts = {
    WETH: {
        name: 'WETH',
        address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
    },
    REKT_COIN: {
        name: 'REKT',
        address: '0x1c9bE52c4531DA802581e9beE27797926090709e'
    },
    REKT_TRANSACTION_BATCHER: {
        name: 'RektTransactionBatcher',
        address: '0x349fea47fa67fAF75C9F301Adb5108aef49223ff'
    },
    UNISWAPV2_ROUTER02: {
        name: 'UniswapV2Router02',
        address: '0x8954AfA98594b838bda56FE4C12a09D7739D179b'
    }, 
	UNISWAPV2_PAIR: {
		name: 'UniswapV2Pair',
		address: '0xCeA7656cef847FdB05a3b0530D6b2Eb71ad6f332'
	},
}

export const REKTCOIN = defaultContracts.REKT_COIN.address;
export const REKT_TX_BATCHER = defaultContracts.REKT_TRANSACTION_BATCHER.address;
export const UNISWAPV2 = defaultContracts.UNISWAPV2_ROUTER02.address;
