import { injected } from "./config";

enum ConnectorNames {
    Injected = 'Injected',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
}

export { connectorsByName, ConnectorNames };