import { html } from "lit";
import "../components/app-bar/app-bar.js";
import "../components/button/button.js";
import "../components/breadcrumb/breadcrumb.js";
import "../components/container/container.js";
import "../components/badge/badge.js";
import "../components/avatar/avatar.js";
import "../components/card/card.js";
import "../components/cta/cta.js";
import "../components/footer/footer.js";

const meta = {
  title: "Pages/Blog Post",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const relatedPosts = [
  {
    category: "Engineering",
    title: "How we cut our build times by 60% with better caching",
    excerpt:
      "A deep dive into the caching strategies we adopted across our CI pipeline and how they compound over time.",
    author: { name: "Priya Nair", avatar: "https://i.pravatar.cc/80?img=32" },
    date: "Feb 28, 2025",
    href: "/blog/build-cache",
  },
  {
    category: "Design",
    title: "Writing design tokens that scale across themes",
    excerpt:
      "Tokens are only as good as the naming conventions behind them. Here's what we learned from three rewrites.",
    author: { name: "Leo Hartmann", avatar: "https://i.pravatar.cc/80?img=53" },
    date: "Feb 14, 2025",
    href: "/blog/design-tokens",
  },
  {
    category: "Culture",
    title: "Small teams ship better software — here's why",
    excerpt:
      "Coordination cost grows faster than headcount. We explore the research and what it means for how we hire.",
    author: {
      name: "Chloe Bergstrom",
      avatar: "https://i.pravatar.cc/80?img=25",
    },
    date: "Jan 30, 2025",
    href: "/blog/small-teams",
  },
];

const footerContent = html`
  <grantcodes-footer-column>
    <h3>Flowbase</h3>
    <p>The modern platform for teams that move fast and ship great software.</p>
  </grantcodes-footer-column>

  <grantcodes-footer-column>
    <h3>Product</h3>
    <ul>
      <li><a href="/features">Features</a></li>
      <li><a href="/pricing">Pricing</a></li>
      <li><a href="/changelog">Changelog</a></li>
    </ul>
  </grantcodes-footer-column>

  <grantcodes-footer-column>
    <h3>Company</h3>
    <ul>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/careers">Careers</a></li>
    </ul>
  </grantcodes-footer-column>
`;

/**
 * A full blog post page. Demonstrates a reading-focused layout using the
 * container component for column width control, breadcrumb for navigation
 * context, badge for category tagging, avatar for the author byline, and
 * cards for related posts at the bottom.
 */
export const Default = {
  render: () => html`
    <grantcodes-app-bar sticky>
      <a
        slot="logo"
        href="/"
        style="font-weight: 700; font-size: 1.25rem; text-decoration: none; color: inherit;"
      >
        Flowbase
      </a>
      <div slot="nav" style="display: flex; gap: 0.5rem;">
        <a href="/">Home</a>
        <a href="/features">Features</a>
        <a href="/blog">Blog</a>
        <a href="/pricing">Pricing</a>
      </div>
      <div slot="actions" style="display: flex; gap: 0.5rem;">
        <grantcodes-button variant="ghost">Sign in</grantcodes-button>
        <grantcodes-button>Get started</grantcodes-button>
      </div>
    </grantcodes-app-bar>

    <!-- Article header -->
    <grantcodes-container
      style="padding-block-start: var(--g-theme-spacing-xl);"
    >
      <div style="max-inline-size: 48rem; margin-inline: auto;">
        <grantcodes-breadcrumb>
          <grantcodes-breadcrumb-item href="/">Home</grantcodes-breadcrumb-item>
          <grantcodes-breadcrumb-item href="/blog"
            >Blog</grantcodes-breadcrumb-item
          >
          <grantcodes-breadcrumb-item current
            >Shipping faster with async-first teams</grantcodes-breadcrumb-item
          >
        </grantcodes-breadcrumb>

        <div
          style="margin-block-start: var(--g-theme-spacing-lg); display: flex; flex-direction: column; gap: var(--g-theme-spacing-md);"
        >
          <grantcodes-badge variant="primary">Engineering</grantcodes-badge>

          <h1
            style="margin: 0; font-size: var(--g-theme-typography-display-default-font-size); font-weight: var(--g-theme-typography-display-default-font-weight); line-height: 1.15; color: var(--g-theme-color-content-default);"
          >
            Shipping faster with async-first teams
          </h1>

          <p
            style="margin: 0; font-size: var(--g-theme-typography-body-lg-font-size); color: var(--g-theme-color-content-secondary); line-height: 1.6;"
          >
            How we restructured communication to remove the hidden cost of
            synchronous coordination — and what we shipped as a result.
          </p>

          <div
            style="display: flex; align-items: center; gap: var(--g-theme-spacing-sm); padding-block: var(--g-theme-spacing-md); border-block: 1px solid var(--g-theme-color-border-default);"
          >
            <grantcodes-avatar
              src="https://i.pravatar.cc/80?img=12"
              name="Sam Torres"
              size="small"
            ></grantcodes-avatar>
            <div>
              <p
                style="margin: 0; font-weight: var(--g-typography-font-weight-600); color: var(--g-theme-color-content-default); font-size: var(--g-theme-typography-label-default-font-size);"
              >
                Sam Torres
              </p>
              <p
                style="margin: 0; color: var(--g-theme-color-content-secondary); font-size: var(--g-theme-typography-label-sm-font-size);"
              >
                March 12, 2025 · 8 min read
              </p>
            </div>
          </div>
        </div>
      </div>
    </grantcodes-container>

    <!-- Featured image -->
    <grantcodes-container
      nopad
      style="margin-block: var(--g-theme-spacing-lg);"
    >
      <img
        src="https://placehold.co/1200x500?text=Featured+Image"
        alt="An abstract illustration of async communication flows"
        style="display: block; width: 100%; height: auto; border-radius: var(--g-theme-border-radius-md);"
      />
    </grantcodes-container>

    <!-- Article body -->
    <grantcodes-container
      align="prose"
      style="padding-block-end: var(--g-theme-spacing-2xl);"
    >
      <article>
        <p>
          Every team I've worked on has had the same default: when in doubt,
          schedule a meeting. It feels productive. You get everyone in the room,
          align on something, and leave with decisions. But the cost is
          invisible — it shows up later, in the form of engineers who can't
          reach a flow state, PMs who spend half their week in Zoom, and
          decisions that only one person truly understands.
        </p>

        <p>
          When we went async-first eighteen months ago, I expected some
          friction. What I didn't expect was how much <em>clarity</em> it would
          force.
        </p>

        <h2>What async-first actually means</h2>

        <p>
          Async-first doesn't mean no meetings. It means every meeting has to
          earn its place. Before we schedule time, we ask: can this be a
          document? Can this be a comment thread? Can this decision be made by
          one person and communicated to the rest?
        </p>

        <p>
          The answer is yes more often than you'd think. Most "alignment
          meetings" are actually announcements. Most "brainstorms" are better
          done in writing first, then refined synchronously if needed.
        </p>

        <blockquote>
          <p>
            Writing forces clarity. If you can't explain your proposal in a
            document, you don't understand it well enough to decide on it yet.
          </p>
        </blockquote>

        <h2>The three tools we leaned on</h2>

        <p>
          We standardised on three artefacts that replaced most of our recurring
          meetings:
        </p>

        <ol>
          <li>
            <strong>Weekly written updates.</strong> Each team member posts a
            short update every Monday: what shipped, what's in progress, what's
            blocked. No meeting required.
          </li>
          <li>
            <strong>Decision documents.</strong> Any significant technical or
            product decision gets a one-pager. Context, options, recommendation,
            decision. It lives in the repo, not in someone's memory.
          </li>
          <li>
            <strong>Structured async reviews.</strong> Design and code reviews
            happen in writing first. We only meet if the written discussion
            reaches an impasse after 48 hours.
          </li>
        </ol>

        <h2>What we shipped as a result</h2>

        <p>
          In the six months after the shift, our cycle time dropped by 40%. Not
          because we worked more hours — we actually worked fewer. The
          difference was that engineers had longer uninterrupted stretches,
          decisions were made and recorded clearly, and we stopped relitigating
          things we'd already decided in a meeting no one documented.
        </p>

        <p>
          The compounding effect of async-first is slow but real. Each decision
          document becomes a reference for the next one. Each written update
          builds a log that onboards new hires in days rather than weeks. The
          knowledge stops living in people's heads and starts living in the
          system.
        </p>

        <div
          style="margin-block-start: var(--g-theme-spacing-xl); padding: var(--g-theme-spacing-md); background: var(--g-theme-color-background-subtle); border-radius: var(--g-theme-border-radius-md); display: flex; align-items: center; gap: var(--g-theme-spacing-md);"
        >
          <grantcodes-avatar
            src="https://i.pravatar.cc/80?img=12"
            name="Sam Torres"
            size="medium"
          ></grantcodes-avatar>
          <div>
            <p
              style="margin: 0; font-weight: var(--g-typography-font-weight-600); color: var(--g-theme-color-content-default);"
            >
              Sam Torres
            </p>
            <p
              style="margin: 0; color: var(--g-theme-color-content-secondary); font-size: var(--g-theme-typography-body-sm-font-size);"
            >
              CTO at Flowbase. Writes about engineering culture, distributed
              teams, and systems thinking.
            </p>
          </div>
        </div>
      </article>
    </grantcodes-container>

    <!-- Related posts -->
    <div
      style="background: var(--g-theme-color-background-subtle); padding-block: var(--g-theme-spacing-2xl);"
    >
      <grantcodes-container>
        <h2
          style="margin: 0 0 var(--g-theme-spacing-lg); font-size: var(--g-theme-typography-headline-default-font-size); font-weight: var(--g-theme-typography-headline-default-font-weight); color: var(--g-theme-color-content-default);"
        >
          More from the blog
        </h2>
        <div
          style="display: grid; grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr)); gap: var(--g-theme-spacing-lg);"
        >
          ${relatedPosts.map(
            (post) => html`
              <grantcodes-card>
                <div
                  slot="header"
                  style="display: flex; align-items: center; justify-content: space-between;"
                >
                  <grantcodes-badge variant="neutral"
                    >${post.category}</grantcodes-badge
                  >
                  <span
                    style="font-size: var(--g-theme-typography-label-sm-font-size); color: var(--g-theme-color-content-secondary);"
                    >${post.date}</span
                  >
                </div>
                <div
                  style="display: flex; flex-direction: column; gap: var(--g-theme-spacing-sm);"
                >
                  <h3
                    style="margin: 0; font-size: var(--g-theme-typography-title-default-font-size); font-weight: var(--g-theme-typography-title-default-font-weight); color: var(--g-theme-color-content-default); line-height: 1.3;"
                  >
                    <a
                      href="${post.href}"
                      style="color: inherit; text-decoration: none;"
                      >${post.title}</a
                    >
                  </h3>
                  <p
                    style="margin: 0; color: var(--g-theme-color-content-secondary); font-size: var(--g-theme-typography-body-sm-font-size); line-height: 1.6;"
                  >
                    ${post.excerpt}
                  </p>
                </div>
                <div
                  slot="footer"
                  style="display: flex; align-items: center; gap: var(--g-theme-spacing-sm);"
                >
                  <grantcodes-avatar
                    src="${post.author.avatar}"
                    name="${post.author.name}"
                    size="small"
                  ></grantcodes-avatar>
                  <span
                    style="font-size: var(--g-theme-typography-label-sm-font-size); color: var(--g-theme-color-content-secondary);"
                    >${post.author.name}</span
                  >
                </div>
              </grantcodes-card>
            `,
          )}
        </div>
      </grantcodes-container>
    </div>

    <grantcodes-cta
      eyebrow="Ready to try it?"
      title="See how Flowbase keeps your team in flow"
      text="Join thousands of teams who've replaced their meeting-heavy workflows with a calmer, more productive way of working."
      primary-action=${JSON.stringify({
        label: "Start for free",
        href: "/signup",
      })}
      secondary-action=${JSON.stringify({
        label: "See all features",
        href: "/features",
      })}
      align="center"
    ></grantcodes-cta>

    <grantcodes-footer columns="3">
      ${footerContent}
      <div slot="bottom">
        <p>&copy; 2025 Flowbase, Inc. All rights reserved.</p>
      </div>
      <div slot="bottom" style="display: flex; gap: var(--g-theme-spacing-md);">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>
    </grantcodes-footer>
  `,
};
