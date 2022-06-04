import { FC, useState } from 'react'
import { HStack, Text, Tooltip } from '@chakra-ui/react';
import { Contract, providers } from 'ethers';
import { REKT_TX_BATCHER } from '../../config/constants/tokenLists/default.contracts';
import rektcoinBatch from '../../abis/rektcoinBatch.json'
import { CircleIcon } from '../../icons/CircleIcon';


export const RektbatcherStatus: FC = () => {

    const [status, setStatus] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const createcontract = async () => {
        const prov = new providers.Web3Provider(window.ethereum);
        const rekttx = new Contract(REKT_TX_BATCHER, rektcoinBatch, prov);
        console.log(rekttx);
        const isInProcess: boolean = await rekttx.functions['saleOfBatchInProcess']();
        console.log(isInProcess);
    }

    return (
        <HStack >
            <Tooltip
                label={status ? 'Batcher is currently in process' : 'There are currently no active batchers'}
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
            <CircleIcon color={status ? 'green' : 'red.700'} w='10px' />
        </HStack>
    )
}
