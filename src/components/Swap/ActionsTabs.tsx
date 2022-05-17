import { 
	Tab, TabList, TabPanel, TabPanels, Tabs,
	VStack, Box
} from "@chakra-ui/react"
import { FC } from "react";
import { Props } from "../../types/TabProps/TabProps";
import { SellRektTab } from "./SellRektTab";
import { BuyRektTab } from "./BuyRektTab";
import { RektHistory } from "./RektHistory";

type TabData = {
    title: string;
    content: FC<Props>
}

export const ActionsTabs = () => {

    const tabsData: TabData[] = [
        {
            title: "Buy REKTcoin",
            content: BuyRektTab
        },
        {
            title: "Sell REKTcoin",
            content: SellRektTab
        },
    ]

    return (
		<VStack>
			<Tabs
				isFitted
				borderRadius='md'
				borderWidth='1px'
			>
				<TabList mb='1em'>
					{tabsData.map((tab, index) => (
						<Tab key={index} >{tab.title}</Tab>
					))}
				</TabList>
				<TabPanels>
					{tabsData.map((tab, index) => (
						<TabPanel key={index} >
							<tab.content tabTitle={tab.title} />
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
			{/* 
				TODO it should be an generic History but first
				Ill do the RektHistory
			*/}
			<RektHistory/>
		</VStack>
    )
}
