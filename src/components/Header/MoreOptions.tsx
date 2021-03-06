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
import { REKTCOIN } from '../../config/constants/tokenLists/default.contracts';

import { OrderHistory } from '../OrderHistory/OrderHistory';
import { AboutRekt } from '../AboutRekt/AboutRekt';
export const chartLink = 
	`https://polygon.poocoin.app/tokens/${REKTCOIN}`;


export const MoreOptions: FC = () => {

    const { colorMode, toggleColorMode } = useColorMode();
   	
	const menuStyle = {
		bg: colorMode === 'light' ? '#F3EDFC' : '#1a263c',
	};

	const menuButtonStyle = {
		_hover: {
			bg: colorMode === 'light' ? '#e6dafa' : '#2f374b'
		}
	};

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
                variant='simple-button'
                aria-label='More'
                icon={<HamburgerIcon />}
            />
            <MenuList 
                minW="150px"
				{...menuStyle}
            >

                <MenuItem
                    onClick={toggleColorMode}
					{...menuButtonStyle}
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
					{...menuButtonStyle}
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
					{...menuButtonStyle}
				>
                    <HStack w="full" justifyContent="space-between" >
                        <Text>
                            About
                        </Text>
                        <InfoIcon />
                    </HStack>
                </MenuItem>
				<Link href={chartLink}>
					<MenuItem
						{...menuButtonStyle}
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
