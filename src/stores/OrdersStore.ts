import create from "zustand';
import { providers } from "ethers";
type TransactionReceipt = providers.TransactionReceipt;

interface OrdersStore {
	lastTransactions: TransactionReceipt[];
	addTransaction: (newTx: TransactionReceipt) => void;
}

const useOrdersStore = create<OrdersStore>((set, get) => ({
	lastTransactions: [],
	addTransaction: newTx => set(state => ({
		...state,
		lastTransactions.push(newTx)
	})),
}));

export { useOrdersStore };

