import { FC } from 'react'
import {
    HStack, FormControl, InputGroup,
    Input, InputRightElement, Button,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ModalMod } from '../ModalMod/ModalMod';
import { ModalTokenSelector } from './ModalTokenSelector';

type Props = {
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    isOpen: boolean;
}

export const TokenSelector: FC<Props> = ({
    handleOpenModal,
    handleCloseModal,
    isOpen,
}) => {

    return (
        <HStack px={5} >
            <FormControl>
                <InputGroup>
                    <Input placeholder="0.0" />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' rightIcon={<ChevronDownIcon />} onClick={handleOpenModal}>
                            ETH
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <ModalMod
                settingsModal={{
                    children: <ModalTokenSelector closeModal={handleCloseModal}/>,
                    onClose: handleCloseModal,
                    isOpen: isOpen,
                    isCentered: true,
                    autoFocus: true
                }}
            />
        </HStack>
    )
}
