import {
    NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import { UnsupportedChainIdError } from '@web3-react/core';

class Web3Error extends Error {

    private error: Error;

    constructor(error: Error) {
        super();
        this.error = error;
        this.setNameAndMessageError();
    }

    private setNameAndMessageError() {
        if (this.error instanceof NoEthereumProviderError) {
            this.name = 'NoEthereumProvider'
            this.message = 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
        } else if (this.error instanceof UnsupportedChainIdError) {
            this.name = 'UnsupportedChainId'
            this.message = "You're connected to an unsupported network."
        } else if (this.error instanceof UserRejectedRequestErrorInjected) {
            this.name = 'UserRejectedRequestError'
            this.message = "Please authorize this website to access your Ethereum account."
        } else {
            console.error(this.error);
            console.error('An unknown error occurred. Check the console for more details.')
        }
    }

}

export { Web3Error }