import React from "react";
import { createComponent } from "@lit/react";

// Component class imports (using registration files to trigger customElements.define)
import { GrantCodesAccordion } from "./components/accordion/accordion.js";
import { GrantCodesAppBar } from "./components/app-bar/app-bar.js";
import { GrantCodesAvatar } from "./components/avatar/avatar.js";
import { GrantCodesBadge } from "./components/badge/badge.js";
import {
	GrantCodesBreadcrumb,
	GrantCodesBreadcrumbItem,
} from "./components/breadcrumb/breadcrumb.js";
import { GrantCodesButton } from "./components/button/button.js";
import { GrantCodesButtonGroup } from "./components/button-group/button-group.js";
import { GrantCodesCard } from "./components/card/card.js";
import { GrantCodesCodePreview } from "./components/code-preview/code-preview.js";
import { GrantCodesContainer } from "./components/container/container.js";
import { GrantCodesCta } from "./components/cta/cta.js";
import { GrantCodesDialog } from "./components/dialog/dialog.js";
import {
	GrantCodesDropdown,
	GrantCodesDropdownItem,
} from "./components/dropdown/dropdown.js";
import { GrantCodesDropzone } from "./components/dropzone/dropzone.js";
import { GrantCodesFeatureList } from "./components/feature-list/feature-list.js";
import {
	GrantCodesFooter,
	GrantCodesFooterColumn,
} from "./components/footer/footer.js";
import { GrantCodesFormField } from "./components/form-field/form-field.js";
import { GrantCodesGallery } from "./components/gallery/gallery.js";
import { GrantCodesGalleryImage } from "./components/gallery/gallery-image.js";
import { GrantCodesHero } from "./components/hero/hero.js";
import { GrantCodesIcon } from "./components/icon/icon.js";
import { GrantCodesLoading } from "./components/loading/loading.js";
import { GrantCodesLogoCloud } from "./components/logo-cloud/logo-cloud.js";
import { GrantCodesMediaText } from "./components/media-text/media-text.js";
import { GrantCodesNewsletter } from "./components/newsletter/newsletter.js";
import { GrantCodesNotice } from "./components/notice/notice.js";
import { GrantCodesPagination } from "./components/pagination/pagination.js";
import { GrantCodesPricing } from "./components/pricing/pricing.js";
import { GrantCodesSidebar } from "./components/sidebar/sidebar.js";
import { GrantCodesStats } from "./components/stats/stats.js";
import { GrantCodesTab } from "./components/tabs/tab.js";
import { GrantCodesTabs } from "./components/tabs/tabs.js";
import { GrantCodesTabsButton } from "./components/tabs/internal/tabs-button.js";
import { GrantCodesTestimonials } from "./components/testimonials/testimonials.js";
import {
	GrantCodesToast,
	GrantCodesToastContainer,
} from "./components/toast/toast.js";
import { GrantCodesTooltip } from "./components/tooltip/tooltip.js";

// React wrapper exports
export const Accordion = createComponent({
	tagName: "grantcodes-accordion",
	elementClass: GrantCodesAccordion,
	react: React,
});

export const AppBar = createComponent({
	tagName: "grantcodes-app-bar",
	elementClass: GrantCodesAppBar,
	react: React,
	events: {
		onMenuToggle: "menu-toggle",
	},
});

export const Avatar = createComponent({
	tagName: "grantcodes-avatar",
	elementClass: GrantCodesAvatar,
	react: React,
});

export const Badge = createComponent({
	tagName: "grantcodes-badge",
	elementClass: GrantCodesBadge,
	react: React,
});

export const Breadcrumb = createComponent({
	tagName: "grantcodes-breadcrumb",
	elementClass: GrantCodesBreadcrumb,
	react: React,
});

export const BreadcrumbItem = createComponent({
	tagName: "grantcodes-breadcrumb-item",
	elementClass: GrantCodesBreadcrumbItem,
	react: React,
});

export const Button = createComponent({
	tagName: "grantcodes-button",
	elementClass: GrantCodesButton,
	react: React,
});

export const ButtonGroup = createComponent({
	tagName: "grantcodes-button-group",
	elementClass: GrantCodesButtonGroup,
	react: React,
});

export const Card = createComponent({
	tagName: "grantcodes-card",
	elementClass: GrantCodesCard,
	react: React,
});

export const CodePreview = createComponent({
	tagName: "grantcodes-code-preview",
	elementClass: GrantCodesCodePreview,
	react: React,
});

