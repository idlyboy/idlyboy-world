import {
  H2, H3,
  Paragraph, Bold, Italic,
  Callout,
  BulletList, NumberedList, ListItem,
  Divider,
} from '../../components/NotionBlocks';

export function HyperliquidJourneyContent() {
  return (
    <>
      <H3>Intro</H3>

      <Paragraph>
        Perps trading accounts for about ~50% of all revenue in crypto, but the perp DEX experience 
        was quite broken, compared to perp CEXs like Binance (signing every txn on GMX sucked ass). 
        Jeff set out to build a CEX like perps trading experience but with all the decentralised goodness.
      </Paragraph>

      <Paragraph>
        I remember in Dec 2023 during ETHIndia when people couldn't stop checking their phones for the 
        JITO airdrop — it wasn't heavily farmed and some crypto VC friends made easy five figures. 
        The airdrop farming frenzy really set the tone for HL's points program.
      </Paragraph>

      <Callout type="info" emoji="⚖️">
        Importantly, the points program was transparent and fair — qualities which HL will display 
        consistently, dramatically improving trust and belief (rare in web3).
      </Callout>

      <H3>Attention & Liquidity</H3>

      <Paragraph>
        Liquidity poured in due to the previously stated reasons, but it stayed and grew because:
      </Paragraph>

      <NumberedList>
        <ListItem>New primitives like spot markets were on HL</ListItem>
        <ListItem>
          World class order matching + CEX like liquidity allowed high freq and size trades 
          without slippage/execution issues
        </ListItem>
        <ListItem>
          Top tokens demanded by the community were listed (Binance missed many memecoins and 
          AI tokens, liquidity deepened on HL)
        </ListItem>
        <ListItem>
          Pre-launch token perp markets sealed the deal. HL was the primary place for airdrop 
          price discovery and speculation on valuation.
        </ListItem>
      </NumberedList>

      <Paragraph>
        The airdrop was a big success of course. Fair launch and distribution, community conviction 
        and constant shipping drove positive price action.
      </Paragraph>

      <Callout type="tip" emoji="💎">
        It's so rare that web3 projects have such alignment across founder, community, builders 
        and value accrual into token.
      </Callout>

      <H3>The future of (on-chain) finance</H3>

      <Paragraph>
        After building depth (L1 + best perp DEX), HL used it as a foundation to build breadth 
        (the future of on-chain finance):
      </Paragraph>

      <BulletList>
        <ListItem>
          First, they built out spot markets, powered by HIP-1 (native token standard + on-chain 
          spot order books) and HIP-2 (Instant liquidity with 0.3% spread every 3 seconds).
        </ListItem>
        <ListItem>
          Soon, to support the scale of the breadth vision, HL used its own consensus algorithm 
          HyperBFT which pushed TPS from 20k to ~200k.
        </ListItem>
      </BulletList>

      <H3>HyperEVM</H3>

      <Paragraph>
        Then came the inflection point - HyperEVM - to drive the abstraction of the deep liquidity 
        on HyperCore as a building block for user applications.
      </Paragraph>

      <Paragraph>
        Builders could use familiar EVM tooling while having their contracts plug directly into 
        Hyperliquid's CEX-like liquidity.
      </Paragraph>

      <Paragraph>
        Now, HL was positioned to build the AWS of liquidity infrastructure. It had the best of 
        both worlds - performance and alignment. As Jeff put it:
      </Paragraph>

      <NumberedList>
        <ListItem>
          <Bold>Performance:</Bold> CEXs execute on this, but general purpose chains do not. 
          No other chain or DeFi application offers the asset selection and liquidity depth 
          that serious applications need.
        </ListItem>
        <ListItem>
          <Bold>Builder-first:</Bold> General purpose chains support this, but CEXs do not. 
          Meaningful applications cannot be built when CEX broker programs change on a whim. 
          Serious builders shouldn't have to trust a rent-seeking middleman.
        </ListItem>
      </NumberedList>

      <H3>Builder Codes</H3>

      <Paragraph>
        Order flow is crucial to drive in further liquidity and power the flywheel of HL. This is 
        driven by distribution and frontends own distribution. HL launched Builder Codes in Oct 2024 
        to allow any frontend to plug into HL's HyperCore markets.
      </Paragraph>

      <Paragraph>
        Wallets, social trading platforms, regional frontends, etc. could setup perp markets on their 
        platform for their users to access. Frontends earn proportionate to the volume, traders get 
        best liquidity while using their trusted frontend, and HL gets more order flow. Everyone wins 
        — while being permissionless and on-chain.
      </Paragraph>

      <H3>HIP-3</H3>

      <Paragraph>
        While Builder Codes positions HL to access distribution which trades on existing markets, 
        HIP-3 allows for permissionless perp market creation for any asset (FX, commodities, 
        structured products, prediction markets, etc.).
      </Paragraph>

      <Paragraph>
        Fully permissionless markets will drive super cool use-cases like synthetic stocks/RWAs or 
        pre-IPO perps on private company valuations (Ventuals is doing this and are bringing price 
        discovery, transparency, and tradability to a historically opaque and illiquid part of the market).
      </Paragraph>

      <Paragraph>
        Every new market attracts traders, deepens liquidity and in turn increases protocol activity 
        and revenue. Simply put, it dramatically increases HL's TAM.
      </Paragraph>

      <H3>Closing Thoughts</H3>

      <Paragraph>
        I think the HL ecosystem and community is one of the best in web3 simply because of the trust, 
        transparency and honesty. New primitives like perpetual futures literally means that if a group 
        of people want to speculate on a number and connect it to the real world with a credible oracle, 
        you can create a market. And Hyperliquid is the best tech and financial tool to do that with.
      </Paragraph>

      <Paragraph>
        <Bold>HIP3RLIQUID.</Bold>
      </Paragraph>
    </>
  );
}

