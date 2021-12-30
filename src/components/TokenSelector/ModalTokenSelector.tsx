import { 
    ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody, ModalFooter, 
    Button, Text } from '@chakra-ui/react'
import { FC } from 'react'

type ModalTokenSelector = {
    closeModal: () => void;
}

export const ModalTokenSelector: FC<ModalTokenSelector> = ({
    closeModal
}) => {
    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Token A</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={closeModal}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent></>
    )
}
