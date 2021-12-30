import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

const ChakraUI: React.FC = ({ children }) => {
    return (
        <ChakraProvider>
            { children }
        </ChakraProvider>
    )
}


export default ChakraUI;