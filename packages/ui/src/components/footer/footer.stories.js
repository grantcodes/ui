import { html } from "lit";
import "./footer.js";

const meta = {
	title: "Components/Footer",
	component: "grantcodes-footer",
};

export default meta;

const columns = html`
	<grantcodes-footer-column>
		<h3>Company</h3>
		<ul>
			<li><a href="/about">About Us</a></li>
			<li><a href="/team">Team</a></li>
			<li><a href="/careers">Careers</a></li>
			<li><a href="/press">Press</a></li>
		</ul>
	</grantcodes-footer-column>

	<grantcodes-footer-column>
		<h3>Product</h3>
		<ul>
			<li><a href="/features">Features</a></li>
			<li><a href="/pricing">Pricing</a></li>
			<li><a href="/docs">Documentation</a></li>
			<li><a href="/api">API</a></li>
		</ul>
	</grantcodes-footer-column>

	<grantcodes-footer-column>
		<h3>Support</h3>
		<ul>
			<li><a href="/help">Help Center</a></li>
			<li><a href="/contact">Contact</a></li>
			<li><a href="/status">Status</a></li>
			<li><a href="/security">Security</a></li>
		</ul>
	</grantcodes-footer-column>
`;

/**
 * Basic footer with three columns
 */
export const Footer = {
	render: () => html`
		<grantcodes-footer>
			${columns}

			<div slot="bottom">
				<p>&copy; 2024 MyCompany. All rights reserved.</p>
			</div>
		</grantcodes-footer>
	`,
};

/**
 * Footer with four columns
 */
export const FourColumns = {
	render: () => html`
		<grantcodes-footer columns="4">
			${columns}

			<div slot="bottom">
				<p>&copy; 2024 Company Name</p>
			</div>
			<div slot="bottom" style="display: flex; gap: 1rem;">
				<a href="/twitter">Twitter</a>
				<a href="/github">GitHub</a>
				<a href="/linkedin">LinkedIn</a>
			</div>
		</grantcodes-footer>
	`,
};

/**
 * Footer with social links in bottom section
 */
export const WithSocialLinks = {
	render: () => html`
		<grantcodes-footer>
			${columns}

			<div slot="bottom" style="display: flex; gap: 0.5rem; align-items: center;">
				<span>&copy; 2024 MyApp</span>
				<span>•</span>
				<a href="/privacy">Privacy</a>
				<span>•</span>
				<a href="/terms">Terms</a>
			</div>

			<!-- <div slot="bottom" style="display: flex; gap: 1rem; font-size: 1.5rem;">
				<a href="https://twitter.com">🐦</a>
				<a href="https://github.com">🐙</a>
				<a href="https://linkedin.com">💼</a>
				<a href="https://discord.com">💬</a>
			</div> -->
		</grantcodes-footer>
	`,
};

/**
 * Simple footer with minimal content
 */
export const Minimal = {
	render: () => html`
		<grantcodes-footer columns="1">
			<grantcodes-footer-column>
				<p style="text-align: center;">&copy; 2024 MyCompany. All rights reserved.</p>
				<ul style="justify-content: center;">
					<li><a href="/privacy">Privacy Policy</a></li>
					<li><a href="/terms">Terms of Service</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
			</grantcodes-footer-column>
		</grantcodes-footer>
	`,
};

/**
 * Footer with rich content including description
 */
export const WithDescription = {
	render: () => html`
		<grantcodes-footer>
			<grantcodes-footer-column>
				<h3>MyCompany</h3>
				<p>Building amazing products that help teams work better together.</p>
			</grantcodes-footer-column>

			${columns}

			<div slot="bottom">
				<p>&copy; 2024 MyCompany, Inc. All rights reserved.</p>
			</div>
			<div slot="bottom">
				<a href="/privacy">Privacy</a> • <a href="/terms">Terms</a> • <a href="/cookies">Cookies</a>
			</div>
		</grantcodes-footer>
	`,
};
