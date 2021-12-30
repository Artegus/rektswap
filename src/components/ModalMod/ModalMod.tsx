import { FC } from 'react'

import {
    Modal as ModalChakra, ModalOverlay, ModalContent,
    ModalHeader, ModalCloseButton, ModalBody,
    Text, ModalFooter, Button, ModalProps
} from '@chakra-ui/react'

type Props = {
    settingsModal: ModalProps
}

export const ModalMod: FC<Props> = ({
    settingsModal,
}) => {
    return (
        <ModalChakra
            {...settingsModal}
        />
    )
}
