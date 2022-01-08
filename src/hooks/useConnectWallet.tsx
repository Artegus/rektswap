import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useUserStore } from "../stores/UserStore";
import { connectorsByName, ConnectorNames } from '../connectors';

function useConnectWallet() {

    const { setActivatingConnector } = useUserStore();
    const { activate } = useWeb3React<Web3Provider>()
    const connectWallet = async (connectorName: ConnectorNames) => {
        setActivatingConnector(connectorsByName[connectorName])
        try {
            await activate(connectorsByName[connectorName])
        } catch (e) {
            console.error(e);
        }
    }

    return connectWallet
}
export { useConnectWallet };