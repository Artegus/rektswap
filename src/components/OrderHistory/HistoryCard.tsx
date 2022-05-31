import { FC } from "react";
import { useSwapStore } from "../../stores/SwapStore";
import { providers, utils } from "ethers";
import { defaultContracts } from "../../config/constants/tokenLists/default.contracts";
import { formatEth } from "../Swap/BuyRektTab";
import { formatRekt } from "../Swap/SellRektTab";

import {
	Badge, Text
} from "@chakra-ui/react";

export const HistoryCard: FC<{tx: providers.TransactionReceipt}> = tx => { 

	const { currentTab } = useSwapStore();

	const BuyText: FC = () => {
		const quantitySold = utils.formatUnits(tx.tx.logs[1].data);
		const quantityReceived = utils.formatUnits(tx.tx.logs[2].data);
		return (
			<>
			Buy <Badge>
				{formatRekt(parseFloat(quantityReceived))} REKT
			</Badge> for <Badge>
				{formatEth(parseFloat(quantitySold))} ETH
			</Badge>
			</>
		)
	};
	const SellText: FC = () => {
		const quantitySold = utils.formatUnits(tx.tx.logs[0].data);
		const quantityReceived = "0"; // TODO implement @DennisDv24 crazy algorithm
		return (
			<>
			Sell <Badge>
				{formatRekt(parseFloat(quantitySold))} REKT
			</Badge> for <Badge>
				{formatEth(parseFloat(quantityReceived))} ETH
			</Badge>
			</>
		)
	};
	
	const isBuyOrder = (tx: any) => 
		tx.tx.to !== defaultContracts.REKT_TRANSACTION_BATCHER.address;	

	return (
		<Text
			fontSize='1xl'
			px={4}
			py={2}
			textAlign='left'
			w='100%'
		>
			{isBuyOrder(tx) ? <BuyText /> : <SellText />}
		</Text> 
	);
}

