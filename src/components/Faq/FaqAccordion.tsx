import React from 'react';
import { FC } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, Link
} from '@chakra-ui/react'

import { batcherEtherscan } from '../AboutRekt/AboutRekt';
import { liqLockedTx } from '../AboutRekt/AboutRekt';
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
			REKTcoin (REKT) is an hyperdeflationary ERC20 experimental shitcoin on the
			MATIC blockchain. You can buy REKT without any fees, but
			every time you sell any REKT an completely random amount
			gets burned. It accomplishes it using random numbers generated
			by <Link color='#8247E5' href='https://docs.chain.link/docs/chainlink-vrf/v1/'>
				Chainlink Oracles
			</Link>.
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
			REKT is an experimental token, so we are not sure how much
			traffic the <Link color='#8247E5'href={'https://rektswap.net'}>
				RektSwap
			</Link> can handle. Thats why you should NOT gamble more than
			you're willing to lose. Anyways, if the contracts break up we
			will just make an V2 and fork the token.
		</AccordionPanel>
	  </AccordionItem>

	  <AccordionItem>
		<h2>
		  <AccordionButton>
			<Box flex='1' textAlign='left' fontSize='2xl'>
				How does it work?
			</Box>
			<AccordionIcon />
		  </AccordionButton>
		</h2>
		<AccordionPanel pb={4}>
			Current <Link color='#8247E5'href={'https://docs.uniswap.org/protocol/V2/reference/smart-contracts/router-02'}>
				Uniswap 
			</Link> like DEXes need to fulfill your token
			sales immediately, but the Chainlink Oracle usually takes 
			like an minute to answer with an valid random number.
			Thats why the only way to sell REKT is using our own Layer 2
			contract to the UniswapV2Router02: The <Link color='#8247E5'href={batcherEtherscan}>
				RektTransactionBatcher
			</Link>. Once you use this contract to sell your REKT, it will store your REKT balance,
			request an new random number to an Chainlink Oracle, and once its received it will fulfill
			all the sales requested during the answer time. If you have any questions about how the
			code works feel free to ask the devs in the <Link color='#8247E5' href='https://t.me/rektswap_community'>
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
			The initial supply is 1B REKT. The front-end dev has an
			3.5% of the initial supply and the back-end dev has another
			3.5%. The initial (and final) liquidity is 3700 MATIC for
			908.874.000 REKT, <Link href={liqLockedTx} color='#8247E5'>
				locked
			</Link> until the 9th of September. If the project goes well we will
			extend the lock duration. Finally, the remaining tokens
			(aproximately 21M REKT) will be used for an airdrop in the <Link 
				color='#8247E5' href='https://t.me/rektswap_community'
			>
				Telegram group <TelegramIcon />
			</Link>. There
			are not any dev fees, if we need money for marketing
			purposes we will use our balances.
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
			REKT is an experimental shitcoin, an Proof of Concept
			for an bigger ecosystem of experimental shitcoins with original
			mechanics. We have a lot of ideas about different
			things we could do: REKT NFTs that will give reflections
			on the burned REKT, others shitcoins with inherent gambling
			mechanics like REKT (we dont want to spoil anything), etc. 

			If we accomplish or not all of this will depend on the success 
			of the POC and the decissions of the community.
		</AccordionPanel>
	  </AccordionItem>

	</Accordion>

);
