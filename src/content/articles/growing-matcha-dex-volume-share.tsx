import {
  H2, H3,
  Paragraph, Bold, Italic, Code, Link,
  Callout,
  BulletList, NumberedList, ListItem,
  Divider,
} from '../../components/NotionBlocks';

export function GrowingMatchaDexVolumeShareContent() {
  return (
    <>
      <Paragraph>
        Matcha is hiring a PM to grow its DEX volume share. In this case study, I'll share insights 
        based on DEX aggregator data on Dune, discuss how I'd grow Matcha's volume share and suggest 
        UX optimisations to the Matcha Web interface.
      </Paragraph>

      <H2>DEX & Aggregator Numbers - Dune</H2>

      <Paragraph>
        I've spun up a quick Dune dashboard with some DEX aggregator and Matcha related stats to draw some insights.
      </Paragraph>

      <Paragraph>
        <Link href="https://dune.com/_idlyboy/dex-and-dex-aggregator-stats">DEX & DEX Aggregator Stats Dashboard</Link>
      </Paragraph>

      <H3>Takeaways</H3>

      <BulletList>
        <ListItem>
          Matcha's trade size distribution has ~40% trades in the $10-100k band, ~33% in the $100k-1m band, 
          ~23% in the $1-10k band, rarely ~5% in the $1m+ band.
        </ListItem>
        <ListItem>
          0x's trade size distribution has ~32% in the $10-100k band, ~28% in the ~$100k-1m band, 
          ~18% in the $1-10k band, ~12% in the $1m+ band.
        </ListItem>
        <ListItem>
          Although we don't have frontend volume data for 1inch and Cowswap, upon extrapolating total 
          aggregator swap volume, we see that:
          <BulletList>
            <ListItem>
              Cowswap consistently has ~30% transactions with $1m+ volume and ~42% transactions with 
              volume between $100k-1m
            </ListItem>
            <ListItem>
              1inch consistently has ~35% transactions with $1m+ volume and ~30% transactions with 
              volume between $100k-1m
            </ListItem>
          </BulletList>
        </ListItem>
      </BulletList>

      <Callout type="tip" emoji="💎">
        It's important that Matcha (and 0x) capture higher volume trades from other platforms and nudge 
        adjacent users already on Matcha to become 'north star users'. Upon optimising the landing page 
        and trade interface UX, most strategies should be centered around increasing share of $100k+ 
        volume trades on Matcha.
      </Callout>

      <Divider />

      <H2>Approach & Levers to Grow Matcha's Volume Share</H2>

      <H3>Defining NSM</H3>

      <Paragraph>
        The North Star Metric (NSM) to grow is:
      </Paragraph>

      <Paragraph>
        <Bold>Matcha Volume Share</Bold> = (Total swap volume via Matcha Web) / (Total swap volume via 
        DEXs + DEX aggregators in scope)
      </Paragraph>

      <Paragraph>
        We can break this down into:
      </Paragraph>

      <BulletList>
        <ListItem>Weekly/Monthly active traders on Matcha Web</ListItem>
        <ListItem>Avg trades per active trader</ListItem>
        <ListItem>Avg size per trade</ListItem>
        <ListItem>% of that trader swaps routed via Matcha vs others (share of wallet)</ListItem>
        <ListItem>Chain / segment mix (are we present where the volume is?)</ListItem>
      </BulletList>

      <Paragraph>
        Below, we discuss 5 pillars and levers to tap into, to grow Matcha's volume share.
      </Paragraph>

      <H3>Pillars & Levers</H3>

      <Paragraph>
        We understand that 80% volume comes from 20% 'North Star' traders in general. From Dune data, 
        we see that on Matcha (and 0x), we have less high volume txns as a % of total volume, when 
        compared to 1inch or Cowswap. Hence, growing the TAM of 'north star' users and capturing power 
        users from other platforms should be the primary pillars to tap into.
      </Paragraph>

      <BulletList>
        <ListItem>
          <Bold>Retain and grow 'north star' users</Bold>
          <br /><br />
          <Italic>Goal: Increase cohort size and volume of users hitting certain activity threshold.</Italic>
          <NumberedList>
            <ListItem>
              Cohort based lifecycle experiments (with segment wise nudges - chain, average trade size, 
              trade frequency, token category, etc)
            </ListItem>
            <ListItem>
              Understand user behaviour, actions which lead to 'north star behaviour' and nudge adjacent 
              cohorts to perform those actions.
            </ListItem>
            <ListItem>
              Habit forming product surfaces (create and import watchlists & favourites; highly relevant 
              notification opt-ins, eg: price, volume, volatility alerts)
            </ListItem>
            <ListItem>
              Loyalty and rewards design (chain, narrative or campaign specific quests, eg: try cross 
              chain swaps via Matcha and get a reward; volume based tiers and rewards)
            </ListItem>
          </NumberedList>
        </ListItem>
        <ListItem>
          <Bold>Capture share of wallet from existing power users elsewhere</Bold>
          <br /><br />
          <Italic>Goal: Entice high-volume traders currently loyal to Uniswap, Cowswap, 1inch, etc. to 
          route more of their volume via Matcha. Build features which integrate deeply with their workflow.</Italic>
          <NumberedList>
            <ListItem>
              Pro mode (advanced order UX with TWAP, DCA flows and partial fills; granular controls and 
              source preferences; multi-pair layout, hotkeys, etc.)
            </ListItem>
            <ListItem>
              Power-user analytics and workflows (rich trade history with PnL, Fees/gas/slippage breakdowns, 
              exportable CSV, integrations with portfolio trackers/analytics tools)
            </ListItem>
            <ListItem>
              Targeted acquisition of whales/power users (on-chain analysis to identify whales who don't 
              use Matcha, understand why; 1:1 outreach and handheld onboarding)
            </ListItem>
          </NumberedList>
        </ListItem>
        <ListItem>
          <Bold>Convert traffic on app → first successful swap (onboarding)</Bold>
          <br /><br />
          <Italic>Goal: Increase % of visitors who complete at least 1 swap.</Italic>
          <NumberedList>
            <ListItem>
              Clear value prop (strong, impactful headline which appeals to both new user and pro users equally)
            </ListItem>
            <ListItem>
              Reduce friction in core swap flow (detailed in the Interface Optimizations section)
            </ListItem>
          </NumberedList>
        </ListItem>
        <ListItem>
          <Bold>Win volume share by chain and ecosystem</Bold>
          <br /><br />
          <Italic>Goal: Grow volume share on each chain where Matcha is present, starting with low hanging fruits.</Italic>
          <NumberedList>
            <ListItem>
              Co-marketing campaigns and rewards with protocols and communities which explicitly incentivise 
              routing through Matcha (fee rebates, quests, or yield campaigns)
            </ListItem>
            <ListItem>
              Chain specific landing pages, 'discover' section with curated lists and docs around why 
              Matcha is the best. (Base - best routes, incentives, top tokens, etc.)
            </ListItem>
          </NumberedList>
        </ListItem>
        <ListItem>
          <Bold>Acquire qualified, high-intent traffic to Matcha Web</Bold>
          <br /><br />
          <Italic>Goal: More of the right people landing on matcha.xyz instead of competitors.</Italic>
          <NumberedList>
            <ListItem>
              On-chain SEO and token discovery (dedicated 'Discover' page with curated token categories, 
              token/chain/narrative/strategy landing pages, etc.)
            </ListItem>
            <ListItem>
              Narrative and social proof (comms which are framed around 'Matcha traders saved $X this month', 
              '% trades with better execution than leading DEXs', etc.)
            </ListItem>
            <ListItem>
              Setup public dashboard which tracks swap stats across DEX & DEX aggregators to highlight 
              Matcha's superiority
            </ListItem>
          </NumberedList>
        </ListItem>
      </BulletList>

      <Divider />

      <H2>Matcha Web - Interface Optimizations</H2>

      <Paragraph>
        Matcha.xyz is a clean and refined DEX aggregator app. Props to the 0x team for a) building great 
        DeFi infra and b) creating a thoughtful interface for swaps. In this case study, I'll share some 
        thoughts/opinions on the Matcha interface and flows, question some decisions and suggest 
        optimizations which could be made!
      </Paragraph>

      <H3>Clicks to First Swap</H3>

      <Paragraph>
        If a high-intent user comes to Matcha knowing exactly what they want to swap, they go through{' '}
        <Bold>8-14 clicks</Bold>.
      </Paragraph>

      <BulletList>
        <ListItem>
          Connect Wallet → Choose Wallet → Sign if new user — <Italic>3 clicks</Italic>
        </ListItem>
        <ListItem>
          Click search bar → Choose buy token (Network choice if not chosen by default) → Choose sell 
          token → Enter Amount — <Italic>4-5 clicks</Italic>
        </ListItem>
        <ListItem>
          Place Order → Confirm Swap in Wallet → Added steps if token approval and/or signature is 
          required — <Italic>4-6 clicks</Italic>
        </ListItem>
      </BulletList>

      <Paragraph>
        <Italic>Every click/step/action needs to be carefully curated with data-driven, experiment-led optimization.</Italic>
      </Paragraph>

      <H3>Landing Page</H3>

      <Paragraph>
        Matcha consistently has the lowest fees for swaps &gt;$100 in my experience (over Uniswap and 
        other DEX aggregators). The copy on the landing page I see has no mention of it.{' '}
        <Bold>"Swap any token in seconds"</Bold> is the headline text - I think this can be more powerful.
      </Paragraph>

      <Paragraph>
        <Bold>Critical Bugs/Issues:</Bold>
      </Paragraph>

      <BulletList>
        <ListItem>
          <Bold>Bad cross-chain swaps UX:</Bold> When I choose a network + token to buy on the search bar, 
          and then choose a different network + token to sell, the swap widget doesn't recognise that I'm 
          trying to perform a Cross-chain swap. It keeps rotating my new selection as the buy/sell token 
          under the 'Market' tab. This is really bad UX!
        </ListItem>
        <ListItem>
          <Bold>Token balance invisible in 'All' network selection:</Bold> Why do I not see my token 
          balances when 'All' option is chosen in network? I will obviously sell what I have right? 
          The search modal seems to have been designed keeping in mind the Homepage flow only.
        </ListItem>
        <ListItem>
          <Bold>Switch network doesn't happen automatically:</Bold> When user switches network on the 
          search token modal, why can't we switch it automatically for the swap? Why does this require 
          an extra click in the CTA?
        </ListItem>
      </BulletList>

      <H3>Search Bar & Modal</H3>

      <Paragraph>
        <Italic>Modal IA: Search input - Network - Most popular - Recent - Trending</Italic>
      </Paragraph>

      <BulletList>
        <ListItem>
          As much as the search bar approach is minimal/good-looking, it breaks the muscle memory of 
          traders who are used to seeing the swap widget interface. (Uniswap, 1inch, Kyberswap, Bebop, 
          Cowswap - all use the swap widget).
        </ListItem>
        <ListItem>
          The interface change upon token selection feels too drastic. The Search bar + Token list on 
          homepage changes into a Token Info + Swap Widget:
          <BulletList>
            <ListItem>A better flow could have the Swap Widget on the Homepage itself</ListItem>
            <ListItem>When user clicks on 'Select Token', we open the search token modal</ListItem>
            <ListItem>
              Upon token selection, the Swap Widget slides to the right and Token Info appears on the left
            </ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          I saw Simon's ETHDenver keynote - the search modal is well thought out. The one peeve I have 
          with it though is the number of logos. Have we considered logo fatigue?
          <BulletList>
            <ListItem>Every chain is represented in a logo; every token has a logo + network logo</ListItem>
            <ListItem>Why not just have user choose network first before choosing token?</ListItem>
          </BulletList>
        </ListItem>
      </BulletList>

      <Paragraph>
        <Italic>
          I'm curious to see the experiments that were done before this UX was pushed to prod. 
          Was there a statistically significant improvement in funnel conversion vs control?
        </Italic>
      </Paragraph>

      <H3>Token List</H3>

      <Paragraph>
        <Italic>IA: Network dropdown - Popular - Trending - Zora dropdown</Italic>
      </Paragraph>

      <BulletList>
        <ListItem>
          The token info itself is extremely useful, but the list of tokens feels redundant.
          <BulletList>
            <ListItem>
              The default tokens shown are ETH, USDT in 3 chains, USDC in 8 chains, etc. A default 
              network with an actual list of tokens is more relevant IMO.
            </ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          Discovery of tokens is not the primary function of a DEX - users usually know what they're 
          trading. IMO, this list could be pushed below the swap widget on the homepage, or be nested 
          inside a 'Discover' section entirely.
          <BulletList>
            <ListItem>
              The 'holders' column might deserve more attention if we have this list under a 'Discover' 
              section. Social trading will be big, but that's a whole feature in itself.
            </ListItem>
          </BulletList>
        </ListItem>
      </BulletList>

      <Paragraph>
        <Italic>
          Very curious to know the swaps which originate from this list of tokens, as a % of total swaps. 
          (Discounting ETH, USDT & USDC)
        </Italic>
      </Paragraph>

      <H3>Connect Wallet</H3>

      <Paragraph>
        What's the logic behind ordering these wallets?
      </Paragraph>

      <BulletList>
        <ListItem>
          I understand Coin(base) wallet's visibility due to the close relationship with them.
        </ListItem>
        <ListItem>
          Rabby is widely known as a better alternative to Metamask, at least with power users in web3. 
          I don't even see it. (it's below Core & Leap??)
        </ListItem>
      </BulletList>

      <Paragraph>
        Could at least use a different UI where the top 'x' wallets is shown in tiles, after which the 
        list of all wallets is in a scroll.
      </Paragraph>

      <Paragraph>
        <Italic>
          Would like to see the split between wallets chosen by users who end up actually swapping. 
          Order should correlate with the same.
        </Italic>
      </Paragraph>

      <H3>Swap Interface</H3>

      <Paragraph>
        <Italic>IA: Token overview - Price Chart - Swap Widget</Italic>
      </Paragraph>

      <Paragraph>
        I love the depth of information which is given about a token, but there are some concerns here.
      </Paragraph>

      <BulletList>
        <ListItem>
          When I choose a network + token to buy on the search bar, and then choose a different network + 
          token to sell, the swap widget doesn't recognise that I'm trying to perform a Cross-chain swap. 
          It keeps rotating my new selection as the buy/sell token under the 'Market' tab. This is really bad UX!
        </ListItem>
        <ListItem>
          Why do I not see my token balances when 'All' option is chosen in network? I will obviously 
          sell what I have right? The search modal seems to have been designed keeping in mind the 
          Homepage flow only. This is bad UX imo.
        </ListItem>
        <ListItem>
          When user switches network on the search token modal, why can't we switch it automatically 
          for the swap? Why does this require an extra click in the CTA?
          <BulletList>
            <ListItem>There's something wrong with the switching networks and swapping flow.</ListItem>
            <ListItem>I tried clicking on the CTA multiple times and it didn't work</ListItem>
            <ListItem>
              When I went to my wallet and manually switched network, I got a 'Transaction Failed' 
              notification which has a 'Help Center' CTA with no context on why the txn failed.
            </ListItem>
            <ListItem>
              For some reason, all txns post switching a network manually are failing for me - these 
              are critical bugs which result in user churn.
            </ListItem>
            <ListItem>The same txn went through on Uniswap in 2 clicks (sign & swap).</ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          Might be my qualitative opinion - why is the Swap widget aligned to the right?
          <BulletList>
            <ListItem>
              The 'chart on left - swap widget on right' works great in a trading or perps interface 
              where interacting with charts is a primary activity. Is that behaviour noticed here?
            </ListItem>
            <ListItem>
              From a DEX interface muscle memory POV, I'd think it's best to keep it centered - the 
              right alignment feels unnatural tbh.
            </ListItem>
          </BulletList>
        </ListItem>
      </BulletList>

      <Paragraph>
        <Italic>
          In case our 'north star users' use the TradingView chart heavily and execute trades while 
          doing technical analysis, this makes sense. Though, I'd suggest having a 'Basic' and 'Pro' 
          interface where we land new users on the former and 'north star users' on the latter.
        </Italic>
      </Paragraph>

      <BulletList>
        <ListItem>
          For txns which require multiple wallet clicks (sign, approval, trade), something which clarifies 
          the multi-step nature of transaction is good UX (like Uniswap).
          <BulletList>
            <ListItem>
              Why can't user hover for more info and click on 'Why do I have to approve a token'? 
              It's tedious to read an article everytime user wants additional information.
            </ListItem>
          </BulletList>
        </ListItem>
      </BulletList>

      <Paragraph>
        <Italic>
          In the ~6hrs I've spent, I can already spot a lot of optimisations which will make the UX 
          a lot smoother. I'd love to dive deeper!
        </Italic>
      </Paragraph>

      <H3>Transaction Pending & Trade Details</H3>

      <Paragraph>
        Transaction pending and transaction complete notifications must be available to user till it's 
        closed. The same txn pending notification must convert to a txn complete notification (or the 
        latter must be immediately sent after former). There can't be a gap in between, leaving the 
        user clueless. Also, why are we not showing txn details in a modal/side peek while keeping 
        the user on the swap interface? If I come with the intent of performing multiple swaps (say 
        for rebalancing my portfolio), the 'Trade Details' screen has no way for me to go back to 
        the swap interface - this is bad UX.
      </Paragraph>
    </>
  );
}

