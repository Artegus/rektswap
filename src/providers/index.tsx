import React from 'react'
import ChakraUI from './chakra';
import Web3Provider from './web3'

const Providers: React.FC = ({ children }) => {
    return (
        <Web3Provider>
            <ChakraUI>
                {children}
            </ChakraUI>
        </Web3Provider>
    )
}

export default Providers;