import { FC } from 'react'
import {
    HStack, Button
} from '@chakra-ui/react'
import { Logo } from '../Logo/Logo'
import { ConnectWallet } from '../ConnectWallet/ConnectWallet'
import { MoreOptions } from './MoreOptions';

export const Header: FC = () => {
    
    const isConnected = false;

    return (
        <HStack 
            w="full" 
            h="70" 
            justifyContent="space-between"
        >
            <Logo />

            <HStack spacing={5} px="5">
                {!isConnected ? 
                    <ConnectWallet/> : 
                    <Button size='md'>
                        0x09...213
                    </Button>
                }
                <MoreOptions />
            </HStack>
        </HStack>

    )
}
