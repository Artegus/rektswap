import { FC } from 'react'
import {
    ModalOverlay, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody, Stack,
    Image, Text, ModalFooter, Box,
    Button, HStack
} from '@chakra-ui/react'
import tokens from '../../config/constants/tokenLists/default.tokenlist'
import { IToken } from '../../types/IToken'
import { useSwapStore } from '../../stores/SwapStore'

type TModalTokenSelector = {
    closeModal: () => void;
    setToken: (_token: IToken) => void;
}

export const ModalTokenSelector: FC<TModalTokenSelector> = ({
    closeModal,
    setToken
}) => {

    const { tokenIn, tokenOut } = useSwapStore();

    const isTokenSelected = (_token: IToken) => {
        return (_token.address === tokenIn?.address || _token.address === tokenOut?.address)
    }

    const _setToken = (_token: IToken) => {
        setToken(_token);
        closeModal();
    }

    const tokenItems = () => {
        return tokens.map((token) => (
            <HStack
                onClick={() => {
                    _setToken({
                        ...token
                    });
                }}
                key={token.address}
                as={Button}
                variant={isTokenSelected(token) ? 'solid' : 'outline'}
                size="sm"
                w="full"
                px={0}
                spacing={1}
            >
                <Box
                    w="15px"
                >
                    <Image
                        src={token.logoURI}
                        alt={token.name}
                        objectFit='cover'
                    />
                </Box>
                <Text h="10px" >{token.symbol}</Text>
            </HStack>
        ))
    }

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text fontSize="md" >Select a Token</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack
                        direction='row'
                        spacing={3}
                        align='flex-start'
                    >
                        {tokenItems()}
                    </Stack>
                </ModalBody>
                <ModalFooter />
            </ModalContent></>
    )
}
