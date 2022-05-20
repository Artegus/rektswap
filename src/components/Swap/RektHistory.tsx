import { FC, useEffect, useState } from "react";
import {
	VStack, Heading
} from "@chakra-ui/react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers, utils } from "ethers";

import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
import { useSwapStore } from "../../stores/SwapStore";

import { getRektCoinContract, formatRekt } from "./SellRektTab";
import { getWethContract, formatEth } from "./BuyRektTab";
import { HistoryCard } from "./HistoryCard";

const batcherAddr = defaultContracts.REKT_TRANSACTION_BATCHER.address;
const uniswapPairAddr = defaultContracts.UNISWAPV2_PAIR.address;
const uniRouterAddr = defaultContracts.UNISWAPV2_ROUTER02.address;

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
	const txs = await rekt.queryFilter(
		filter, -blockMargin
	);
	setter(txs.map((tx: any) => {
		return {
			"quantitySold": formatRekt(
				parseFloat(utils.formatUnits(
					tx.args.value
				))
			),
			"quantityReceived": "0"
		}
	}));
}

const getLastRektBuys = async (lib: any, addr: string, setter: any) => {
	const weth = getWethContract(lib);
	const bal = await weth.balanceOf(addr);
	const filter = weth.filters.Transfer(uniRouterAddr, uniswapPairAddr);
	const txs = await weth.queryFilter(
		filter, -blockMargin
	);
	const totalTxs = await Promise.all(txs.map(async (tx: any) => {
		return await tx.getTransactionReceipt()
	}));
	const userTxs = totalTxs.filter(tx => tx.from === addr);

	setter(userTxs.map((tx: any) => {
		return {
			"quantitySold": formatEth(
				parseFloat(utils.formatUnits(
					tx.logs[1].data
				))
			),
			"quantityReceived": formatRekt(
				parseFloat(utils.formatUnits(
					tx.logs[2].data
				))
			)
		}
	}));
};

export const RektHistory: FC = () => {

	const { active, library, account } = useWeb3React<Web3Provider>();
	const { lastTx, currentTab } = useSwapStore();

	const [lastRektOperations, setLastRektOperations] = useState<any[]>([]);

	useEffect(() => {
		if (typeof account === "string")
			if (currentTab === "Sell")
				getLastRektSells(library, account, setLastRektOperations);
			else
				getLastRektBuys(library, account, setLastRektOperations);
		else
			setLastRektOperations([]);
	}, [account, currentTab, active])

	return (
		<VStack
			pt={6}
			alignItems="stretch"
		>
			{
				lastRektOperations.length !== 0 ?
					<>
						<Heading
							fontSize='2xl'
						>Recent Transactions</Heading>
						<VStack
							borderRadius='md'
							borderWidth='1px'
						>
							{lastRektOperations.map(txData => (
								<HistoryCard
									quantitySold={txData.quantitySold}
									quantityReceived={txData.quantityReceived}
								/>
							)).reverse()}
						</VStack>
					</>
					: null
			}
		</VStack>
	);

}
