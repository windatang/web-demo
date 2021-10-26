import {  MenuItemProps as muMenuItemProps } from '@mui/material';
import { List } from 'immutable';

export type MuiMenuItemProps = muMenuItemProps & {
    withnocheckicon?: 'true' | 'false' | undefined
}
export type  SubMenuListProps<I> = {
    selected: string,
    subMenu: { [ key: string ]: List<I> }
}