import React from 'react';
import {
    // Box, BoxProps, Button, ButtonProps,
    InputProps } from '@mui/material';
// import styled from '@emotion/styled';
// import CurrencyInput from 'react-currency-input-field';


export enum  InputSize {
    middle='middle',
    small='small'
}
export type useFocusRefProps<I> = {
    selected?: I | null | undefined,
    isFocus?: boolean,
    callback?: (props?: any) => void,

}




// export type {IBData, CoinMap, CoinInfo, coinType}