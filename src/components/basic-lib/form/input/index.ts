import styled from '@emotion/styled';
import { IconButton, TextField as MuTextField } from '@mui/material';

export * from "./Interface"
export * from './InputSearch'
export const TextField = styled(MuTextField)`
  label + & {
    //margin-top: 24px;
    margin-top: 0;
  }

  && {
    .MuiSelect-nativeInput + svg {
      position: absolute;
      right: .4rem;
      top: ${({theme}) => theme.unit}px;
      color: var(--color-text-secondary);
    }

    &:not(.MuiFormControl-fullWidth) {
      max-width: 260px;

    }

    text-overflow: fade();
  }

  &:focus {
    ${({theme}) => theme.border.defaultFrame({c_key: 'focus', d_R: 0.5})};
    outline: transparent;
  }
` as typeof MuTextField;


export const IconClearStyled = styled(IconButton)`
  position: absolute;
  top: 20px;
  right: 4px;
` as typeof IconButton