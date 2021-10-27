import styled from '@emotion/styled';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router-dom';
import { Grid } from '@mui/material';

import { withTranslation } from 'react-i18next';

import { CountryCard } from './CountryCard';
import React from 'react';


const Style = styled.div`
  background: var(--color-global-bg);
  height: 100%;
  flex: 1
`



const CountryCardWrap = () => {
    const ref = React.createRef();

    return <CountryCard ref={ref} />
}



const Template: Story<any> = withTranslation('common')((...rest) => {
    return <Style>
        <h4>Country Card</h4>



    </Style>
}) as Story<any>;

export default {
    title: 'components/Block',
    component: CountryCardWrap,
    argTypes: {},
} as Meta
//@ts-ignore
export const BlockStory = Template.bind({});
// SwitchPanel.args = {}

