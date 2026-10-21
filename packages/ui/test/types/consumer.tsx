import { useRef } from 'react';
import type { Plugin } from 'vite';
import type { GrantCodesDialog, GrantCodesPopover } from '@grantcodes/ui';
import { Dialog, Dropdown, Popover } from '@grantcodes/ui/react';
import { GrantCodesDialog as DeepGrantCodesDialog } from '@grantcodes/ui/components/dialog/index.js';
import { GrantCodesPopover as DeepGrantCodesPopover } from '@grantcodes/ui/components/popover/index.js';
import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';

const plugin: Plugin = cssImportAttributes();

export function Consumer() {
  const dialogRef = useRef<GrantCodesDialog>(null);
  const popoverRef = useRef<GrantCodesPopover>(null);

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
      {/* Invalid dialog props must be rejected. */}
      {/* @ts-expect-error invalid is not a dialog property */}
      <Dialog invalid />
      {/* @ts-expect-error invalid is not a popover property */}
      <Popover invalid />
      {/* @ts-expect-error placement is a closed union */}
      <Popover placement="left" />
    </>
  );
}

void plugin;
void DeepGrantCodesDialog;
void DeepGrantCodesPopover;
