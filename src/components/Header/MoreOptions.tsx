import { FC } from 'react'

import {
    Menu, MenuButton, MenuList,
    MenuItem, useColorMode, IconButton,
    HStack, Text, useDisclosure
} from '@chakra-ui/react';
import {
    HamburgerIcon, InfoIcon, MoonIcon,
    SunIcon, TimeIcon
} from '@chakra-ui/icons'

import { OrderHistory } from '../OrderHistory/OrderHistory';
import { AboutRekt } from '../AboutRekt/AboutRekt';

export const MoreOptions: FC = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    
    const iconMode = () => {
        return colorMode === 'light' ? <MoonIcon /> : <SunIcon />
    }

	const { 
		isOpen: historyIsOpen, onOpen: historyOnOpen, onClose: historyOnClose
	} = useDisclosure();
	const { 
		isOpen: infoIsOpen, onOpen: infoOnOpen, onClose: infoOnClose 
	} = useDisclosure();

    return (
		<>
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
                <MenuItem
					onClick={infoOnOpen}
				>
                    <HStack w="full" justifyContent="space-between" >
                        <Text>
                            About
                        </Text>
                        <InfoIcon />
                    </HStack>
                </MenuItem>
                <MenuItem
					onClick={historyOnOpen}
				>
                    <HStack w="full" justifyContent="space-between" >
                        <Text>
							Recent orders
                        </Text>
                        <TimeIcon />
                    </HStack>
                </MenuItem>
            </MenuList>
        </Menu>
		<OrderHistory 
			isOpen={historyIsOpen} onOpen={historyOnOpen} onClose={historyOnClose}
		/>
		<AboutRekt 
			isOpen={infoIsOpen} onOpen={infoOnOpen} onClose={infoOnClose} 
		/>
		</>		
    )
}
