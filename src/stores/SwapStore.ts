import create from 'zustand';
import defaultTokens from '../config/constants/tokenLists/default.tokenlist';
import { IToken } from '../types/IToken';

interface SwapStore {
    tokenIn: IToken | undefined;
    tokenOut: IToken | undefined;
    typedIn: string;
    estimatedOut: string;
    setTypedIn: (amout: string) => void;
    setEstimitedOut: (amout: string) => void;
    setTokenIn: (_tokenIn: IToken | undefined) => void;
    setTokenOut: (_tokenOut: IToken | undefined) => void;
    turnAroundTokens: () => void;
}

const defaultTokenIn:IToken = {
    address: defaultTokens[0].address,
    chainId: defaultTokens[0].chainId,
    decimals: defaultTokens[0].decimals,
    name: defaultTokens[0].name,
    symbol: defaultTokens[0].symbol
}

const useSwapStore = create<SwapStore>((set, get) => ({
    tokenIn: defaultTokenIn,
    tokenOut: undefined,
    typedIn: '',
    estimatedOut: '',
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
    }
}));

export { useSwapStore };