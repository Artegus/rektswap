import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Contract, providers } from "ethers";
import create from "zustand";
import { config } from "../config/config";
import { REKT_TX_BATCHER } from "../config/constants/tokenLists/default.contracts";
import rektTxbatcher from '../abis/rektcoinBatch.json'

interface TxsBatcherStore {
	statusBatcher: boolean;
	contractReadOnly: Contract | null;
	setCurrentStatus: (active: boolean) => void;
	updateRektBatcherStatus: () => Promise<void>;
}

const useTxsBatcherStore = create<TxsBatcherStore>((set, get) => ({
	statusBatcher: false,
	contractReadOnly: null,
	setCurrentStatus: active => set(state => ({
		...state,
		statusBatcher: active
	})),
	updateRektBatcherStatus: async () => {
		let provider: Web3Provider | JsonRpcProvider;
		const contract = get().contractReadOnly;
		if (contract !== null) {
			let isActive: boolean[] = await contract.functions['saleOfBatchInProcess']();
			set(state => ({
				...state,
				statusBatcher: isActive[0],
			}));
		} else {
			if (window.ethereum) {
				provider = new providers.Web3Provider(window.ethereum);
			} else {
				provider = new providers.JsonRpcProvider(config.INFURA_ENDPOINT);
			}

			const contract = new Contract(REKT_TX_BATCHER, rektTxbatcher, provider);
			let isActive: boolean[] = await contract.functions['saleOfBatchInProcess']();
			set(state => ({
				...state,
				statusBatcher: isActive[0],
				contractOnlyRead: contract
			}));
		}
	}
}));

export { useTxsBatcherStore };

