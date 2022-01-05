import { FC } from 'react';
import { HStack } from '@chakra-ui/layout'
import { Swap } from '../Swap/Swap'

export const Main: FC = () => {

    return (
        <HStack
            w="full"
            h="85vh"
            justifyContent="center"
        >
            <Swap />
        </HStack>
    )
}
