// -------------------------------------------------------------------------
// Auto-generated from packages/ui/custom-elements.json
// Do not edit by hand. Regenerate with:
//   pnpm --filter @grantcodes/astro exec tsx scripts/generate-astro-typings-from-cem.ts
// -------------------------------------------------------------------------

// No top-level imports — this file must be fully self-contained so TypeScript
// can resolve it regardless of module-resolution mode.

// Astro's JSX type system checks framework-component props against an
// intersection of the component's own type AND JSX.IntrinsicAttributes.
// IntrinsicAttributes is very narrow by default, so valid Lit-element
// props (disabled, previousHref, ...) would fail the intersection.
// We augment IntrinsicAttributes with every known component prop so the
// intersection succeeds. Each prop is optional, so HTML elements that
// do not support a given prop are unaffected (their own type does not
// include it and IntrinsicAttributes is additive).
declare namespace astroHTML.JSX {
  interface IntrinsicAttributes {
    action?: string;
    active?: boolean;
    align?: string;
    alt?: string;
    avatar?: string;
    button?: string;
    "button-label"?: string;
    buttonId?: string;
    buttonLabel?: string;
    caption?: string;
    center?: boolean;
    class?: string;
    collapsed?: boolean;
    collapsible?: boolean;
    columns?: number;
    company?: string;
    containerId?: string;
    content?: string;
    cta?: string;
    current?: boolean;
    "days-label"?: string;
    description?: string;
    direction?: 'vertical' | 'horizontal';
    "directions-url"?: string;
    disabled?: boolean;
    disclaimer?: string;
    dismissable?: boolean;
    dismissible?: boolean;
    duration?: number;
    error?: string;
    eyebrow?: string;
    form?: string;
    fullscreenOnDrag?: boolean;
    hasFooter?: boolean;
    hasHeader?: boolean;
    height?: number;
    help?: string;
    hidden?: boolean | string;
    "hours-label"?: string;
    href?: string;
    id?: string;
    index?: number;
    initials?: string;
    items?: string;
    label?: string;
    lang?: string;
    language?: string;
    lat?: string;
    layout?: string;
    lng?: string;
    logos?: string;
    media?: string;
    method?: string;
    "minutes-label"?: string;
    name?: string;
    "next-href"?: string;
    nextHref?: string;
    nopad?: boolean;
    open?: boolean;
    page?: number;
    pages?: number;
    panelId?: string;
    "past-message"?: string;
    placeholder?: string;
    placement?: string;
    position?: 'left' | 'right';
    "previous-href"?: string;
    previousHref?: string;
    "primary-action"?: string;
    primaryAction?: string;
    reverse?: boolean;
    role?: string;
    "secondary-action"?: string;
    secondaryAction?: string;
    "seconds-label"?: string;
    separator?: string;
    "show-seconds"?: boolean;
    size?: string;
    slot?: string;
    src?: string;
    sticky?: boolean;
    style?: string | Record<string, unknown>;
    subtitle?: string;
    tabindex?: number | string;
    target?: string;
    text?: string;
    theme?: string;
    thumbnail?: string;
    tiers?: string;
    title?: string;
    transparent?: boolean;
    type?: string;
    value?: string;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
    width?: number;
    zoom?: number;
  }
}

// -------------------------------------------------------------------------
// Component type declarations
// -------------------------------------------------------------------------

declare module "@grantcodes/ui/components/accordion/index.js" {

  export interface AccordionProps {
    [key: string]: unknown;
  }

  export function GrantCodesAccordion(props: AccordionProps & import("astro").AstroBuiltinAttributes): any;

  export interface AccordionItemProps {
    open?: boolean;
    title?: string;
  }

  export function GrantCodesAccordionItem(props: AccordionItemProps & import("astro").AstroBuiltinAttributes): any;

  export default GrantCodesAccordion;
  export { GrantCodesAccordion };
  export { GrantCodesAccordionItem };
}

declare module "@grantcodes/ui/components/app-bar/index.js" {

  export interface AppBarProps {
    sticky?: boolean;
    transparent?: boolean;
  }

  export function GrantCodesAppBar(props: AppBarProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesAppBar };
}

declare module "@grantcodes/ui/components/avatar/index.js" {

  export interface AvatarProps {
    alt?: string;
    initials?: string;
    name?: string;
    size?: string;
    src?: string;
  }

  export function GrantCodesAvatar(props: AvatarProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesAvatar };
}

declare module "@grantcodes/ui/components/badge/index.js" {

  export interface BadgeProps {
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  }

  export function GrantCodesBadge(props: BadgeProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesBadge };
}

declare module "@grantcodes/ui/components/breadcrumb/index.js" {

  export interface BreadcrumbProps {
    separator?: string;
  }

  export function GrantCodesBreadcrumb(props: BreadcrumbProps & import("astro").AstroBuiltinAttributes): any;

  export interface BreadcrumbItemProps {
    current?: boolean;
    href?: string;
  }

