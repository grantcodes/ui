import { html } from "lit";
import "./sidebar.js";

const meta = {
	title: "Components/Sidebar",
	component: "grantcodes-sidebar",
};

export default meta;

/**
 * Basic sidebar with navigation
 */
export const Sidebar = {
	render: () => html`
		<div style="display: flex; height: 500px; border: 1px solid #ccc;">
			<grantcodes-sidebar>
				<h3 style="margin-top: 0;">Navigation</h3>
				<nav>
					<ul style="list-style: none; padding: 0;">
						<li style="margin-bottom: 0.5rem;"><a href="/">Dashboard</a></li>
						<li style="margin-bottom: 0.5rem;"><a href="/projects">Projects</a></li>
						<li style="margin-bottom: 0.5rem;"><a href="/tasks">Tasks</a></li>
						<li style="margin-bottom: 0.5rem;"><a href="/settings">Settings</a></li>
					</ul>
				</nav>
			</grantcodes-sidebar>
			<div style="flex: 1; padding: 2rem;">
				<h1>Main Content</h1>
				<p>This is the main content area.</p>
			</div>
		</div>
	`,
};

/**
 * Right-positioned sidebar
 */
export const RightSidebar = {
	render: () => html`
		<div style="display: flex; height: 500px; border: 1px solid #ccc;">
			<div style="flex: 1; padding: 2rem;">
				<h1>Main Content</h1>
				<p>The sidebar is on the right side.</p>
			</div>
			<grantcodes-sidebar position="right">
				<h3 style="margin-top: 0;">Details</h3>
				<p style="font-size: 0.875rem;">
					Additional information and tools appear here.
				</p>
			</grantcodes-sidebar>
		</div>
	`,
};

/**
 * Collapsible sidebar that can be expanded/collapsed
 */
export const Collapsible = {
	render: () => html`
		<div style="display: flex; height: 500px; border: 1px solid #ccc;">
			<grantcodes-sidebar collapsible>
				<h3 style="margin-top: 0;">Menu</h3>
				<nav>
					<ul style="list-style: none; padding: 0;">
						<li style="margin-bottom: 0.5rem;"><a href="/">🏠 Home</a></li>
						<li style="margin-bottom: 0.5rem;"><a href="/profile">👤 Profile</a></li>
						<li style="margin-bottom: 0.5rem;"><a href="/messages">💬 Messages</a></li>
						<li style="margin-bottom: 0.5rem;"><a href="/settings">⚙️ Settings</a></li>
					</ul>
				</nav>
			</grantcodes-sidebar>
			<div style="flex: 1; padding: 2rem;">
				<h1>Main Content</h1>
				<p>Click the toggle button to collapse/expand the sidebar.</p>
			</div>
		</div>
	`,
};

/**
 * Initially collapsed sidebar
 */
export const InitiallyCollapsed = {
	render: () => html`
		<div style="display: flex; height: 500px; border: 1px solid #ccc;">
			<grantcodes-sidebar collapsed>
				<nav>
					<ul style="list-style: none; padding: 0;">
						<li style="margin-bottom: 0.5rem;">🏠</li>
						<li style="margin-bottom: 0.5rem;">👤</li>
						<li style="margin-bottom: 0.5rem;">💬</li>
						<li style="margin-bottom: 0.5rem;">⚙️</li>
					</ul>
				</nav>
			</grantcodes-sidebar>
			<div style="flex: 1; padding: 2rem;">
				<h1>Main Content</h1>
				<p>The sidebar starts collapsed. Click the toggle to expand it.</p>
			</div>
		</div>
	`,
};

/**
 * Custom width sidebar
 */
export const CustomWidth = {
	render: () => html`
		<div style="display: flex; height: 500px; border: 1px solid #ccc;">
			<grantcodes-sidebar width="350px">
				<h3 style="margin-top: 0;">Wide Sidebar</h3>
				<p>This sidebar has a custom width of 350px.</p>
				<p>You can set any width you need for your layout.</p>
			</grantcodes-sidebar>
			<div style="flex: 1; padding: 2rem;">
				<h1>Main Content</h1>
				<p>Main content adjusts to the sidebar width.</p>
			</div>
		</div>
	`,
};

/**
 * Mobile-responsive demo - shows drawer behavior on small screens
 */
export const MobileResponsive = {
	render: () => html`
		<div style="max-width: 600px; border: 1px solid #ccc;">
			<div style="display: flex; min-height: 400px;">
				<grantcodes-sidebar>
					<h3 style="margin-top: 0;">Navigation</h3>
					<nav>
						<ul style="list-style: none; padding: 0;">
							<li style="margin-bottom: 0.5rem;"><a href="/">Dashboard</a></li>
							<li style="margin-bottom: 0.5rem;"><a href="/projects">Projects</a></li>
							<li style="margin-bottom: 0.5rem;"><a href="/tasks">Tasks</a></li>
							<li style="margin-bottom: 0.5rem;"><a href="/team">Team</a></li>
							<li style="margin-bottom: 0.5rem;"><a href="/settings">Settings</a></li>
						</ul>
					</nav>
				</grantcodes-sidebar>
				<div style="flex: 1; padding: 2rem;">
					<h1>Main Content</h1>
					<p style="font-size: 0.875rem; color: #666;">
						On mobile/narrow screens, the sidebar becomes a drawer.
						Click the hamburger menu to open it.
					</p>
				</div>
			</div>
		</div>
	`,
};


