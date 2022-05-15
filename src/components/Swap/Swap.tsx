import { FC, useState } from 'react'
import {
    VStack, HStack, Heading, IconButton,
    Button, useDisclosure,
} from '@chakra-ui/react'
import { SettingsIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { TokenSelector } from '../TokenSelector/TokenSelector';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ConnectWallet } from '../ConnectWallet/ConnectWallet';
import { useSwapStore } from '../../stores/SwapStore';
import { WrapperModal } from '../WrapperModal/WrapperModal';
import { ModalTokenSelector } from '../TokenSelector/ModalTokenSelector';

export const Swap: FC = () => {

    const [currentSelector, setCurrentSelector] = useState<number>();

    const { active } = useWeb3React<Web3Provider>();
    const { onOpen, onClose, isOpen } = useDisclosure();

    const { 
        setTokenIn, tokenIn, setTokenOut, 
        tokenOut, turnAroundTokens, 
        typedIn, estimatedOut,
        setEstimitedOut, setTypedIn
    } = useSwapStore();

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
                handleOpenModal={onOpen}
                token={tokenIn}
                selectorTokenID={0}
                handleSelectorTokenId={setCurrentSelector}
                handleSetAmount={setTypedIn}
                amount={typedIn}
            />
            <HStack justifyContent="center">
                <IconButton
                    size='xs'
                    borderRadius='25px'
                    aria-label='Turn around'
                    onClick={turnAroundTokens} 
                    icon={<ArrowDownIcon />} />
            </HStack>
            <TokenSelector
                handleOpenModal={onOpen}
                token={tokenOut}
                selectorTokenID={1}
                handleSelectorTokenId={setCurrentSelector}
                handleSetAmount={setEstimitedOut}
                amount={estimatedOut}
            />
            <HStack px={5} paddingTop={2} paddingBottom={5} >
                {!active ?
                    <ConnectWallet
                        size="md"
                        w="full"
                    /> :
                    <Button
                        size="md"
                        w="full"
                        onClick={swapTokens}
                    >
                        Swap
                    </Button>
                }
            </HStack>
            <WrapperModal
                settingsModal={{
                    children: <ModalTokenSelector closeModal={onClose} setToken={currentSelector === 0 ? setTokenIn : setTokenOut} />,
                    onClose: onClose,
                    isOpen: isOpen,
                    isCentered: true,
                    autoFocus: true,
                    size: 'sm'
                }}
            />
        </VStack>
    )
}
