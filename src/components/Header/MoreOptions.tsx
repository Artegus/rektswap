import { FC } from 'react'

import {
    Menu, MenuButton, MenuList,
    MenuItem, useColorMode, IconButton,
    HStack, Text
} from '@chakra-ui/react';
import {
    HamburgerIcon, InfoIcon, MoonIcon,
    SunIcon
} from '@chakra-ui/icons'

export const MoreOptions: FC = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    
    const iconMode = () => {
        return colorMode === 'light' ? <MoonIcon /> : <SunIcon />
    }

    return (
        <Menu
            autoSelect={false}
            closeOnSelect={false}
        >
            <MenuButton
                as={IconButton}
                aria-label='More'
                icon={<HamburgerIcon />}
            />
            <MenuList minW="150px" >
                <MenuItem
                    onClick={toggleColorMode}
                >
                    <HStack w="full" justifyContent="space-between" >
                        <Text>
                            {colorMode === 'light' ? 'Dark theme' : 'Light theme'}
                        </Text>
                        {iconMode()}
                    </HStack>
                </MenuItem>
                <MenuItem>
                    <HStack w="full" justifyContent="space-between" >
                        <Text>
                            About
                        </Text>
                        <InfoIcon />
                    </HStack>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
