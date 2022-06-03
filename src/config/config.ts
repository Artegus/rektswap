let chainId;

if (process.env.NODE_ENV === 'development') {
    chainId = '42'
} else if (process.env.NODE_ENV === 'production') {
    chainId = process.env.REACT_APP_CHAIN_ID
}

export const config = {
    CHAIN_ID : Number(chainId),
    ENVIROMENT: process.env.NODE_ENV
}