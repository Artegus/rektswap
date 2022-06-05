import { useEffect, useRef } from 'react'
import { useTxsBatcherStore } from '../stores/TransactionBatcherStore'

const POLLING_INTERVAL = 2 * 60 * 1000;

export const usePollingRektBatchStatus = () => {

    const { updateRektBatcherStatus } = useTxsBatcherStore();

    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const initPollingStatusRektBatcherStatus = async () => {
        await updateRektBatcherStatus();
        pollingRef.current = setInterval(async () => {
            await updateRektBatcherStatus();
        }, POLLING_INTERVAL)
    }

    useEffect(() => {
        initPollingStatusRektBatcherStatus();
        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
        }
    }, [])

    return usePollingRektBatchStatus;
}