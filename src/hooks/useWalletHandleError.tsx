import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers';
import { Web3Error } from '../Errors/Web3Error';

const WEB3_ERROR_DURATION = 4_000;

const useWalletHandleError = () => {

    const { error } = useWeb3React<Web3Provider>();
    const [errorWeb3, setErrorWeb3] = useState<Web3Error | undefined>(undefined);

    const toast = useToast({
        title: 'Error',
        duration: WEB3_ERROR_DURATION,
        status: 'error',
    });

    useEffect(() => {
        if (error) {
            if (errorWeb3 === undefined) {
                setErrorWeb3(new Web3Error(error));
            }
        }
    }, [error])

    useEffect(() => {
        if (errorWeb3) {
            toast({
                description: errorWeb3.message
            })
            setTimeout(() => {
                setErrorWeb3(undefined);
            }, 2000)
        }
    }, [errorWeb3])
}

export { useWalletHandleError };