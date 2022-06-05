import { FC, useState } from 'react'
import { HStack, Text, Tooltip } from '@chakra-ui/react';
import { CircleIcon } from '../../icons/CircleIcon';
import { useTxsBatcherStore } from '../../stores/TransactionBatcherStore';

export const RektbatcherStatus: FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { statusBatcher } = useTxsBatcherStore();

    return (
        <HStack >
            <Tooltip
                label={statusBatcher ? 'The batcher is currently active' : 'The batcher is currently inactive'}
                closeDelay={350}
                isOpen={isOpen}
            >
                <Text
                    fontSize='sm'
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    onTouchStart={() => setIsOpen(true)}
                    onTouchEnd={() => setIsOpen(false)}
                >RektTransactionBatcher</Text>
            </Tooltip>
            <CircleIcon 
                color={statusBatcher ? 'green.700' : 'red.700'} w='10px'
            />
        </HStack>
    )
}
