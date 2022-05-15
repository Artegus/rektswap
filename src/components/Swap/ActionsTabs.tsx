import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { SellRektTab } from "./SellRektTab";
import { SwapTab } from "./SwapTab";

export const ActionsTabs = () => {

    const actionTabs = ["Swap", "Sell RektCoin"];

    return (
        <Tabs
            isFitted
            borderRadius='md'
            borderWidth='1px'
        >
            <TabList mb='1em'>
                {actionTabs.map(action => (
                    <Tab key={action} >{action}</Tab>
                ))}
            </TabList>
            <TabPanels>
                <TabPanel>
                    <SwapTab tabTitle={actionTabs[0]} />
                </TabPanel>
                <TabPanel>
                    <SellRektTab tabTitle={actionTabs[1]} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}