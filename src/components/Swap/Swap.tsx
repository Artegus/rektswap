import { FC } from 'react'
import {
    VStack, HStack, Heading,
    FormControl, IconButton,
    Input, Button, useDisclosure,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Text, InputGroup, InputRightElement
} from '@chakra-ui/react'
import { SettingsIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { ConnectWallet } from '../ConnectWallet/ConnectWallet';
import { TokenSelector } from '../TokenSelector/TokenSelector';

export const Swap: FC = () => {

    const isConnected = true;
    const { onOpen, onClose, isOpen } = useDisclosure();


    return (
        <VStack
            width="450px"
            borderRadius='md'
            borderWidth='1px'
            spacing={4}
            alignItems="stretch"
        >
            <HStack
                p={5}
                w="full"
                justifyContent="space-between">
                <Heading size="md">Swap tokens</Heading>
                <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<SettingsIcon />}
                    aria-label='Send email'
                />
            </HStack>
            <TokenSelector 
                handleCloseModal={onClose}
                handleOpenModal={onOpen}
                isOpen={isOpen}
            />
            <HStack px={5} justifyContent="center">
                <ArrowDownIcon/>
            </HStack>
            <TokenSelector 
                handleCloseModal={onClose}
                handleOpenModal={onOpen}
                isOpen={isOpen}
            />
            <HStack px={5} paddingTop={2} paddingBottom={5} >
                {!isConnected ?
                    <ConnectWallet /> :
                    <Button
                        size="md"
                        w="full"
                    >
                        Swap
                    </Button>
                }
            </HStack>
        </VStack>
    )
}
