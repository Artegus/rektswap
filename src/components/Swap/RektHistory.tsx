import { FC, useEffect, useState } from "react";
import {
	Center, Text, Box,
	VStack, Heading
} from "@chakra-ui/react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
import { useSwapStore } from "../../stores/SwapStore";

import { getRektCoinContract, formatRekt } from "./SellRektTab";
import { HistoryCard } from "./HistoryCard";
import { ACTION_TABS } from "./responsive/breakpoints";

const batcherAddr = defaultContracts.REKT_TRANSACTION_BATCHER.address;

// TODO this should not be hardcoded
const RPC = "https://kovan.infura.io/v3/2b0748dfb0fb40af996afae36875897c";
const infuraProv = new ethers.providers.JsonRpcProvider(RPC);

// TODO it should go from account to rektTransactionBatcher addr
const estimatedBlocksPerDay = 6000;
const totalHistoryDays = 2;
const blockMargin = totalHistoryDays * estimatedBlocksPerDay;

const getLastRektSells = async (lib: any, addr: string, setter: any) => {
	const rekt = getRektCoinContract(lib);
	const filter = rekt.filters.Transfer(addr, batcherAddr);
	const currentBlock = await infuraProv.getBlockNumber();
	const txs = await rekt.queryFilter(
		filter, currentBlock - blockMargin, currentBlock
	);
	setter(txs.map((tx: any) => {
		return {
			"quantitySold": formatRekt(tx.args.value)
		}
	}));
}

export const RektHistory: FC = () => {

	const { active, library, account } = useWeb3React<Web3Provider>();
	const { lastTx } = useSwapStore();
	

	// TODO this might need to use the Store
	// TODO I should have some kind of interface for for
	// the tx object
	const [lastRektSales, setLastRektSales] = useState<any[]>([]);
	console.log(lastRektSales);
	useEffect(() => {
		if (typeof account === "string")
			getLastRektSells(library, account, setLastRektSales)
	}, [account])

	return (
		<VStack pt={6}>
		{
			lastRektSales.length !== 0 ?
				<Heading 
					fontSize='2xl'
				>Recent Transactions</Heading>
			: null
		}
		<VStack>
			{lastRektSales.map(txData => (
				<HistoryCard quantitySold={txData.quantitySold} />
			)).reverse()}
		</VStack>
		</VStack>
	);

}
