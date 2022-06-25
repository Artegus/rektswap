import { FC } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, Link
} from '@chakra-ui/react'

import { batcherEtherscan, liqLockedTx } from '../AboutRekt/AboutRekt';
import { TelegramIcon } from '../../icons/TelegramIcon';

export const FaqAccordion: FC = () => (
	<Accordion defaultIndex={[0]}>

	  <AccordionItem>
		<h2>
		  <AccordionButton>
			<Box flex='1' textAlign='left' fontSize='2xl'>
				What is REKT?
			</Box>
			<AccordionIcon />
		  </AccordionButton>
		</h2>
		<AccordionPanel pb={4}>
			REKTcoin (REKT) is a hyper-deflationary ERC20 experimental shitcoin
			on the MATIC blockchain. Although buying REKT does not incur any
			fees, every time you sell REKT a completely random amount gets
			burned. This is accomplished thanks to the use of <Link 
				color='#8257E5'
				href='https://docs.chain.link/docs/chainlink-vrf/v1/'
			>
				Chainlink Oracles 
			</Link> random number generators.
		</AccordionPanel>
	  </AccordionItem>

	  <AccordionItem>
		<h2>
		  <AccordionButton>
			<Box flex='1' textAlign='left' fontSize='2xl'>
				How secure is REKT?
			</Box>
			<AccordionIcon />
		  </AccordionButton>
		</h2>
		<AccordionPanel pb={4}>
			Since REKT is an experimental token, we are not sure how much
			traffic the <Link color='#8247E5'href={'https://app.rektswap.net'}>
				RektSwap
			</Link> can handle. That’s why you should NOT gamble
			more than you're willing to lose. In case of need due to our
			contracts breaking up, we will create a V2 and fork the token. 
		</AccordionPanel>
	  </AccordionItem>

	  <AccordionItem>
		<h2>
		  <AccordionButton>
			<Box flex='1' textAlign='left' fontSize='2xl'>
				How does it works?
			</Box>
			<AccordionIcon />
		  </AccordionButton>
		</h2>
		<AccordionPanel pb={4}>
			Even though current <Link 
				color='#8247E5'
				href={'https://docs.uniswap.org/protocol/V2/reference/smart-contracts/router-02'}
			>
				Uniswap 
			</Link> like DEXes must fulfill token sales
			immediately, Chainlink Oracle takes on average a minute to respond
			with a valid random number. Due to these circumstances, the only
			way to sell REKT is using our own Layer 2 contract
			to the UniswapV2Router02: The <Link color='#8247E5'href={batcherEtherscan}>
				RektTransactionBatcher
			</Link>. Once you use
			this contract to sell your REKT, it will store your REKT balance,
			request a new random number to a Chainlink Oracle and, once it’s
			received, it will fulfill all the sales requested during that time. 
			If you have any questions about how the code works, feel free to ask the devs
			in the <Link color='#8247E5' href='https://t.me/rektswap_community'>
				Telegram group <TelegramIcon/> 
			</Link>.
		</AccordionPanel>
	  </AccordionItem>

	  <AccordionItem>
		<h2>
		  <AccordionButton>
			<Box flex='1' textAlign='left' fontSize='2xl'>
				What about the tokenomics?
			</Box>
			<AccordionIcon />
		  </AccordionButton>
		</h2>
		<AccordionPanel pb={4}>
			The initial supply is 1B REKT. The front-end dev owns 3.5% of the
			initial supply and the back-end dev has another 3.5%. The initial
			liquidity is 3700 MATIC for 908.874.000 REKT, <Link href={liqLockedTx} color='#8247E5'>
				locked
			</Link> until the 9th
			of September. If the project performs well, we will extend the lock
			duration. The remaining tokens (aproximately 21M REKT) will be used
			for an airdrop in the <Link 
				color='#8247E5' href='https://t.me/rektswap_community'
			>
				Telegram group <TelegramIcon />
			</Link>.
			Using REKTcoin does not incur any dev fees, thus if any money is
			needed for marketing purposes it will be provided by the dev team.
		</AccordionPanel>
	  </AccordionItem>

	  <AccordionItem>
		<h2>
		  <AccordionButton>
			<Box flex='1' textAlign='left' fontSize='2xl'>
				What about the future?
			</Box>
			<AccordionIcon />
		  </AccordionButton>
		</h2>
		<AccordionPanel pb={4}>
			REKT is an experimental shitcoin, a Proof of Concept for a bigger ecosystem of
			experimental shitcoins with original mechanics. We have plenty of
			ideas for other projects: REKT NFTs that give reflections (shares)
			of the burned REKT, other shitcoins with inherent gambling
			mechanics like REKT (we don’t want to spoil anything so we won’t
			give any specifics), etc. Whether we accomplish all of this will
			depend on the success of this POC and the decisions of the
			community. 
		</AccordionPanel>
	  </AccordionItem>

	</Accordion>

);
