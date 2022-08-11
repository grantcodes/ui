export interface PaginationProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  className: string
  previousHref?: string
  nextHref?: string
}