  export function GrantCodesBreadcrumbItem(props: BreadcrumbItemProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesBreadcrumb };
  export { GrantCodesBreadcrumbItem };
}

declare module "@grantcodes/ui/components/button-group/index.js" {

  export interface ButtonGroupProps {
    [key: string]: unknown;
  }

  export function GrantCodesButtonGroup(props: ButtonGroupProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesButtonGroup };
}

declare module "@grantcodes/ui/components/button/index.js" {

  export interface ButtonProps {
    disabled?: boolean;
    form?: string;
    href?: string;
    name?: string;
    type?: string;
    value?: string;
  }

  export function GrantCodesButton(props: ButtonProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesButton };
}

declare module "@grantcodes/ui/components/card/index.js" {

  export interface CardProps {
    hasFooter?: boolean;
    hasHeader?: boolean;
  }

  export function GrantCodesCard(props: CardProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesCard };
}

declare module "@grantcodes/ui/components/code-preview/index.js" {

  export interface CodePreviewProps {
    language?: string;
    theme?: string;
  }

  export function GrantCodesCodePreview(props: CodePreviewProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesCodePreview };
}

declare module "@grantcodes/ui/components/container/index.js" {

  export interface ContainerProps {
    align?: string;
    nopad?: boolean;
  }

  export function GrantCodesContainer(props: ContainerProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesContainer };
}

declare module "@grantcodes/ui/components/countdown/index.js" {

  export interface CountdownProps {
    "days-label"?: string;
    "hours-label"?: string;
    "minutes-label"?: string;
    "past-message"?: string;
    "seconds-label"?: string;
    "show-seconds"?: boolean;
    target?: string;
  }

  export function GrantCodesCountdown(props: CountdownProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesCountdown };
}

declare module "@grantcodes/ui/components/cta/index.js" {

  export interface CtaProps {
    align?: string;
    eyebrow?: string;
    primaryAction?: string;
    "primary-action"?: string;
    secondaryAction?: string;
    "secondary-action"?: string;
    text?: string;
    title?: string;
  }

  export function GrantCodesCta(props: CtaProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesCta };
}

declare module "@grantcodes/ui/components/dialog/index.js" {

  export interface DialogProps {
    dismissible?: boolean;
    open?: boolean;
  }

  export function GrantCodesDialog(props: DialogProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesDialog };
}

declare module "@grantcodes/ui/components/dropdown/index.js" {

  export interface DropdownProps {
    open?: boolean;
    placement?: string;
  }

  export function GrantCodesDropdown(props: DropdownProps & import("astro").AstroBuiltinAttributes): any;

  export interface DropdownItemProps {
    disabled?: boolean;
  }

  export function GrantCodesDropdownItem(props: DropdownItemProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesDropdown };
  export { GrantCodesDropdownItem };
}

declare module "@grantcodes/ui/components/dropzone/index.js" {

  export interface DropzoneProps {
    fullscreenOnDrag?: boolean;
  }

  export function GrantCodesDropzone(props: DropzoneProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesDropzone };
}

declare module "@grantcodes/ui/components/feature-list/index.js" {

  export interface FeatureListProps {
    columns?: number;
    items?: string;
    subtitle?: string;
    title?: string;
  }

  export function GrantCodesFeatureList(props: FeatureListProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesFeatureList };
}

declare module "@grantcodes/ui/components/footer/index.js" {

  export interface FooterColumnProps {
    [key: string]: unknown;
  }

  export function GrantCodesFooterColumn(props: FooterColumnProps & import("astro").AstroBuiltinAttributes): any;

  export interface FooterProps {
    columns?: number;
  }

  export function GrantCodesFooter(props: FooterProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesFooterColumn };
  export { GrantCodesFooter };
}

declare module "@grantcodes/ui/components/form-field/index.js" {

  export interface FormFieldProps {
    direction?: 'vertical' | 'horizontal';
    error?: string;
    help?: string;
    label?: string;
  }

  export function GrantCodesFormField(props: FormFieldProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesFormField };
}

declare module "@grantcodes/ui/components/gallery/index.js" {

  export interface GalleryProps {
    variant?: string;
  }

  export function GrantCodesGallery(props: GalleryProps & import("astro").AstroBuiltinAttributes): any;

  export interface GalleryImageProps {
    alt?: string;
    caption?: string;
    height?: number;
    src?: string;
    thumbnail?: string;
    width?: number;
  }

  export function GrantCodesGalleryImage(props: GalleryImageProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesGallery };
  export { GrantCodesGalleryImage };
}

declare module "@grantcodes/ui/components/hero/index.js" {

  export interface HeroProps {
    button?: string;
    center?: boolean;
    href?: string;
    size?: string;
    subtitle?: string;
    title?: string;
  }

  export function GrantCodesHero(props: HeroProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesHero };
}

declare module "@grantcodes/ui/components/icon/index.js" {

  export interface IconProps {
    [key: string]: unknown;
  }

