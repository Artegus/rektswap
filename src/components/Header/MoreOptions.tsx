import { FC } from 'react'

import {
    Menu, MenuButton, MenuList,
    MenuItem, useColorMode, IconButton,
    HStack, Text, useDisclosure, Link
} from '@chakra-ui/react';
import {
    HamburgerIcon, InfoIcon, MoonIcon,
    SunIcon, TimeIcon
} from '@chakra-ui/icons'
import {
	BsFillBarChartFill
} from 'react-icons/bs'

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
					onClick={historyOnOpen}
				>
                    <HStack w="full" justifyContent="space-between" >
                        <Text>
							Recent orders
                        </Text>
                        <TimeIcon />
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
					<Link href='https://polygon.poocoin.app/tokens/0x6810eb4c954ee77e4fe5d4af59ef1aa15e25b70f'>
                <MenuItem
				>
                    <HStack w="full" justifyContent="space-between" >
                        <Text>
							Chart	
                        </Text>
                        <BsFillBarChartFill />
                    </HStack>
                </MenuItem>
					</Link>
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
