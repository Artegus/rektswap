import create from 'zustand';
import { IToken } from '../types/IToken';

interface SwapStore {
    tokenIn: IToken | undefined;
    tokenOut: IToken | undefined;
    typedIn: string;
    estimatedOut: string;
    approvedContract: boolean;
    setTypedIn: (amout: string) => void;
    setEstimitedOut: (amout: string) => void;
    setTokenIn: (_tokenIn: IToken | undefined) => void;
    setTokenOut: (_tokenOut: IToken | undefined) => void;
    turnAroundTokens: () => void;
	lastTx: object;
	setLastTx: (tx: object) => void;
	currentTab: "Buy" | "Sell";
	currentTabIsBuy: () => void;
	currentTabIsSell: () => void;
    setApprovedContract: (approved: boolean) => void;
}


const useSwapStore = create<SwapStore>((set, get) => ({
    tokenIn: undefined,
    tokenOut: undefined,
    typedIn: '',
    estimatedOut: '',
	lastTx: {},
	currentTab: "Buy",
    approvedContract: false,
    setApprovedContract: (approved: boolean) => {
        return set((state) => ({
            ...state, approvedContract: approved
        }))
    },
    setTokenIn: (_tokenIn: IToken | undefined ) => {
        if (get().tokenOut === undefined) {
            return set((state) => ({ ...state, tokenIn: _tokenIn }));
        }
        if (_tokenIn?.address === get().tokenOut?.address) {
            return set((state) => ({ ...state, tokenIn: get().tokenOut, tokenOut: get().tokenIn}));
        }
        
        return set((state) => ({ ...state, tokenIn: _tokenIn }));
    },
    setTokenOut: (_tokenOut: IToken | undefined) => {
        if (_tokenOut?.address !== get().tokenIn?.address) {
            return set((state) => ({ ...state, tokenOut: _tokenOut }));
        }
    },
    turnAroundTokens: () => {
        return set((state) =>({
            ...state,
            tokenIn: get().tokenOut,
            tokenOut: get().tokenIn,
            estimatedOut: get().typedIn,
            typedIn: get().estimatedOut
        }));
    },
    setEstimitedOut: (amout: string) => {
        return set((state) => ({ ...state, estimatedOut: amout }));
    },
    setTypedIn: (amout: string) => { 
        return set((state) => ({ ...state, typedIn: amout}))
    },
	setLastTx: (tx: object) => {
		return set(state => ({ ...state, lastTx: tx }))
	},
	currentTabIsBuy: () => {
		return set(state => ({ ...state, currentTab: "Buy" }))
	},
	currentTabIsSell: () => {
		return set(state => ({ ...state, currentTab: "Sell" }))
	}
}));

export { useSwapStore };
