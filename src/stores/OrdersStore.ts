import create from "zustand";
import { providers } from "ethers";

type TransactionReceipt = providers.TransactionReceipt;
type PendingTx = {
	buy: number; forAmount: number
};
type HistoryCardProps = TransactionReceipt | PendingTx;

interface OrdersStore {
	lastTransactions: HistoryCardProps[];
	addTransaction: (newTx: HistoryCardProps) => void;
	setTransactions: (txs: HistoryCardProps[]) => void;
}

const useOrdersStore = create<OrdersStore>((set, get) => ({
	lastTransactions: [],
	addTransaction: newTx => set(state => {
		state.lastTransactions.push(newTx);
		return state;
	}),
	setTransactions: txs => set(state => ({
		...state,
		lastTransactions: txs
	})),
}));

export { useOrdersStore };

