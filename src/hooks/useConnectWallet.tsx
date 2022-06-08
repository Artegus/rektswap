import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useUserStore } from "../stores/UserStore";
import { connectorsByName, ConnectorNames } from '../connectors';

function useConnectWallet() {

    const { setActivatingConnector } = useUserStore();
    const { activate } = useWeb3React<Web3Provider>();

    return async (connectorName: ConnectorNames) => {
        await activate(connectorsByName[connectorName], undefined, false);
        setActivatingConnector(connectorsByName[connectorName]);
    }
}

export { useConnectWallet };