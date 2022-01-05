import { injected } from "./config";

enum ConnectorNames {
    Injected = 'Injected',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
}