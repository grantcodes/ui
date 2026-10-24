import { useRef } from 'react';
import type { Plugin } from 'vite';
import type { GrantCodesDialog, GrantCodesPopover, GrantCodesSidebar } from '@grantcodes/ui';
import { Dialog, Dropdown, Popover, Sidebar, SidebarToggle } from '@grantcodes/ui/react';
import { GrantCodesDialog as DeepGrantCodesDialog } from '@grantcodes/ui/components/dialog/index.js';
import { GrantCodesPopover as DeepGrantCodesPopover } from '@grantcodes/ui/components/popover/index.js';
import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';

const plugin: Plugin = cssImportAttributes();

export function Consumer() {
  const dialogRef = useRef<GrantCodesDialog>(null);
  const popoverRef = useRef<GrantCodesPopover>(null);
  const sidebarRef = useRef<GrantCodesSidebar>(null);

  return (
    <>
      <Dialog ref={dialogRef} dismissible>
        Dialog content
      </Dialog>
      <Dropdown onToggle={(event) => event.preventDefault()}>Toggle content</Dropdown>
      <Popover
        ref={popoverRef}
        open={false}
        placement="top-end"
        onToggle={(event) => event.detail.open}
      >
        <button slot="trigger" type="button">
          Open
        </button>
        <button type="button">Save</button>
      </Popover>
      <Sidebar
        ref={sidebarRef}
        controlled
        open={false}
        onDrawerToggle={(event) => event.detail.open}
      >
        <h2 slot="header">Together</h2>
        <nav slot="content">Navigation</nav>
      </Sidebar>
      <SidebarToggle for="navigation">
        <button type="button" aria-label="Open navigation" />
      </SidebarToggle>
      {/* Invalid dialog props must be rejected. */}
      {/* @ts-expect-error invalid is not a dialog property */}
      <Dialog invalid />
      {/* @ts-expect-error invalid is not a popover property */}
      <Popover invalid />
      {/* @ts-expect-error placement is a closed union */}
      <Popover placement="left" />
      {/* @ts-expect-error collapsed was removed from Sidebar */}
      <Sidebar collapsed />
    </>
  );
}

void plugin;
void DeepGrantCodesDialog;
void DeepGrantCodesPopover;
