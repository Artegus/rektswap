import create from "zustand";
import { providers } from "ethers";
type TransactionReceipt = providers.TransactionReceipt;

interface OrdersStore {
	lastTransactions: TransactionReceipt[];
	addTransaction: (newTx: TransactionReceipt) => void;
	setTransactions: (txs: TransactionReceipt[]) => void;
}

const useOrdersStore = create<OrdersStore>((set, get) => ({
	lastTransactions: [],
	addTransaction: newTx => set(state => {state.lastTransactions.push(newTx);}),
	setTransactions: txs => set(state => ({
		...state,
		lastTransactions: txs
	})),
}));

export { useOrdersStore };

