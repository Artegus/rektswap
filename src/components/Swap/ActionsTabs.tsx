import { 
	Tab, TabList, TabPanel, TabPanels, Tabs,
	useColorModeValue,
	VStack
} from "@chakra-ui/react"
import { FC } from "react";
import { Props } from "../../types/TabProps/TabProps";
import { SellRektTab } from "./SellRektTab";
import { BuyRektTab } from "./BuyRektTab";
import { useSwapStore } from '../../stores/SwapStore';
import { ACTION_TABS } from "./responsive/breakpoints";

type TabData = {
    title: string;
    content: FC<Props>;
	handleClick: () => void;
}

export const ActionsTabs = () => {

	const { currentTabIsBuy, currentTabIsSell } = useSwapStore();

	const borderColor = useColorModeValue('brandLightAlpha.300', 'whiteAlpha.300');
	const colorScheme = useColorModeValue('purple', 'purple');

    const tabsData: TabData[] = [
        {
            title: "Buy REKTcoin",
            content: BuyRektTab,
			handleClick: currentTabIsBuy
        },
        {
            title: "Sell REKTcoin",
            content: SellRektTab,
			handleClick: currentTabIsSell
        },
    ]

    return (
		<VStack
			align='stretch'
			w={ACTION_TABS.VStackWidth}
		>
			<Tabs
				borderColor={borderColor}
				colorScheme={colorScheme}
				isFitted
				borderRadius='md'
				borderWidth='1px'
			>
				<TabList mb='1em'>
					{tabsData.map((tab, index) => (
						<Tab key={index} onClick={tab.handleClick}>{tab.title}</Tab>
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
		</VStack>
    )
}
