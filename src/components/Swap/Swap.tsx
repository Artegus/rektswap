import { FC } from 'react'
import {
    VStack, HStack, Heading,IconButton,
    Button, useDisclosure,
} from '@chakra-ui/react'
import { SettingsIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { ConnectWallet } from '../ConnectWallet/ConnectWallet';
import { TokenSelector } from '../TokenSelector/TokenSelector';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export const Swap: FC = () => {

    const { active } = useWeb3React<Web3Provider>();
    const { onOpen, onClose, isOpen } = useDisclosure();

    const swapTokens = () => {
        //TODO: 
    }

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
                {!active ?
                    <ConnectWallet /> :
                    <Button
                        size="md"
                        w="full"
                        onClick={swapTokens}
                    >
                        Swap
                    </Button>
                }
            </HStack>
        </VStack>
    )
}
