import { FC } from 'react'

import { HStack } from '@chakra-ui/react'
import { RektbatcherStatus } from './RektbatcherStatus'

export const StatusBar: FC = () => {

    return (
        <HStack spacing={5} >
            <RektbatcherStatus />
        </HStack>
    )
}