  export function GrantCodesIcon(props: IconProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesIcon };
}

declare module "@grantcodes/ui/components/loading/index.js" {

  export interface LoadingProps {
    [key: string]: unknown;
  }

  export function GrantCodesLoading(props: LoadingProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesLoading };
}

declare module "@grantcodes/ui/components/logo-cloud/index.js" {

  export interface LogoCloudProps {
    logos?: string;
    title?: string;
  }

  export function GrantCodesLogoCloud(props: LogoCloudProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesLogoCloud };
}

declare module "@grantcodes/ui/components/map/index.js" {

  export interface MapProps {
    "directions-url"?: string;
    height?: string;
    label?: string;
    lat?: string;
    lng?: string;
    zoom?: number;
  }

  export function GrantCodesMap(props: MapProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesMap };
}

declare module "@grantcodes/ui/components/media-text/index.js" {

  export interface MediaTextProps {
    cta?: string;
    media?: string;
    reverse?: boolean;
    text?: string;
    title?: string;
  }

  export function GrantCodesMediaText(props: MediaTextProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesMediaText };
}

declare module "@grantcodes/ui/components/newsletter/index.js" {

  export interface NewsletterProps {
    action?: string;
    buttonLabel?: string;
    "button-label"?: string;
    disclaimer?: string;
    method?: string;
    placeholder?: string;
    text?: string;
    title?: string;
  }

  export function GrantCodesNewsletter(props: NewsletterProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesNewsletter };
}

declare module "@grantcodes/ui/components/notice/index.js" {

  export interface NoticeProps {
    dismissable?: boolean;
    title?: string;
    variant?: string;
  }

  export function GrantCodesNotice(props: NoticeProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesNotice };
}

declare module "@grantcodes/ui/components/pagination/index.js" {

  export interface PaginationProps {
    nextHref?: string;
    "next-href"?: string;
    page?: number;
    pages?: number;
    previousHref?: string;
    "previous-href"?: string;
  }

  export function GrantCodesPagination(props: PaginationProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesPagination };
}

declare module "@grantcodes/ui/components/person/index.js" {

  export interface PersonProps {
    alt?: string;
    avatar?: string;
    company?: string;
    name?: string;
    role?: string;
    size?: string;
  }

  export function GrantCodesPerson(props: PersonProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesPerson };
}

declare module "@grantcodes/ui/components/pricing/index.js" {

  export interface PricingProps {
    subtitle?: string;
    tiers?: string;
    title?: string;
  }

  export function GrantCodesPricing(props: PricingProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesPricing };
}

declare module "@grantcodes/ui/components/sidebar/index.js" {

  export interface SidebarProps {
    collapsed?: boolean;
    collapsible?: boolean;
    position?: 'left' | 'right';
    width?: string;
  }

  export function GrantCodesSidebar(props: SidebarProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesSidebar };
}

declare module "@grantcodes/ui/components/stats/index.js" {

  export interface StatsProps {
    columns?: number;
    items?: string;
    title?: string;
  }

  export function GrantCodesStats(props: StatsProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesStats };
}

declare module "@grantcodes/ui/components/tabs/index.js" {

  export interface TabProps {
    active?: boolean;
    buttonId?: string;
    containerId?: string;
    content?: string;
    index?: number;
    label?: string;
    panelId?: string;
  }

  export function GrantCodesTab(props: TabProps & import("astro").AstroBuiltinAttributes): any;

  export interface TabsProps {
    label?: string;
  }

  export function GrantCodesTabs(props: TabsProps & import("astro").AstroBuiltinAttributes): any;

  export interface TabsButtonProps {
    active?: boolean;
    buttonId?: string;
    containerId?: string;
    content?: string;
    index?: number;
    label?: string;
    panelId?: string;
  }

  export function GrantCodesTabsButton(props: TabsButtonProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesTab };
  export { GrantCodesTabs };
  export { GrantCodesTabsButton };
}

declare module "@grantcodes/ui/components/testimonials/index.js" {

  export interface TestimonialsProps {
    items?: string;
    layout?: string;
    title?: string;
  }

  export function GrantCodesTestimonials(props: TestimonialsProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesTestimonials };
}

declare module "@grantcodes/ui/components/toast/index.js" {

  export interface ToastProps {
    dismissible?: boolean;
    duration?: number;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    title?: string;
    variant?: 'info' | 'success' | 'warning' | 'error';
  }

  export function GrantCodesToast(props: ToastProps & import("astro").AstroBuiltinAttributes): any;

  export interface ToastContainerProps {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  }

  export function GrantCodesToastContainer(props: ToastContainerProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesToast };
  export { GrantCodesToastContainer };
}

declare module "@grantcodes/ui/components/tooltip/index.js" {

  export interface TooltipProps {
    description?: string;
    label?: string;
  }

  export function GrantCodesTooltip(props: TooltipProps & import("astro").AstroBuiltinAttributes): any;

  export { GrantCodesTooltip };
}
