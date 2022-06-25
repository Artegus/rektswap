import create from 'zustand';

interface SwapStore {
    approvedContract: boolean;
    ethBalance: string;
    rektBalance: string;
    swap: {
        inputAmount: string;
        outputAmount: string;
    }
    setApprovedContract: (approved: boolean) => void;
    setEthBalance: (value: string) => void;
    setRektBalance: (value: string) => void;
    setBuyInputAmount: (amount: string) => void;
    setBuyOutputAmount: (amount: string) => void;
}


const useSwapStore = create<SwapStore>((set, _get) => ({
    approvedContract: false,
    ethBalance: '',
    rektBalance: '',
    swap : {
        inputAmount: '',
        outputAmount: '',
    },
    setApprovedContract: (approved: boolean) => {
        return set((state) => ({
            ...state, approvedContract: approved
        }))
    },
    setEthBalance: (value) => {
        return set((state) => ({
            ...state,
            ethBalance: value
        }))
    },
    setRektBalance: (value) => {
        return set((state) => ({
            ...state,
            rektBalance: value
        }))
    },
    setBuyInputAmount: (amount) => {
        return set((state) => ({
            ...state,
            swap: {
                ...state.swap,
                inputAmount: amount
            }
        }))
    },
    setBuyOutputAmount: (amount) => {
        return set((state) => ({
            ...state,
            swap: {
                ...state.swap,
                outputAmount: amount
            }
        }))
    }

}));

export { useSwapStore };
