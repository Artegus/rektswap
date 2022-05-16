import create from 'zustand';

interface UserStore {
    isConnected: boolean;
    activatingConnector: any | undefined;
    address: string | undefined;
    chainId: number | undefined;
	formatedEthBalance: string;
	formatedRektBalance: string;
    connect: (address: string, chainId: number) => void;
    disconnect: () => void;
    changeChain: () => void;
    setActivatingConnector: (currentConnector: any) => void;
	setFormatedEthBalance: (bal: string) => void;
	setFormatedRektBalance: (bal: string) => void;
}

const useUserStore = create<UserStore>((set, get) => ({
    isConnected: false,
    activatingConnector: undefined,
    address: undefined,
    chainId: undefined,
	formatedEthBalance: "",
	formatedRektBalance: "",
    setActivatingConnector: (currentConnector: any) => set(state => ({
        ...state,
        activatingConnector: currentConnector
    })),
	setFormatedEthBalance: (bal: string) => set(state => ({
		...state,
		formatedEthBalance: bal
	})),
	setFormatedRektBalance: (bal: string) => set(state => ({
		...state,
		formatedRektBalance: bal
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
