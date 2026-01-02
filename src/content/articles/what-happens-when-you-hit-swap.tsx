import {
  H2, H3,
  Paragraph, Bold, Italic, Code, Link,
  Callout,
  Toggle,
  BulletList, NumberedList, ListItem,
  CodeBlock,
  Divider,
} from '../../components/NotionBlocks';

export function WhatHappensWhenYouHitSwapContent() {
  return (
    <>
      <H2>Introduction</H2>

      <Paragraph>
        What happens when you hit 'Swap' on a DEX/Aggregator like Uniswap, Matcha, or 1inch? 
        The cogs that power swaps under-the-hood is called Market Structure.
      </Paragraph>

      <Paragraph>
        DeFi Market Structure is a combination of answers to the following:
      </Paragraph>

      <BulletList>
        <ListItem>Where do orders live? (on-chain, off-chain, or as intents)</ListItem>
        <ListItem>Who are you trading against? (LPs, market makers, other users, solvers, fillers)</ListItem>
        <ListItem>How are prices set? (formulas, order books, auctions, RFQs)</ListItem>
        <ListItem>How are trades matched and settled on-chain?</ListItem>
      </BulletList>

      <Paragraph>
        Traditional finance has had a fairly standard playbook - orderbooks, market makers and 
        centralised matching engines. DeFi on the other hand, has a zoo of designs which have 
        emerged as the space has evolved.
      </Paragraph>

      <Paragraph>
        In this article (more like notes from my study) we'll walk through this zoo in a structured way.
      </Paragraph>

      <NumberedList>
        <ListItem>AMMs - Constant Product, StableSwap, Concentrated/Programmable Liquidity</ListItem>
        <ListItem>Orderbook DEXs - Hyperliquid & CLOB</ListItem>
        <ListItem>Off-chain orders with on-chain settlement</ListItem>
        <ListItem>RFQ systems for large trades</ListItem>
        <ListItem>Intents, solvers/fillers, dutch auctions (CoW Protocol, UniswapX, 1inch Fusion)</ListItem>
        <ListItem>Aggregators as the abstraction layer</ListItem>
      </NumberedList>

      <H3>Definitions</H3>

      <Paragraph>
        Before we dive in, we'll graze on some basic definitions. <Italic>Skip this section if you're not a beginner.</Italic>
      </Paragraph>

      <Paragraph>
        Let's take the simplest market view possible. Imagine ETH/USDC trading on a CEX.
      </Paragraph>

      <Toggle title="Bid, Ask & Spread">
        <BulletList>
          <ListItem>There is a best <Italic>bid</Italic> (the highest price someone is willing to buy ETH, say 3,000 USDC)</ListItem>
          <ListItem>There is a best <Italic>ask</Italic> (the lowest price someone is willing to sell ETH, say 3,001 USDC)</ListItem>
          <ListItem>The <Italic>spread</Italic> is 1 USDC (the gap between the best bid and the best ask)</ListItem>
        </BulletList>
      </Toggle>

      <Toggle title="Order Type, Makers & Takers">
        <BulletList>
          <ListItem>
            If you place a <Italic>limit order to buy</Italic> 1 ETH at 2990 USDC and wait, you're providing liquidity. 
            Hence, you're a <Italic>maker</Italic> - you put a quote in the book and wait for someone to trade with you
          </ListItem>
          <ListItem>
            If you place a <Italic>market order to buy</Italic> 1 ETH right now, you accept the existing best ask of 3001 USDC. 
            Hence, you're a <Italic>taker</Italic> - you take liquidity out of the book.
          </ListItem>
        </BulletList>
      </Toggle>

      <Callout type="info" emoji="📈">
        Every DeFi market structure design is a different way of arranging bids, asks, and who is a maker or taker.
      </Callout>

      <Divider />

      <H2>1. AMMs - Liquidity by Formula (Uniswap v2, Curve, v3/v4)</H2>

      <H3>1.1 Why do AMMs exist?</H3>

      <Paragraph>
        Orderbooks work great when there are:
      </Paragraph>

      <BulletList>
        <ListItem>Many traders constantly posting quotes</ListItem>
        <ListItem>Market makers willing to continuously update their prices</ListItem>
      </BulletList>

      <Paragraph>
        The early Ethereum ecosystem didn't have this cause gas was expensive and block times were slow.
      </Paragraph>

      <Paragraph>
        Automated Market Makers (AMMs) solved this. Instead of an orderbook, you keep pools of tokens 
        and a pricing formula. Anyone who trades against the pool implicitly trades against all 
        Liquidity Providers (LPs) in it.
      </Paragraph>

      <Divider />

      <H3>1.2 Uniswap v2 - Constant Product Pools</H3>

      <Paragraph>
        Uniswap v2 is the most widely recognised AMM - each pool holds two tokens, and the product 
        of their reserves is kept constant: <Code>x * y = k</Code>
      </Paragraph>

      <BulletList>
        <ListItem><Code>x</Code> is the reserve of token X</ListItem>
        <ListItem><Code>y</Code> is the reserve of token Y</ListItem>
        <ListItem><Code>k</Code> is a constant (ignoring fees)</ListItem>
      </BulletList>

      <Paragraph>
        If you add token X to the pool (buying Y), the pool must give you Y such that the 
        product <Code>x * y</Code> remains the same. This creates the price curve.
      </Paragraph>

      <CodeBlock>
{`LPs deposit tokens           Traders swap
Token X      Token Y         X -> Y or Y -> X
   \\           /              ^
    v         v              /
   [   AMM POOL (x * y = k)  ]`}
      </CodeBlock>

      <Paragraph>
        <Bold>Example:</Bold> Suppose a USDC/ETH pool has 1,000 ETH and 3,00,000 USDC. 
        The spot price is ~3,000 USDC/ETH. You swap 3,000 USDC for ETH:
      </Paragraph>

      <NumberedList>
        <ListItem>
          <Bold>Before</Bold> — x = 1,000 ETH, y = 3,000,000 USDC, k = 3,000,000,000
        </ListItem>
        <ListItem>
          After adding 3,000 USDC, new y = 3,003,000. New x must satisfy{' '}
          <Code>x_new * 3,003,000 = 3,000,000,000</Code>, so <Code>x_new = ~999 ETH</Code>. 
          You get ~1 ETH (minus a fee)
        </ListItem>
        <ListItem>
          Your trade slightly moves the price up, because the pool now holds less ETH and more USDC.
        </ListItem>
      </NumberedList>

      <Paragraph>
        Here, you are the taker and the pool (LPs) collectively act as the maker.
      </Paragraph>

      <Toggle title="Pros">
        <BulletList>
          <ListItem>Simple and fully on-chain</ListItem>
          <ListItem>Permissionless (any token pair can be listed)</ListItem>
          <ListItem>Composable (other protocols can call 'swap' function without worrying about orderbooks)</ListItem>
        </BulletList>
      </Toggle>

      <Toggle title="Cons">
        <BulletList>
          <ListItem>Capital inefficient as liquidity is spread over entire price range</ListItem>
          <ListItem>Impermanent loss for LPs</ListItem>
          <ListItem>Arbitrageurs earn money correcting price when pool gets out of line with rest of market</ListItem>
        </BulletList>
      </Toggle>

      <Divider />

      <H3>1.3 Curve & StableSwap for Pegged Assets</H3>

      <Paragraph>
        If both assets in the pool are designed to trade near 1:1, (eg: DAI, USDC, USDT), 
        the constant product curve is too 'steep' (more slippage than needed).
      </Paragraph>

      <Paragraph>
        Curve's StableSwap formula combined properties of constant-sum and constant-product to 
        create a curve that is very flat near 1:1, controlled by an amplification parameter A. So:
      </Paragraph>

      <BulletList>
        <ListItem>
          When the pool is balanced, it behaves almost like <Code>x + y = constant</Code>. 
          Tiny trades cause almost zero price impact.
        </ListItem>
        <ListItem>
          As the pool becomes imbalanced, it behaves more like <Code>x * y = k</Code> to avoid being drained.
        </ListItem>
      </BulletList>

      <CodeBlock>
{`Price
 ^
 |   Constant-product (Uniswap v2)
 |        /
 |       /
 |      /
 |     /
 |    /
 |___/____________________> imbalance
     \\
      \\ StableSwap (Curve): almost flat near 1:1`}
      </CodeBlock>

      <Paragraph>
        <Bold>Example:</Bold> For a 100k DAI to USDC swap in a typical pool that's roughly balanced:
      </Paragraph>

      <BulletList>
        <ListItem>On a v2-style pool, a 100k swap might cause noticeable slippage.</ListItem>
        <ListItem>
          On Curve with a high amplification factor A, you can often trade 100k with minimal 
          slippage because around 1:1 the curve is nearly flat.
        </ListItem>
      </BulletList>

      <Paragraph>
        That's why most DEX aggregators route large stable-to-stable swaps through Curve.
      </Paragraph>

      <Divider />

      <H3>1.4 Uniswap v3 - Concentrated Liquidity</H3>

      <Paragraph>
        Uniswap v3's major idea was <Italic>concentrated liquidity</Italic>. Instead of LPs providing 
        liquidity from 0 → ∞, they choose a price range where their capital is active.
      </Paragraph>

      <Paragraph>
        The price range is divided into <Italic>ticks</Italic> (discrete price steps). An LP can 
        provide liquidity to ETH/USDC only between 2,500 and 3,500.
      </Paragraph>

      <CodeBlock>
{`Liquidity vs Price

v2 (uniform):
  ███████████████████████
 0                       ∞

v3 (example position):
            ███████
          2500 - 3500`}
      </CodeBlock>

      <Paragraph>
        <Bold>Example:</Bold> LPing in v3 - you deposit liquidity in ETH/USDC between 2,500 and 3,500 USDC/ETH.
      </Paragraph>

      <BulletList>
        <ListItem>If ETH trades in that band, you earn fees.</ListItem>
        <ListItem>
          If ETH goes to 4,000, your position gets converted to USDC and is out of range. 
          You earn no more fees until you reposition.
        </ListItem>
        <ListItem>If ETH dumps below 2,500, you're now fully in ETH.</ListItem>
      </BulletList>

      <Paragraph>
        In a sense you're becoming a market maker.
      </Paragraph>

      <BulletList>
        <ListItem>You choose the range for positioning liquidity.</ListItem>
        <ListItem>You manage <Bold>inventory risk</Bold> (how much ETH vs USDC you hold).</ListItem>
        <ListItem>You are more exposed to <Bold>LVR</Bold> if prices move quickly against your range.</ListItem>
      </BulletList>

      <Paragraph>
        Uniswap v3 effectively maps AMM liquidity closer to an on-chain limit order book, 
        but still defined by a smooth function rather than discrete orders.
      </Paragraph>

      <Callout type="info" emoji="🀄">
        <Bold>LVR (Loss vs Rebalancing)</Bold> is a form of adverse selection cost which market makers, 
        or in this case, LPs incur. The spot price of assets on AMM DEXs generally lag behind that 
        on the external market (eg: CEXs).
        <br /><br />
        This opportunity allows for arbitrageurs to make a trade on the AMM to correct the spot price 
        so it aligns with the external market. The profit made by the arbitrageur is exactly the money lost by LPs.
      </Callout>

      <Divider />

      <H3>1.5 Uniswap v4 - Programmable Liquidity</H3>

      <Paragraph>
        v4 keeps the concentrated idea with 2 additions - a <Italic>singleton contract</Italic> and <Italic>hooks</Italic>.
      </Paragraph>

      <BulletList>
        <ListItem>Single contract holds all pools, reducing gas and complexity</ListItem>
        <ListItem>
          Hooks are external contracts containing logic which run before/after certain actions 
          (swap, add/remove liquidity). This allows for things like:
          <BulletList>
            <ListItem>On-chain limit orders as special liquidity ranges</ListItem>
            <ListItem>Dynamic fees based on volatility</ListItem>
            <ListItem>Time Weighted AMMs</ListItem>
            <ListItem>Vaults which automatically rebalance on LPs' behalf</ListItem>
          </BulletList>
        </ListItem>
      </BulletList>

      <Paragraph>
        AMMs are evolving from a single CP formula <Code>x * y = k</Code> into a programmable 
        market-making platform, where the curve and behaviour are tailored asset-by-asset and block-by-block.
      </Paragraph>

      <Divider />

      <H2>2. Orderbook DEXs - Hyperliquid and CLOB</H2>

      <Paragraph>
        AMMs are prevalent in spot trading, but for perps and leverage, traders want more control 
        (discrete orderbook, advanced order types, etc).
      </Paragraph>

      <H3>2.1 Central Limit Order Book (CLOB)</H3>

      <Paragraph>
        A CLOB is what you see on a CEX like Binance. <Italic>Makers</Italic> place limit orders, 
        <Italic>Takers</Italic> place market orders and a <Italic>Matching Engine</Italic> executes 
        them against best prices to constantly clear the book.
      </Paragraph>

      <CodeBlock>
{`            [ Orderbook ]
   Price    Size    Side
   3001     1.2     Sell  <-- best ask
   3000     0.5     Buy   <-- best bid
   2999     2.0     Buy
   ...`}
      </CodeBlock>

      <H3>2.2 Hyperliquid - CLOB Perps DEX</H3>

      <Paragraph>
        Hyperliquid is a fully on-chain orderbook derivatives exchange. It's not just a dApp, 
        it's an L1 chain with a Perps DEX built into the chain itself. The chain has two execution 
        environments, HyperCore and HyperEVM. The latter is a way for EVM dApps to connect to 
        Hyperliquid's robust liquidity and DeFi infra, so we won't look much into it.
      </Paragraph>

      <Paragraph>
        HyperCore is the trading engine with a fully on-chain CLOB for perps and spot.
      </Paragraph>

      <Paragraph>
        Hyperliquid's CLOB has a price-time priority where orders are first sorted by price and 
        among orders with the same price, the older one gets filled first.
      </Paragraph>

      <BulletList>
        <ListItem>Every order, trade and cancellation is a transaction in the blockchain state.</ListItem>
        <ListItem>
          There is no off-chain matching engine - every validator replays the same matching logic 
          and reaches the same result. This makes the orderbook fully on-chain.
        </ListItem>
      </BulletList>

      <Paragraph>
        <Bold>How is this different from AMMs?</Bold>
      </Paragraph>

      <BulletList>
        <ListItem>Price discovery is explicit (precise bids and asks vs. implicit curve in AMMs)</ListItem>
        <ListItem>Liquidity comes from MMs posting orders, not from LPs in a pool</ListItem>
        <ListItem>Higher control for traders (order types like limit, post-only, TWAP, etc.)</ListItem>
      </BulletList>

      <Callout type="info" emoji="⚖️">
        The tradeoff is that you need active MMs and a high throughput environment. This is why 
        Hyperliquid is built on its own L1, consensus algorithm and specialised orderbook, 
        instead of Ethereum Mainnet.
      </Callout>

      <Divider />

      <H2>3. Off-Chain Orders, On-Chain Settlement (0x v4)</H2>

      <Paragraph>
        Many protocols want limit-order type behaviour without having every order and update on-chain. 
        The middle ground is:
      </Paragraph>

      <BulletList>
        <ListItem>Create orders off-chain as signed messages (EIP-712)</ListItem>
        <ListItem>Store and distribute them via APIs or P2P networks</ListItem>
        <ListItem>Bring an order on-chain when it's actually filled or cancelled</ListItem>
      </BulletList>

      <H3>3.1 0x Protocol v4</H3>

      <Paragraph>
        Here, 0x defines limit and RFQ orders as EIP-712 signed messages which describe the maker's trade. 
        An order flow looks like this:
      </Paragraph>

      <BulletList>
        <ListItem>Maker creates order</ListItem>
        <ListItem>Order is signed off-chain using EIP-712</ListItem>
        <ListItem>Order is broadcast via the 0x Orderbook API or p2p relayer</ListItem>
        <ListItem>When a taker wants it, they call the 0x Exchange Proxy with the order</ListItem>
        <ListItem>The proxy verifies signature, transfers tokens and charges fees</ListItem>
      </BulletList>

      <Divider />

      <H2>4. Request for Quote (RFQ) & Professional MMs On-Chain</H2>

      <Paragraph>
        RFQ is how institutional traders and OTC desks work - instead of a passive quote in the orderbook, 
        you ask for a quote for a specific size and decide whether to accept it. In DeFi, RFQ systems 
        plug into aggregators to improve pricing, usually for large trades.
      </Paragraph>

      <Paragraph>
        0x Swap's API uses an RFQ system - it queries a whitelisted set of MMs and compares their 
        quotes against on-chain DEX prices.
      </Paragraph>

      <Paragraph>
        <Bold>RFQ vs AMM for a large swap</Bold>
      </Paragraph>

      <Paragraph>
        Let's say you want to swap 500k USDC to ETH:
      </Paragraph>

      <BulletList>
        <ListItem>
          AMM route (Uniswap/Curve) might give the price of 3,000 USDC/ETH, but the slippage will be high, 
          because the trade is large, given the pool size
        </ListItem>
        <ListItem>
          RFQ MM might quote 3,002 USDC/ETH for the entire size with zero slippage
        </ListItem>
      </BulletList>

      <Paragraph>
        The aggregator will route the order through the MM, if after gas and fee, the RFQ path 
        leaves you with more ETH. RFQ systems bring the pro OTC desk experience into DeFi.
      </Paragraph>

      <Divider />

      <H2>5. Intents, Solvers, Fillers & Dutch Auctions</H2>

      <Paragraph>
        So far, we've discussed AMMs, Orderbooks and RFQ. They all share one thing, i.e., you or 
        the aggregator specify the exact path/venue, sometimes barring some abstractions.
      </Paragraph>

      <Paragraph>
        The next evolution seems to be for user to specify the goal, not the path.
      </Paragraph>

      <H3>5.1 Intents</H3>

      <Paragraph>
        An intent is a structured message that says the exact intent of a trade. 'I want at least 3 ETH 
        and I'm willing to spend upto 9,000 USDC'. You don't say 'use Uniswap v3, then Curve, then xyz bridge'. 
        You just define the outcome parameters and leave the routing to external actors called{' '}
        <Italic>solvers</Italic> or <Italic>fillers</Italic>.
      </Paragraph>

      <Paragraph>
        A solver or filler is an agent that observes intents → searches across DEXs, RFQ pools, bridges 
        & MEV opportunities → builds a (batch of) transaction(s) to fulfil the intents → pays gas, 
        and → earns some profit from price improvements/MEV.
      </Paragraph>

      <Paragraph>
        This gives users cleaner UX and better MEV handling (solvers compete, batch auctions reduce sandwiching)
      </Paragraph>

      <Divider />

      <H3>5.2 CoW Protocol - Batch Auctions</H3>

      <Paragraph>
        CoW Protocol is built entirely around intents and batch auctions.
      </Paragraph>

      <BulletList>
        <ListItem>Once intents are submitted, orders in a time window are grouped into a batch.</ListItem>
        <ListItem>
          Solvers then compete by proposing settlement plans which 1. matches users directly 
          (like the simplified 'Settle Up' feature on Splitwise) and 2. use AMMs and other DEXs if needed.
        </ListItem>
        <ListItem>
          Protocol selects the best solution based on an objective and then a single transaction 
          is executed on-chain to settle a whole batch.
        </ListItem>
      </BulletList>

      <Divider />

      <H3>5.3 UniswapX - Dutch Auctions</H3>

      <Paragraph>
        UniswapX is Uniswap's intent and <Italic>dutch-auction</Italic> based protocol. You sign an 
        off-chain order with the intent, which goes into an off-chain auction, where a set of{' '}
        <Italic>fillers</Italic> compete to execute your order.
      </Paragraph>

      <Paragraph>
        Fillers could be a bot, MM, routing service which picks up a UniswapX order, figures out 
        how to fulfil it, pays gas to submit the transaction and keeps any leftover profit.
      </Paragraph>

      <Paragraph>
        A dutch-auction 'decays over time', meaning that it starts with a price that's favourable 
        to the filler, but becomes more favourable to you as time passes. So, fillers are incentivised 
        to fill as early as possible.
      </Paragraph>

      <Divider />

      <H3>5.4 1inch Fusion - Whitelisted Resolvers</H3>

      <Paragraph>
        1inch Fusion sits on top of the 1inch Limit Order Protocol and introduces <Italic>resolvers</Italic>. 
        Resolvers are a special type of fillers who are whitelisted by 1inch. The process is largely 
        the same - an off-chain order is signed by user, resolvers compete to fill the order, and they 
        pay gas and fulfil the order while taking some profit.
      </Paragraph>

      <Callout type="tip" emoji="💡">
        Conceptually, all three try to express user intents where routing and MEV considerations 
        are taken care of by professional actors (fillers/solvers).
        <br /><br />
        <Bold>CoW</Bold> - multiple solvers propose batch settlements and the protocol picks the best
        <br />
        <Bold>UniswapX</Bold> - public dutch auction with fillers competing
        <br />
        <Bold>1inch Fusion</Bold> - whitelisted resolvers compete to take user orders often via similar auction parameters.
      </Callout>

      <Divider />

      <H2>6. Aggregators - The Abstraction Layer</H2>

      <Paragraph>
        Everything above describes venues and market mechanisms. On top of them, sits an abstraction 
        layer - DEX Aggregators. They:
      </Paragraph>

      <BulletList>
        <ListItem>Look at multiple venues</ListItem>
        <ListItem>Simulate possible routes for a trade</ListItem>
        <ListItem>Choose the best route(s)</ListItem>
        <ListItem>Provide a single transaction or API to execute it.</ListItem>
      </BulletList>

      <CodeBlock>
{`User / Wallet / dApp
        |
        v
    [ Aggregator ]
        |
        +---------------------------+
        |                           |
    [ AMMs ]    [ RFQ MMs ]   [ Limit Orders ]   [ Intents ]
   (Uniswap,     (0x RFQ,      (0x, 1inch LO)    (CoW, X, Fusion)
    Curve…)       MMs…)            ...               ...
        |                           |
        +------------+--------------+
                     |
             [ Router Contract ]
                     |
                   Blockchain`}
      </CodeBlock>

      <Paragraph>
        An aggregator could be a backend API (like 0x Swap API), a frontend (like Matcha or 1inch), 
        or an in-wallet swap using an aggregator API.
      </Paragraph>

      <Paragraph>
        <Bold>0x Swap API + Matcha as an example</Bold>
      </Paragraph>

      <Paragraph>
        The 0x Swap API aggregates 100+ liquidity sources and RFQ MMs. Matcha is a consumer frontend 
        built on top. When you get the 'best price' on Matcha:
      </Paragraph>

      <BulletList>
        <ListItem>Swap API has already compared Uniswap, Curve and other AMMs;</ListItem>
        <ListItem>0x RFQ MMs;</ListItem>
        <ListItem>Possibly off-chain limit orders</ListItem>
      </BulletList>

      <Paragraph>
        It returns a route which might split a trade across venues and the 0x Exchange Proxy 
        executes the splits in one transaction.
      </Paragraph>

      <Divider />

      <H2>Conclusion & Trade-Offs</H2>

      <Paragraph>
        Reasoning about the market structure designs involves understanding some key variables. 
        Once we understand some basic axes, we're able to evaluate and understand choices made by DEXs/aggregators.
      </Paragraph>

      <H3>Blue Chip vs Long-tail Assets</H3>

      <Paragraph>
        Usually, long-tail tokens end up on simple AMMs like Uniswap v2. There isn't enough professional 
        MM interest to support orderbooks or RFQ. Major assets on the other hand get:
      </Paragraph>

      <BulletList>
        <ListItem>Deep concentrated liquidity (like on Uniswap v3/v4)</ListItem>
        <ListItem>Orderbooks</ListItem>
        <ListItem>RFQ</ListItem>
        <ListItem>And attention from solvers/fillers in intent based mechanisms.</ListItem>
      </BulletList>

      <H3>Retail vs Power Users</H3>

      <Paragraph>
        Retail users care about good UX, reliable execution and not getting MEV-sandwiched during swaps. 
        For them, aggregators and intent-based systems are ideal.
      </Paragraph>

      <Paragraph>
        Professional traders care about control over order types, latency and spreads, hedging and 
        cross-venue strategies. Orderbooks, RFQ connects and specialised AMMs for complex LP strategies 
        work best for them.
      </Paragraph>

      <H3>MEV Resistance vs Simplicity</H3>

      <Paragraph>
        Constant-product AMMs are simple, but exposed to MEV because every swap is visible in the mempool. 
        Batch auctions and intents are complex, but can internalise some MEV to benefit users, reduce 
        sandwich attacks and use off-chain auctions.
      </Paragraph>

      <Paragraph>
        It's a direct tradeoff - simpler systems are easier to fork and integrate but leave more value 
        to arbitrageurs and MEV chasers. Complex systems can protect users, but centralise more logic 
        in solvers or routing services.
      </Paragraph>

      <Divider />

      <Paragraph>
        <Italic>
          This article is a collection of personal notes while I was studying market structure. 
          I hope this encourages you to dive deeper into the nuances of AMM designs and DeFi architecture!
        </Italic>
      </Paragraph>
    </>
  );
}

