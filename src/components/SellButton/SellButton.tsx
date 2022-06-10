import { FC, useState } from 'react'

import { Button } from '@chakra-ui/react'
import { useRektContract } from '../../hooks/useContract';
import { REKT_TX_BATCHER } from '../../config/constants/tokenLists/default.contracts';
import { utils } from 'ethers';
import { useSwapStore } from '../../stores/SwapStore';

export const SellButton: FC = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const { approvedContract, setApprovedContract } = useSwapStore();

    const rektContract = useRektContract();

    const approveAllowance = async (): Promise<void> => {
        if (rektContract) {
            try {
                const initial_supply = (1_000_000_000).toString();
                setLoading(true);
                const tx = await rektContract.approve(
                    REKT_TX_BATCHER, utils.parseEther(initial_supply)
                );
                setLoading(false);
                await tx.wait();
                setApprovedContract(true);
            } catch (approveError) {
                setLoading(false);
                setApprovedContract(false);
            }
        }
    }

    return (
        <Button
            size="md"
            w="full"
            isLoading={loading}
            onClick={approvedContract ? undefined : approveAllowance}
        >
            Approve
        </Button>
    )
}
