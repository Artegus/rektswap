import { FC } from 'react';

import {
    HStack, Button,
    IconButton, useColorMode,
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom'

import {
    MoonIcon,
    SunIcon,
} from '@chakra-ui/icons'

import { Logo } from '../Logo/Logo';

export const FaqHeader: FC = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();

    const iconMode = () => {
        return colorMode === 'light' ? <MoonIcon /> : <SunIcon />
    }

    const goToSwap = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate('/swap');
    }

    return (
        <HStack
            w="full"
            h="50"
            justifyContent="space-between"
        >
            <Logo />

            <HStack spacing={5} >
                    <Button
                        size='md'
                        variant='simple-button'
                        onClick={goToSwap}
                    >Launch App</Button>
                <IconButton
                    aria-label='Change theme'
                    variant='simple-button'
                    onClick={toggleColorMode}
                    icon={iconMode()}
                />
            </HStack>
        </HStack>

    );
}
