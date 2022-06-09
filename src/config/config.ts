export const config = {
    CHAIN_ID : Number(process.env.REACT_APP_CHAIN_ID),
    ENVIROMENT: process.env.NODE_ENV,
    INFURA_ENDPOINT: process.env.REACT_APP_INFURA_ENPOINT!,
    REKT_COIN: process.env.REACT_APP_REKT_COIN!,
    WETH: process.env.REACT_APP_WETH!,
    REKT_TXS_BATCHER: process.env.REACT_APP_REKT_TXS_BATCHER!,
    UNIV2_ROUTER02: process.env.REACT_APP_UNIV2_ROUTER02!,
    UNIV2_PAIR: process.env.REACT_APP_REKT_UNIV2_PAIR!,
}