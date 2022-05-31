import { FC, useEffect } from 'react'

import {
	Modal, ModalOverlay, 
	ModalContent,
	ModalHeader, ModalCloseButton, ModalBody,
	Text, VStack, Divider, Container
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


const maxTxToShow = 5;

const estimatedBlocksPerDay = 6000;
const totalHistoryDays = 1;
const blockMargin = totalHistoryDays * estimatedBlocksPerDay;

export const OrderHistory: FC<Props> = ({
	isOpen, onOpen, onClose
}) => {
	
	const { active, account } = useWeb3React<Web3Provider>();
	const { currentTab } = useSwapStore();
	const { lastTransactions, setTransactions } = useOrdersStore();
	const rektContract = useRektContract();
	const wethContract = useWethContract();

	const mergeEvents = (arr1: Event[], arr2: Event[]) => {
		if(arr1.length === 0) return arr2;
		if(arr2.length === 0) return arr1;
		let events: Event[] = [];
		let [i, j] = [0, 0];
		while(i !== arr1.length && j !== arr2.length) {
			if(arr1[i].blockNumber > arr2[j].blockNumber) {
				events.push(arr2[j]);
				j++;
			}
			else if(arr1[i].blockNumber < arr2[j].blockNumber) {
				events.push(arr1[i]);
				i++;
			}
		}
		if(i !== arr1.length)
			return events.concat(arr1.slice(i, arr1.length));
		if(j !== arr2.length)
			return events.concat(arr2.slice(j, arr2.length));
		return events;
	}

	const getLastOrders = async () => {
		if(rektContract) {
			const sellsFilter: EventFilter = rektContract.filters.Transfer(account, batcherAddr);
			const buysFilter: EventFilter = rektContract.filters.Transfer(uniswapPairAddr, account);
			const sellsEvents: Event[] = await rektContract.queryFilter(sellsFilter, -blockMargin);
			const buysEvents: Event[] = await rektContract.queryFilter(buysFilter, -blockMargin);

			const txs: providers.TransactionReceipt[] = await Promise.all(
				mergeEvents(sellsEvents, buysEvents).map(async (tx: Event) => {
					return tx.getTransactionReceipt()
				}
			));
			setTransactions(txs);
		}
	}

	useEffect(() => {
		if (typeof account === "string")
			getLastOrders();
		else
			setTransactions([]);
	}, [account])
	
	return (
		<Modal isOpen={isOpen} onClose={onClose} >
			<ModalOverlay />
			<ModalContent>
			  	<ModalHeader>Recent Orders</ModalHeader>
			  	<ModalCloseButton />
			  	<ModalBody pb={6}>
					{lastTransactions.length !== 0 ?
						<>
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
								)).reverse().slice(0, maxTxToShow)}
							</VStack> 
							{lastTransactions.length > maxTxToShow ?
								<Container centerContent>...</Container> : null
							}
						</> : <Text>There are not any recent orders</Text>
					}
			  	</ModalBody>
			</ModalContent>
		</Modal>
	);
}
