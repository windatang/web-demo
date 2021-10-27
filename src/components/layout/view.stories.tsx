import styled from '@emotion/styled';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router-dom';
import { Box, Container, CssBaseline, GlobalStyles, Paper, Toolbar, } from '@mui/material';
import { css, Theme, useTheme } from '@emotion/react';

import {  withTranslation } from 'react-i18next';
import React from 'react';

import { Typography } from '@mui/material';
import { globalCss, headerToolBarData } from 'common-resources';
import { Header, HideOnScroll } from '../header';


const Style = styled.div`
  
`

const Layer2Wrap = withTranslation('common')(({t,...rest}:any) => {
    // const _headerMenuData: List<HeaderMenuItemInterface> = headerMenuData as List<HeaderMenuItemInterface>;
    // const _headerToolBarData: List<HeaderToolBarInterface> = headerToolBarData as List<HeaderToolBarInterface>;
    const selected = 'assets';
    const StylePaper = styled(Box)`
      width: 100%;
      height: 100%;
      flex: 1;
      background: var(--color-box);
      border-radius: ${({theme}) => theme.unit}px;
      padding: ${({theme}) => theme.unit * 3}px;


      .tableWrapper {
        ${({theme}) => theme.border.defaultFrame({c_key: 'default', d_R: 1})};
          // margin-top:  ${({theme}) => theme.unit * 3}px;
        // border: 1px solid #252842;
          // border-radius: ${({theme}) => theme.unit}px;
        // padding: 26px;
      }
    ` as typeof Paper;
    const hasAccount = true;
    const [showAccountInfo, setShowAccountInfo] = React.useState(hasAccount);
    const handleClick = (_event: React.MouseEvent) => {
        if (showAccountInfo) {
            // headerMenuData[ NavListIndex.layer2 ].iconBtn.view = false;
            setShowAccountInfo(false);
        } else {
            // headerMenuData[ NavListIndex.layer2 ].iconBtn.view = true;
            setShowAccountInfo(true);
        }
        _event.stopPropagation();
    }



    return <>
        <CssBaseline />
        <HideOnScroll>
            <Header headerMenuData={[]}  headerToolBarData={headerToolBarData} selected={''}/>
        </HideOnScroll>
        <Toolbar/>
        <Container maxWidth="lg">
            {/*style={{height: '100%' }}*/}
            <Box flex={1} display={'flex'} alignItems={'stretch'} flexDirection="row" marginTop={3} minWidth={800}>
                {/*<Box width={200} display={'flex'} justifyContent={'stretch'}>*/}
                {/*    <SubMenu>*/}
                {/*        <SubMenuList selected={selected} subMenu={subMenuLayer2 as any}/>*/}
                {/*    </SubMenu>*/}
                {/*</Box>*/}
                <Box flex={1} marginLeft={4} height={1600} flexDirection="column">
                    {/*<Box marginBottom={3}>*/}
                    {/*    <AssetTitleWrap/>*/}
                    {/*</Box>*/}
                    <StylePaper>
                        <Typography variant={'h5'} component={'h3'}>Orders</Typography>
                        <Box marginTop={2} className="tableWrapper">
                        </Box>
                    </StylePaper>
                </Box>
            </Box>
        </Container>
        {/*<Footer></Footer>*/}
    </>
})

const Template: Story<any> = () => {
    const theme: Theme = useTheme();
    console.log(theme.mode)
    return <> <MemoryRouter initialEntries={['/']}><GlobalStyles styles={css`
  ${globalCss({theme})};

  body:before {
    ${theme.mode === 'dark' ? `
            color: ${theme.colorBase.textPrimary};        
           
            background: var(--color-global-bg);
       ` : ''}
  }
}
`}/>
        <Style>
            <Layer2Wrap/>
        </Style>
    </MemoryRouter>
    </>
};

export default {
    title: 'components/Layout/Layer2',
    component: Layer2Wrap,
    argTypes: {},
} as Meta

export const Layer2Story = Template.bind({});
// SwitchPanel.args = {}

