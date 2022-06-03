import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';
import { Web3Error, ProviderRpcError } from '../Errors/Web3Error';
import { utils } from 'ethers';
import { config } from '../config/config';

const WEB3_ERROR_DURATION = 4_000;

const useWalletHandleError = () => {

    const { error, active } = useWeb3React<Web3Provider>();
    const [errorWeb3, setErrorWeb3] = useState<Web3Error | undefined>(undefined);

    const toast = useToast({
        title: 'Error',
        duration: WEB3_ERROR_DURATION,
        status: 'error',
        position: 'top'
    });

    const suggestNetworkChange = async () => {
        const ethereum = window.ethereum as ExternalProvider;
        const supportedChain = utils.hexValue(config.CHAIN_ID);

        if (ethereum && ethereum.request) {
            const chainId = await ethereum.request({ method : 'net_version' });

            if (chainId !== config.CHAIN_ID) {
                try {
                    await ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [
                            { chainId: supportedChain }
                        ]
                    })
                } catch (switchError) {
                    let swError = switchError as any;
                    if (config.ENVIROMENT === 'production') {
                        if (swError.code === 4902) {
                            tryToAddNetwork(supportedChain);
                        }
                    }
                }
            }
        }
    }

    const tryToAddNetwork = async (supportedChain: string) => {
        const ethereum = window.ethereum as ExternalProvider;
        if (ethereum && ethereum.request) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                    {
                        chainId: supportedChain,
                        chainName: 'Polygon',
                        rpcUrls: ['https://polygon-rpc.com/'],
                    },
                    ],
                });
            } catch (addError) {
                console.error(addError)
            }
        }
    }

    useEffect(() => {
        if (error) {
            if (errorWeb3 === undefined) {
                setErrorWeb3(new Web3Error(error as ProviderRpcError));
            }
        }
    }, [error])

    useEffect(() => {
        if (errorWeb3) {
            toast({
                description: errorWeb3.message
            })

            if (errorWeb3.name === 'UnsupportedChainId') {
                suggestNetworkChange();
            }

            setTimeout(() => {
                setErrorWeb3(undefined);
            }, 2000)
        }
    }, [errorWeb3])
}

export { useWalletHandleError };