import {
    NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import { UnsupportedChainIdError } from '@web3-react/core';

export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

class Web3Error implements ProviderRpcError {

    private readonly ERROR_ALREADY_PROCESSING_ETH_REQUEST = -32002;

    message: string = '';
    data?: unknown;
    name: string = '';
    stack?: string;
    cause?: Error;
    code: number;

    constructor(error: ProviderRpcError) {
        this.code = error.code;
        this.setNameAndMessageError(error);
    }

    private setNameAndMessageError(error: Error) {
        if (error instanceof NoEthereumProviderError) {
            this.name = 'NoEthereumProvider'
            this.message = 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
        } else if (error instanceof UnsupportedChainIdError) {
            this.name = 'UnsupportedChainId'
            this.message = "You're connected to an unsupported network."
        } else if (error instanceof UserRejectedRequestErrorInjected) {
            this.name = 'UserRejectedRequestError'
            this.message = "Please authorize this website to access your Ethereum account."
        } else if (this.code === this.ERROR_ALREADY_PROCESSING_ETH_REQUEST) {
            this.name = 'AlreadyProcessingEthRequestAccounts'
            this.message = error.message;
        } else {
            this.name = error.name;
            this.message = error.message;
        }
    }

}

export { Web3Error }