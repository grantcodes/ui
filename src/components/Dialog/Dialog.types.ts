import {
  DialogProps as DialogPrimitiveProps,
  DialogContentProps as DialogPrimitiveContentProps,
} from '@radix-ui/react-dialog'
import { CardActionsProps } from '../Card/Card.types';

export interface DialogProps extends DialogPrimitiveProps {}

export interface DialogContentProps extends DialogPrimitiveContentProps {}

export interface DialogActionsProps extends CardActionsProps
