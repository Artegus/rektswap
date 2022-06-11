import { FC } from 'react';

import { HStack, Button,
	IconButton, Link, useColorMode,
} from '@chakra-ui/react';

import {
    MoonIcon,
    SunIcon, 
} from '@chakra-ui/icons'

import { Logo } from '../Logo/Logo';

export const FaqHeader: FC = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    
    const iconMode = () => {
        return colorMode === 'light' ? <MoonIcon /> : <SunIcon />
    }

	return (
        <HStack 
            w="full" 
            h="50" 
            justifyContent="space-between"
        >
            <Logo />
            
            <HStack spacing={5} >
				<Link href='/'>
					<Button size='md'>Launch App</Button>
				</Link>
				<IconButton 
					aria-label='Change theme'
					onClick={toggleColorMode} 
					icon={iconMode()} 
				/>
            </HStack>
        </HStack>

	);
}
