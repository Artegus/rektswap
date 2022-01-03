import { InjectedConnector } from '@web3-react/injected-connector'
import { ALL_SUPPORTED_CHAIN_IDS } from '../config/constants/chains/chains'

const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export { injected };