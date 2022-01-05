import { FC } from 'react'

import {
    Modal as ModalChakra, ModalProps
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
