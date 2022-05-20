import { FC, useEffect, useState } from "react";
import {
	VStack, Heading
} from "@chakra-ui/react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers, Event, EventFilter, utils } from "ethers";

import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
import { useSwapStore } from "../../stores/SwapStore";

import { formatRekt } from "./SellRektTab";
import { formatEth } from "./BuyRektTab";
import { HistoryCard } from "./HistoryCard";
import { useRektContract, useWethContract } from "../../hooks/useContract";
import { TransactionReceipt, UserTransaction } from "../../types/Transaction/Transaction";

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

export const RektHistory: FC = () => {

	const { active, account } = useWeb3React<Web3Provider>();
	const [lastRektOperations, setLastRektOperations] = useState<UserTransaction[]>([]);
	
	const { currentTab } = useSwapStore();
	const rektContract = useRektContract();
	const wethContract = useWethContract();

	const getLastRektSells = async () => {
		if (rektContract) {
			const filter: EventFilter = rektContract.filters.Transfer(account, batcherAddr);
			const txs: Event[] = await rektContract.queryFilter(
				filter, -blockMargin
			);
			setLastRektOperations(txs.map((tx: Event) => {
				return {
					transactionHash: tx.transactionHash,
					quantitySold: formatRekt(
						parseFloat(utils.formatUnits(
							tx.args?.value
						))
					),
					quantityReceived: "0"
				}
			}))
		}
	}

	const getLastRektBuys = async () => {
		if (wethContract) {
			const filter: EventFilter = wethContract.filters.Transfer(uniRouterAddr, uniswapPairAddr);
			const txs: Event[] = await wethContract.queryFilter(filter, -blockMargin);
			const totalTxs: TransactionReceipt[] = await Promise.all(txs.map(async (tx: Event) => {
				return tx.getTransactionReceipt()
			}));
			
			const userTxs = totalTxs.filter(tx => tx.from === account);

			setLastRektOperations(userTxs.map((tx: TransactionReceipt) => {
				return {
					transactionHash: tx.transactionHash,
					quantitySold: formatEth(
						parseFloat(utils.formatUnits(
							tx.logs[1].data
						))
					),
					quantityReceived: formatRekt(
						parseFloat(utils.formatUnits(
							tx.logs[2].data
						))
					)
				}
			}))
		}
	};




	useEffect(() => {
		if (typeof account === "string")
			if (currentTab === "Sell")
				getLastRektSells();
			else
				getLastRektBuys();
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
						>Recent Transactions (total: {lastRektOperations.length})</Heading>
						<VStack
							borderRadius='md'
							borderWidth='1px'
							overflowY="auto"
							height={[300, 200, 150]}
						>
							{lastRektOperations.map(txData => (
								<HistoryCard
									key={txData.transactionHash}
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
