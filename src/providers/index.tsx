import React from 'react'
import ChakraUI from './chakra';

const Providers: React.FC = ({ children }) => {
    return (
        <ChakraUI>
            {children}
        </ChakraUI>
    )
}

export default Providers;