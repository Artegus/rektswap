import create from 'zustand';

interface UserStore {
    isConnected: boolean;
    activatingConnector: any | undefined;
    address: string | undefined;
    chainId: number | undefined;
    connect: (address: string, chainId: number) => void;
    disconnect: () => void;
    changeChain: () => void;
    setActivatingConnector: (currentConnector: any) => void;
}

const useUserStore = create<UserStore>((set, get) => ({
    isConnected: false,
    activatingConnector: undefined,
    address: undefined,
    chainId: undefined,
    setActivatingConnector: (currentConnector: any) => set(state => ({
        ...state,
        activatingConnector: currentConnector
    })),
    connect: (address, chainId) => set(state => ({
        ...state,
        address,
        chainId,
        isConnected: true
    })),
    disconnect: () => set(state => ({
        isConnected: false,
        address: undefined,
        chainId: undefined
    })),
    changeChain: () => set(state => ({}))
}));

export { useUserStore };
