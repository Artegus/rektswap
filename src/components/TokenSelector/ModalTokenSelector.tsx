import { FC } from 'react'

import {
    ModalOverlay, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody, Stack,
    Image, Text, ModalFooter, Box,
    Button, HStack
} from '@chakra-ui/react'

import tokens from '../../config/constants/tokenLists/default.tokenlist'

type ModalTokenSelector = {
    closeModal: () => void;
}

export const ModalTokenSelector: FC<ModalTokenSelector> = ({
    closeModal
}) => {

    const tokenItems = () => {
        return tokens.map(({ name, address, symbol, logoURI }) => (
            <HStack
                as={Button}
                id={address}
                variant='outline'
                size="sm"
                w="full"
                px={0}
                spacing={1}
            >
                <Box
                    w="15px"
                >
                    <Image
                        src={logoURI}
                        alt={name}
                        objectFit='cover'
                    />
                </Box>
                <Text h="10px" >{symbol}</Text>
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
