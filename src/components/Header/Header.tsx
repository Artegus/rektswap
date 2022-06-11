import { FC } from 'react'
import { useWeb3React } from '@web3-react/core'
import {
    HStack, Button
} from '@chakra-ui/react'
import { Logo } from '../Logo/Logo'
import { ConnectWallet } from '../ConnectWallet/ConnectWallet'
import { MoreOptions } from './MoreOptions';
import { Web3Provider } from '@ethersproject/providers';


export const Header: FC = () => {
    
    const { active, account } = useWeb3React<Web3Provider>()
    
    return (
        <HStack 
            w="full" 
            h="50" 
            justifyContent="space-between"
        >
            <Logo />

            <HStack spacing={5} >
                {!active ? 
                    <ConnectWallet/> : 
                    <Button size='md'>
                        {account!.substring(0, 4)}...{
							account!.substring(account!.length - 4, account!.length)
						}
                    </Button>
                }
                <MoreOptions />
            </HStack>
        </HStack>

    )
}
