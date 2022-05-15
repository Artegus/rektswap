import { FC } from 'react'
import {
    HStack, FormControl, InputGroup,
    Input, InputRightElement, Button,
    Text
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IToken } from '../../types/IToken';

type Props = {
    handleOpenModal: () => void;
    token: IToken | undefined;
    selectorTokenID: number;
    handleSelectorTokenId: React.Dispatch<React.SetStateAction<number | undefined>>;
    handleSetAmount: (amount: string ) => void
    amount: string;
}

export const TokenSelector: FC<Props> = ({
    handleOpenModal,
    selectorTokenID,
    handleSelectorTokenId,
    token,
    amount,
    handleSetAmount
}) => {

    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        if (!isNaN(Number(value))) {
            handleSetAmount(value);
        }
    }

    return (
        <HStack px={5} >
            <FormControl>
                <InputGroup size='md'>
                    <Input 
                        pr='4.5rem'
                        h='3rem'
                        placeholder="0.0"
                        _placeholder={{ fontWeight: 'bold' }}
                        type="number"
                        onChange={handleChangeAmount}
                        value={amount}
                    />
                    <InputRightElement 
                        width='auto'
                        h='full'
                        px={1}
                    >
                        <Button 
                            h='2.5rem' size='md' 
                            rightIcon={<ChevronDownIcon />} 
                            onClick={ () => {
                                handleSelectorTokenId(selectorTokenID)
                                handleOpenModal();
                            }}>
                            <Text>{token ? token.symbol : 'Select a token'}</Text>
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </HStack>
    )
}
