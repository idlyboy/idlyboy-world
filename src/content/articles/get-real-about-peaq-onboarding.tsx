import {
  H2, H3,
  Paragraph, Bold, Italic, Link,
  Callout,
  Toggle,
  BulletList, NumberedList, ListItem,
  Image,
  Divider,
} from '../../components/NotionBlocks';
import { getImageKitUrl } from '../../imagekit-urls';

export function GetRealAboutPeaqOnboardingContent() {
  return (
    <>
      <Paragraph>
        peaq is a dePIN protocol where machines and devices can interact, transact, and manage resources
        autonomously. This decentralised machine network means that users can 'lend' their machines and
        monetise the value they generate. peaq aims to be the global layer for machine coordination.
      </Paragraph>

      <Paragraph>
        <Italic>
          This doc is a teardown of the discovery and onboarding experience of the{' '}
          <Link href="https://app.peaq.xyz/">peaq app</Link>. Given that peaq network is relaunching
          the 'Get Real' campaign to onboard new users, it's crucial that the new user experience is
          optimised and well-connected to convert marketing spend to token holders, stakers or network participants.
        </Italic>
      </Paragraph>

      <H2>Intro</H2>

      <Paragraph>
        Before we jump into critiquing the app flows and UI, let's understand the user journey.
        Any user goes through these phases when they come across a new product:
      </Paragraph>

      <Paragraph>
        <Bold>Discovery → Understanding value prop → Feeling the need for themselves → Using it</Bold>
      </Paragraph>

      <Toggle title="Where does a user discover peaq?">
        <Paragraph>
          The primary discovery surfaces seem to be Twitter, Website, Token screener apps (Coinmarketcap)
          and Galxe (although the campaign has ended). The usual CTAs take users to{' '}
          <Link href="https://app.peaq.xyz">app.peaq.xyz</Link> or{' '}
          <Link href="https://www.peaq.xyz">peaq.xyz</Link>.
        </Paragraph>
      </Toggle>

      <Toggle title="What is their intent when they land on app.peaq.xyz?">
        <Paragraph>
          What's the context of discovery when user lands on app.peaq.xyz? Looking at UTM source
          numbers will give accuracy, but the following seem about right:
        </Paragraph>
        <BulletList>
          <ListItem>
            <Bold>Website:</Bold> Users coming from the peaq landing page or documentation probably
            have the highest intent. It's crucial to serve them the best onboarding experience in
            order to retain them.
          </ListItem>
          <ListItem>
            <Bold>Twitter:</Bold> Users coming from Twitter could have good intent to participate
            in the network, this is dependent on the post itself ofc.
          </ListItem>
          <ListItem>
            <Bold>Token Screeners (Coinmarketcap):</Bold> Exploring the product to see if it's
            worth investing in, participating to earn rewards, etc.
          </ListItem>
          <ListItem>
            <Bold>Galxe:</Bold> The 'Get Real' campaign was focused on increasing numbers on socials,
            so most Galxe users are not really using the platform/investing in the token. It is
            well known that Galxe driven engagement are bots.
          </ListItem>
        </BulletList>
      </Toggle>

      <Toggle title="What do we want users to do on app.peaq.xyz?">
        <Paragraph>
          Simply put, we want a user to become involved in the peaq network. What are the different
          levels of involvement in the network?
        </Paragraph>
        <BulletList>
          <ListItem>Token holder</ListItem>
          <ListItem>Staker</ListItem>
          <ListItem>List their machine/device on a peaq-powered dePIN network (eg: NATIX)</ListItem>
          <ListItem>Builder/creator of a dePIN project (entirely different user journey - out of scope for now)</ListItem>
        </BulletList>
      </Toggle>

      <Divider />

      <H2>Website</H2>

      <Paragraph>
        Given that the peaq website is the primary source of users who land on the app, it's important
        that it achieves the following:
      </Paragraph>

      <Toggle title="Passing the eye-test and displaying legitimacy">
        <Paragraph>
          The peaq website UI is good-looking and passes the eye test with flying colours.
        </Paragraph>
      </Toggle>

      <Toggle title="Educating users about peaq">
        <Paragraph>
          This is 50-50 imo. As good as the website looks, the information architecture is confusing.
          There are multiple snippets of interesting information or catchy slogans, but there's not
          much cohesion or logical flow.
        </Paragraph>
        <Paragraph>
          The 'Learn' tab is a good example of this:
        </Paragraph>
        <BulletList>
          <ListItem>
            The 'Vision' page has a bunch of well written slogan-like copy which doesn't actually
            teach the user about anything.
          </ListItem>
          <ListItem>
            The 'Roadmap' page has Q2 and Q3 columns (of which year?) with vague info — a new user
            won't really catch anything and an experienced web3 user will dismiss it as superficial
            copy which means nothing.
          </ListItem>
          <ListItem>
            The 'Ecosystem' and 'Use Cases' pages are good at showing the reach and functionality of peaq.
            But importantly, it misses explaining how peaq is involved in a partnership or how we power
            a use-case. It's important to decide when to choose quantity vs quality. Showcasing the top
            partners (for eg: the enterprise partners) and explaining how peaq is involved with them,
            is so much better than listing a bunch of partners (like Ethereum VM).
          </ListItem>
        </BulletList>
      </Toggle>

      <Callout type="warning" emoji="🚨">
        Most importantly, the 'Learn' tab, meant for teaching users about peaq, has no diagram or
        infographic which one can look at and immediately understand peaq.{' '}
        <Italic>
          Succinct copy + diagrams explaining concepts is much better than good-looking stock images
          and catchy slogans.
        </Italic>
      </Callout>

      <Toggle title="Nudging users to take action based on their persona">
        <Paragraph>
          This is the most important part of a website. peaq does a good job of generating interest,
          but drops the ball on converting interest into engaging users.
        </Paragraph>
        <BulletList>
          <ListItem>
            The 'Build' tab looks good (although having both, a 'Build on peaq' and 'Developers' page
            seems redundant);
          </ListItem>
          <ListItem>
            As an end-consumer interested in peaq, I'm left without any clear CTA or value prop.
            Although there's a 'peaq app' CTA, I have learnt nowhere about what I can do if I head
            to the peaq app. Unless there's clear value prop, it's unlikely that a user enters the
            app or joins the peaq community discord.
          </ListItem>
          <ListItem>
            It's crucial to breakdown the personas of users and have copy + CTAs which nudge them to
            take action. Some rough examples:
            <BulletList>
              <ListItem>
                <Bold>Web3 User</Bold> — Buy token to earn staking rewards and participate in the dePIN economy
              </ListItem>
              <ListItem>
                <Bold>Robotics/Machine fiend</Bold> — Find the right dePIN network to list your
                machine/device and earn tokens
              </ListItem>
            </BulletList>
          </ListItem>
        </BulletList>
      </Toggle>

      <Divider />

      <H2>peaq app</H2>

      <Paragraph>
        The overall styling and UI looks good, but there are some glaring issues from a UX point of view.
      </Paragraph>

      <H3>tldr</H3>

      <Paragraph>
        The app feels like a bundle of fragmented actions which don't feel connected. There's a lack
        of nuance in understanding user journey and accordingly crafting flows.
      </Paragraph>

      <Paragraph>
        <Bold>Observations:</Bold>
      </Paragraph>

      <NumberedList>
        <ListItem>
          Overall IA is similar to a generic wallet app as opposed to being specifically designed
          for peaq's user/product intent.
        </ListItem>
        <ListItem>No custom experience or flows served based on user journey.</ListItem>
        <ListItem>
          Use of third-party services induces extra clicks and causes confusion.
          <BulletList>
            <ListItem>
              There is a general lack of continuity and state change info which compounds the confusion bit.
            </ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          There's an overall lack of 'inform user → show value prop → display CTA' for every action.
        </ListItem>
      </NumberedList>

      <Paragraph>
        <Bold>Opinions / Fixes:</Bold>
      </Paragraph>

      <NumberedList>
        <ListItem>
          Keep IA peaq focused, have buy, swap, bridge CTAs and sections based on user journey and value prop
        </ListItem>
        <ListItem>
          CTAs change based on user journey. Home page for someone who doesn't own $peaq yet, should
          be different than for someone who is already a tokenholder.
        </ListItem>
        <ListItem>
          Users don't care about Squid, Banxa, etc. Keep number of clicks to the minimum, add
          auto-detection, abstract gas, make the app easy to use.
          <BulletList>
            <ListItem>
              Inform user of steps involved, show updates and ensure user is informed before and
              after performing actions.
            </ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          Based on user journey, we decide which CTAs to show. Every section related to an action
          should have a simple info widget to inform user and show value prop.
        </ListItem>
      </NumberedList>

      <Divider />

      <H3>Discovery → Intent capture</H3>

      <Image
        src={getImageKitUrl('peaq Home - New User.png', 'medium')}
        alt="peaq Home - New User"
        caption="peaq Home - New User"
      />

      <Image
        src={getImageKitUrl('Home - $peaq tokenholder.png', 'medium')}
        alt="Home - $peaq tokenholder"
        caption="Home - $peaq tokenholder"
      />



      <Paragraph>
        <Bold>Observations:</Bold>
      </Paragraph>

      <NumberedList>
        <ListItem>
          Home = relevant info & actions based on user journey. Current homepage is cluttered with
          9 CTAs, overwhelms a user. Most CTAs are just unnecessary.
        </ListItem>
        <ListItem>
          No user journey based goal/intent based entry points/nudges.
          <BulletList>
            <ListItem>No state change before and after a user signs in.</ListItem>
            <ListItem>No state change after user buys $peaq</ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          Portfolio value is misleading, given that the peaq interface feels like a generic wallet experience.
        </ListItem>
      </NumberedList>

      <Paragraph>
        <Bold>Opinions / Fixes:</Bold>
      </Paragraph>

      <NumberedList>
        <ListItem>Have 2-3 CTAs at most — 'Buy $peaq', 'Participate and Earn', etc.</ListItem>
        <ListItem>
          'Start here' section educating user via a checklist. Nudge user to perform the top 1-3
          steps based on user journey
          <BulletList>
            <ListItem>
              If user signs in with wallet, nudge to bridge funds and buy $peaq; if social sign in,
              nudge to buy with card
            </ListItem>
            <ListItem>Nudge user to stake/swap once they buy $peaq</ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          The entire IA gives a generic wallet feel, so just 'portfolio value' should actually be '$peaq balance'
        </ListItem>
      </NumberedList>

      <Divider />

      <H3>IA and Navigation</H3>

      <Image
        src={getImageKitUrl('Peaq app - Buy tab.png', 'medium')}
        alt="Peaq app - Buy tab"
        caption="Peaq app - Buy tab"
      />

      <Image
        src={getImageKitUrl('Peaq app - Bridge tab.png', 'medium')}
        alt="Peaq app - Bridge tab"
        caption="Peaq app - Bridge tab"
      />



      <Paragraph>
        <Bold>Observations:</Bold>
      </Paragraph>

      <NumberedList>
        <ListItem>
          Hub and spoke approach with a side nav bar (Home, Buy, Bridge, Swap, etc.). Simple but
          feels like a generic wallet interface, no peaq app specific cues.
        </ListItem>
        <ListItem>
          Buy offloads to Banxa, Bridge/Swap offload to Squid — core tasks offload to third party
          flows with limited guidance or state continuity.
        </ListItem>
        <ListItem>'Get Real' campaign redirects user to peaq portal — fragmented experience isn't good</ListItem>
        <ListItem>Quick actions widget on Home is redundant as everything is on the left nav</ListItem>
      </NumberedList>

      <Paragraph>
        <Bold>Opinions / Fixes:</Bold>
      </Paragraph>

      <NumberedList>
        <ListItem>
          Buy, Bridge and Swap can just be under a $peaq tab. User shouldn't have to switch between
          tabs to buy-bridge-swap.
        </ListItem>
        <ListItem>
          Reduce number of clicks for everything. Embed the buy, swap and bridge into the interface.
          Guide the user based on user journey and inform state changes.
        </ListItem>
        <ListItem>
          I see that peaq is already merging the portal and making app.peaq.xyz the single interface
          for everything peaq. This is good.
        </ListItem>
        <ListItem>Skip it, and have a section focused on user journey based nudges</ListItem>
      </NumberedList>

      <Divider />

      <H3>Core Functionality</H3>

      <Image
        src={getImageKitUrl('peaq Swap - Modal.png', 'medium')}
        alt="peaq Swap - Modal"
        caption="peaq Swap - Modal"
      />

      <Image
        src={getImageKitUrl('peaq Liquid Machines tab.png', 'medium')}
        alt="peaq Liquid Machines tab"
        caption="peaq Liquid Machines tab"
      />

      <Paragraph>
        <Bold>Observations:</Bold>
      </Paragraph>

      <NumberedList>
        <ListItem>
          After connecting the wallet to the peaq app, why do I have to connect it to the third
          party provider again for a swap/bridge?
        </ListItem>
        <ListItem>
          Empty spaces of bridge, swap and buy are super under-utilised. User sees generic, useless
          info about Squid or Banxa which is unnecessary.
          <BulletList>
            <ListItem>
              What can I swap $peaq for? No mention of peaq ecosystem apps for user to get involved in for swap
            </ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          Why is the swap-bridge functions taking place in a modal? If I close it, where can I see
          progress of a txn? (eg: bridging from eth to peaq)
        </ListItem>
        <ListItem>
          Preset buy/sell tokens on swap/bridge are mismatched. The preset tokens I get are selling
          $peaq on peaq to usdt on eth.
        </ListItem>
        <ListItem>
          When I change value or click on a % value in the dropdown while trying to stake with any
          validator, app keeps opening a wallet interaction to add peaq network?
        </ListItem>
        <ListItem>
          Liquid machines has a widget which shows value prop, but user has to get out of app to
          understand simply how they can avail it.
          <BulletList>
            <ListItem>
              Robofarm and Robocafe have abysmally low information/clarity for user to understand
              and want to participate.
            </ListItem>
          </BulletList>
        </ListItem>
      </NumberedList>

      <Image
        src={getImageKitUrl('peaq Swap - Modal.png', 'medium')}
        alt="peaq Swap - Modal"
        caption="peaq Swap - Modal"
      />

      <Image
        src={getImageKitUrl('peaq Liquid Machines tab.png', 'medium')}
        alt="peaq Liquid Machines tab"
        caption="peaq Liquid Machines tab"
      />

      <Paragraph>
        <Bold>Opinions / Fixes:</Bold>
      </Paragraph>

      <NumberedList>
        <ListItem>User connects wallet only once and it allows any bridge/swap function</ListItem>
        <ListItem>
          Add relevant value prop in for buy, swap and bridge.
          <BulletList>
            <ListItem>
              Swap should be used to get users to buy peaq ecosystem tokens (NATIX, Silencio, etc).
              Keep a curated list of ecosystem tokens and value prop.
            </ListItem>
            <ListItem>Buy and bridge should nudge user to buy $peaq, so add value prop.</ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          Embed the functions into the app-space. If using modal, show txn history/progress in the
          same space once a user closes tab. Ensure continuity with state changes via floating
          notifications, toasts, etc.
        </ListItem>
        <ListItem>
          Nudge user to buy $peaq, not sell.
          <BulletList>
            <ListItem>
              Add asset detection, recommended path and gas top-up. Best case, abstract away everything
              to just one click using Bungee/Socket.
            </ListItem>
            <ListItem>
              User with any crypto balance on any chain can buy $peaq on peaq blockchain with 1 click,
              no gas required.
            </ListItem>
          </BulletList>
        </ListItem>
        <ListItem>
          Unnecessary wallet interaction, extremely intrusive. Nudge user to add chain only after
          they choose validator and click on 'Stake' CTA.
        </ListItem>
        <ListItem>
          Well-written 3-4 line copy on how to navigate the 'Liquid Machine' tab is required.
          <BulletList>
            <ListItem>
              Projects have variables/tags apart from description and yield for users to better
              understand each project at a glance.
            </ListItem>
          </BulletList>
        </ListItem>
      </NumberedList>
    </>
  );
}

