import { FC, useState, useEffect } from 'react'

import {
	Modal, ModalOverlay, useDisclosure,
	ModalContent,
	ModalHeader, ModalCloseButton, ModalBody,
	Text, VStack, Divider
} from '@chakra-ui/react';

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers, Event, EventFilter, utils } from "ethers";

import { Props } from "../../types/HistoryProps/HistoryProps";
import { TransactionReceipt, UserTransaction } from "../../types/Transaction/Transaction";
import { useRektContract, useWethContract } from "../../hooks/useContract";

import { HistoryCard } from "./HistoryCard";

import { formatRekt } from "../Swap/SellRektTab";
import { formatEth } from "../Swap/BuyRektTab";

import { useSwapStore } from "../../stores/SwapStore";

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
	// TODO this should be centralized and you should update it from the Swap tabs.
	const [lastRektOperations, setLastRektOperations] = useState<UserTransaction[]>([]);
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
	}

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
		<Modal isOpen={isOpen} onClose={onClose} >
			<ModalOverlay />
			<ModalContent>
			  	<ModalHeader>Recent Orders</ModalHeader>
			  	<ModalCloseButton />
			  	<ModalBody pb={6}>
					{lastRektOperations.length !== 0 ?
						<VStack
							borderRadius='md'
							//borderWidth='1px'
							overflowY="auto"
						>
							{lastRektOperations.map(txData => (
								<>
								<Divider />
								<HistoryCard
									key={txData.transactionHash}
									quantitySold={txData.quantitySold}
									quantityReceived={txData.quantityReceived}
								/>
								</>
							)).reverse()}
						</VStack> : <Text>There are not any recent orders</Text>
					}
			  	</ModalBody>
			</ModalContent>
		</Modal>
	);
}
