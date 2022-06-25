import { FC } from 'react'
import {
    FormControl, Input, InputRightElement,
    Button, Text, useColorModeValue, ComponentWithAs, InputProps, HStack
} from '@chakra-ui/react'
import { ACTION_TABS } from '../responsive/breakpoints';

type Props = {
    tokenName: string;
    updateOutputAmount?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    setAmount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    amount: string;
    inputProps?: InputProps;
}


export const InputSwap: FC<Props> = ({
    inputProps,
    tokenName,
    amount,
    setAmount,
    updateOutputAmount,
}) => {

    const borderColor = useColorModeValue('#E6DAFA', '#1a263c');

    return (
        <HStack px={ACTION_TABS.HStackLeftRightPadding} >

            <FormControl>
                <Input
                    {...inputProps}
                    pr='4.5rem'
                    h='3rem'
                    placeholder="0.0"
                    _placeholder={{ fontWeight: 'bold' }}
                    type="text"
                    onKeyUp={updateOutputAmount}
                    onChange={setAmount}
                    value={amount}
                    borderColor={borderColor}
                />
                <InputRightElement
                    width='auto'
                    h='full'
                    px={1}
                >
                    <Button
                        h='2.5rem' size='md'
                        disabled
                        variant='simple-button'
                    >
                        <Text>{tokenName}</Text>
                    </Button>
                </InputRightElement>
            </FormControl>
        </HStack>
    )
}