export const Container = createComponent({
	tagName: "grantcodes-container",
	elementClass: GrantCodesContainer,
	react: React,
});

export const Cta = createComponent({
	tagName: "grantcodes-cta",
	elementClass: GrantCodesCta,
	react: React,
});

export const Dialog = createComponent({
	tagName: "grantcodes-dialog",
	elementClass: GrantCodesDialog,
	react: React,
});

export const Dropdown = createComponent({
	tagName: "grantcodes-dropdown",
	elementClass: GrantCodesDropdown,
	react: React,
	events: {
		onToggle: "toggle",
	},
});

export const DropdownItem = createComponent({
	tagName: "grantcodes-dropdown-item",
	elementClass: GrantCodesDropdownItem,
	react: React,
	events: {
		onSelect: "select",
	},
});

export const Dropzone = createComponent({
	tagName: "grantcodes-dropzone",
	elementClass: GrantCodesDropzone,
	react: React,
});

export const FeatureList = createComponent({
	tagName: "grantcodes-feature-list",
	elementClass: GrantCodesFeatureList,
	react: React,
});

export const Footer = createComponent({
	tagName: "grantcodes-footer",
	elementClass: GrantCodesFooter,
	react: React,
});

export const FooterColumn = createComponent({
	tagName: "grantcodes-footer-column",
	elementClass: GrantCodesFooterColumn,
	react: React,
});

export const FormField = createComponent({
	tagName: "grantcodes-form-field",
	elementClass: GrantCodesFormField,
	react: React,
});

export const Gallery = createComponent({
	tagName: "grantcodes-gallery",
	elementClass: GrantCodesGallery,
	react: React,
});

export const GalleryImage = createComponent({
	tagName: "grantcodes-gallery-image",
	elementClass: GrantCodesGalleryImage,
	react: React,
});

export const Hero = createComponent({
	tagName: "grantcodes-hero",
	elementClass: GrantCodesHero,
	react: React,
});

export const Icon = createComponent({
	tagName: "grantcodes-icon",
	elementClass: GrantCodesIcon,
	react: React,
});

export const Loading = createComponent({
	tagName: "grantcodes-loading",
	elementClass: GrantCodesLoading,
	react: React,
});

export const LogoCloud = createComponent({
	tagName: "grantcodes-logo-cloud",
	elementClass: GrantCodesLogoCloud,
	react: React,
});

export const MediaText = createComponent({
	tagName: "grantcodes-media-text",
	elementClass: GrantCodesMediaText,
	react: React,
});

export const Newsletter = createComponent({
	tagName: "grantcodes-newsletter",
	elementClass: GrantCodesNewsletter,
	react: React,
});

export const Notice = createComponent({
	tagName: "grantcodes-notice",
	elementClass: GrantCodesNotice,
	react: React,
});

export const Pagination = createComponent({
	tagName: "grantcodes-pagination",
	elementClass: GrantCodesPagination,
	react: React,
});

export const Pricing = createComponent({
	tagName: "grantcodes-pricing",
	elementClass: GrantCodesPricing,
	react: React,
});

export const Sidebar = createComponent({
	tagName: "grantcodes-sidebar",
	elementClass: GrantCodesSidebar,
	react: React,
	events: {
		onToggle: "toggle",
		onDrawerToggle: "drawer-toggle",
	},
});

export const Stats = createComponent({
	tagName: "grantcodes-stats",
	elementClass: GrantCodesStats,
	react: React,
});

export const Tab = createComponent({
	tagName: "grantcodes-tab",
	elementClass: GrantCodesTab,
	react: React,
});

export const Tabs = createComponent({
	tagName: "grantcodes-tabs",
	elementClass: GrantCodesTabs,
	react: React,
});

export const TabsButton = createComponent({
	tagName: "grantcodes-tabs-button",
	elementClass: GrantCodesTabsButton,
	react: React,
});

export const Testimonials = createComponent({
	tagName: "grantcodes-testimonials",
	elementClass: GrantCodesTestimonials,
	react: React,
});

export const Toast = createComponent({
	tagName: "grantcodes-toast",
	elementClass: GrantCodesToast,
	react: React,
	events: {
		onDismiss: "dismiss",
	},
});

export const ToastContainer = createComponent({
	tagName: "grantcodes-toast-container",
	elementClass: GrantCodesToastContainer,
	react: React,
});

export const Tooltip = createComponent({
	tagName: "grantcodes-tooltip",
	elementClass: GrantCodesTooltip,
	react: React,
});
