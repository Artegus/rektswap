import { FC } from 'react';
import { HStack } from '@chakra-ui/layout'
import { ActionsTabs } from '../Swap/ActionsTabs';

export const Main: FC = () => {

    return (
        <HStack
            w="full"
            h="100vh"
            justifyContent="center"
        >
            <ActionsTabs />
        </HStack>
    )
}
