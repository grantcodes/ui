import { useRef } from 'react';
import type { Plugin } from 'vite';
import type { GrantCodesDialog } from '@grantcodes/ui';
import { Dialog, Dropdown } from '@grantcodes/ui/react';
import { GrantCodesDialog as DeepGrantCodesDialog } from '@grantcodes/ui/components/dialog/index.js';
import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';

const plugin: Plugin = cssImportAttributes();

export function Consumer() {
  const dialogRef = useRef<GrantCodesDialog>(null);

  return (
    <>
      <Dialog ref={dialogRef} dismissible>
        Dialog content
      </Dialog>
      <Dropdown onToggle={(event) => event.preventDefault()}>Toggle content</Dropdown>
      {/* Invalid dialog props must be rejected. */}
      {/* @ts-expect-error invalid is not a dialog property */}
      <Dialog invalid />
    </>
  );
}

void plugin;
void DeepGrantCodesDialog;
