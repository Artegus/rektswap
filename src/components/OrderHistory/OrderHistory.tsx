import { FC, useEffect } from 'react'

import {
	Modal, ModalOverlay, 
	ModalContent,
	ModalHeader, ModalCloseButton, ModalBody,
	Text, VStack, Divider
} from '@chakra-ui/react';

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Event, EventFilter, providers } from "ethers";

import { Props } from "../../types/HistoryProps/HistoryProps";
import { useRektContract, useWethContract } from "../../hooks/useContract";

import { HistoryCard } from "./HistoryCard";

import { useSwapStore } from "../../stores/SwapStore";
import { useOrdersStore } from "../../stores/OrdersStore";

import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
const batcherAddr = defaultContracts.REKT_TRANSACTION_BATCHER.address;
const uniswapPairAddr = defaultContracts.UNISWAPV2_PAIR.address;
const uniRouterAddr = defaultContracts.UNISWAPV2_ROUTER02.address;


const estimatedBlocksPerDay = 6000;
const totalHistoryDays = 2;
const blockMargin = totalHistoryDays * estimatedBlocksPerDay;

export const OrderHistory: FC<Props> = ({
	isOpen, onOpen, onClose
}) => {
	
	const { active, account } = useWeb3React<Web3Provider>();
	const { currentTab } = useSwapStore();
	const { lastTransactions, setTransactions } = useOrdersStore();
	const rektContract = useRektContract();
	const wethContract = useWethContract();

	const getLastRektSells = async () => {
		if (rektContract) {
			const filter: EventFilter = rektContract.filters.Transfer(account, batcherAddr);
			const txs: Event[] = await rektContract.queryFilter(
				filter, -blockMargin
			);
			setTransactions(await Promise.all(txs.map(async (tx: Event) => {
				return tx.getTransactionReceipt();
			})));	
		}
	}

	const getLastRektBuys = async () => {
		if (wethContract) {
			const filter: EventFilter = wethContract.filters.Transfer(uniRouterAddr, uniswapPairAddr);
			const txs: Event[] = await wethContract.queryFilter(filter, -blockMargin);
			const totalTxs: providers.TransactionReceipt[] = await Promise.all(txs.map(async (tx: Event) => {
				return tx.getTransactionReceipt()
			}));
			
			const userTxs = totalTxs.filter(tx => tx.from === account);
			setTransactions(userTxs);
		}
	}

	const getLastOrders = async () => {
		if(rektContract) {
			const buysFilter: EventFilter = rektContract.filters.Transfer(account, batcherAddr);
			const sellsFilter: EventFilter = rektContract.filters.Transfer(uniswapPairAddr, account);
			const txEvents: Event[] = await rektContract.queryFilter({
				topics: [
					[buysFilter.topics![0], sellsFilter.topics![0]].flat()
				]
			}, -blockMargin);
			console.log(txEvents);
			const txs: providers.TransactionReceipt[] = await Promise.all(
				txEvents.map(async (tx: Event) => {
					return tx.getTransactionReceipt()
				}
			));
			console.log(txs);
			setTransactions(txs);
		}
	}

	useEffect(() => {
		if (typeof account === "string")
			getLastOrders();
		else
			setTransactions([]);
	}, [account, currentTab, active])
	
	return (
		<Modal isOpen={isOpen} onClose={onClose} >
			<ModalOverlay />
			<ModalContent>
			  	<ModalHeader>Recent Orders</ModalHeader>
			  	<ModalCloseButton />
			  	<ModalBody pb={6}>
					{lastTransactions.length !== 0 ?
						<VStack
							borderRadius='md'
							//borderWidth='1px'
							overflowY="auto"
						>
							{lastTransactions.map(txData => (
								<>
								<Divider />
								<HistoryCard tx={txData} />
								</>
							)).reverse()}
						</VStack> : <Text>There are not any recent orders</Text>
					}
			  	</ModalBody>
			</ModalContent>
		</Modal>
	);
}
