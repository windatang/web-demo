import {  MenuItemProps as muMenuItemProps ,LinkProps} from '@mui/material';
import { List } from 'immutable';

export type HeadMenuType<I extends BasicHeaderItem> = {
    children?: React.ElementType<any> | JSX.Element,
    className?: string,
    allowTrade?:object,
    renderList?: (props: { handleListKeyDown: ({...rest}) => any }) => any,
    onOpen?: boolean,
    selected?:boolean,
    setOnOpen?: () => {},
    toggle?: boolean,
    style?: any,
    layer?: number
} & I

export type MenuItemLink<I extends BasicHeaderItem> = HeadMenuType<I> & {
    className?: string,
    allowTrade:any,
    handleListKeyDown?: () => any,
    layer: number,
} & LinkProps;

export type MenuItemProps<I extends BasicHeaderItem> = HeadMenuType<I> & {
    className?: string,
    handleListKeyDown?: () => any,
    layer: number,
} & muMenuItemProps;

export type MuiMenuItemProps = muMenuItemProps & {
    withnocheckicon?: 'true' | 'false' | undefined
}
export type  SubMenuListProps<I> = {
    selected: string,
    subMenu: { [ key: string ]: List<I> }
}
export type BasicListItem = {
    label: {
        id: string,
        [ key: string ]: any,
    },
    router?: { path: string, [ key: string ]: any },
}

export type BasicHeaderItem = {
    status?: 'disabled' | 'hidden' | 'default'
} & BasicListItem