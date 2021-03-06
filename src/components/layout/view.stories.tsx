import styled from '@emotion/styled';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MemoryRouter, useHistory } from 'react-router-dom';
import {
    Box,
    Container,
    CssBaseline,
    FormControl,
    GlobalStyles,
    Grid, InputLabel,
    Paper, Select,
    SelectChangeEvent,
    Toolbar,
} from '@mui/material';
import { css, Theme, useTheme } from '@emotion/react';

import { WithTranslation, withTranslation } from 'react-i18next';
import React from 'react';

import { Typography } from '@mui/material';
import { globalCss, headerToolBarData, Region, RegionList } from 'common-resources';
import { Header, HideOnScroll } from '../header';
import { Country, useCountry } from '../../stores';
import * as _ from 'lodash';
import { InputSearch, MenuItem } from '../basic-lib';
import { CountryCard } from '../block';


const Style = styled.div`
  
`
export const MainPageWrap = withTranslation('common')(({t}:& WithTranslation)=>{
    const {countryList,region:regionMap} = useCountry();
    const [region, setRegion] = React.useState<Region|'All'>('All');
    const history = useHistory()
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [countryViewList, setCountryViewList] = React.useState<Country[]>(countryList??[])
    const handleFilterChange  = React.useCallback(_.debounce(({searchValue, region}:{searchValue:string, region:Region|'All'}) => {
        let list = (region && region !=='All') ?regionMap[region]: countryList;
        list = list?.filter((item)=>RegExp(searchValue,'i').test(item.name.common)) ;
        setCountryViewList(list??[])
    }, 200), []);
    const  handlerRegionChange = React.useCallback((event: SelectChangeEvent) => {
        // @ts-ignore
        setRegion(event.target.value as string);
        handleFilterChange({searchValue, region:event.target.value as any})
    },[searchValue,]);
    const handleSearchChange = React.useCallback((value) => {
        setSearchValue(value)
        handleFilterChange({searchValue:value, region})
    }, [handleFilterChange,region])
    // const [search ,setSearch] = React.useState('')
    return  <>
        <Grid container>
            <Grid item xs={12} md={6}>
                <InputSearch value={searchValue} placeholder={t('labelSearchForCountry')} onChange={handleSearchChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">All</InputLabel>
                    <Select
                        // native={}
                        labelId="select-label"
                        value={region}
                        // label="Age"
                        onChange={handlerRegionChange}
                    >
                        <MenuItem value={'All'} >All</MenuItem>
                        {RegionList.map((item)=>{
                            return   <MenuItem value={item} key={item}>{item}</MenuItem>
                        },[])}
                        {/*<MenuItem value={10}>Ten</MenuItem>*/}
                        {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                        {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                    </Select>
                </FormControl>

            </Grid>




            {/*<CountryDetail item={countryItem}/>*/}
        </Grid>
        <Grid container spacing={2}>
            {countryViewList.map((item:Country,index:number)=>{
                <Grid item xs={12} md={4} lg={3}  key={item.name.common + index}>
                    <CountryCard onDetail={
                        () => { history.push(`/detail/${item.name.common}`)}
                    } item={item}/>
                </Grid>
            })}
        </Grid>

    </>
})
const Layer2Wrap = withTranslation('common')(({t,...rest}:any) => {
    // const _headerMenuData: List<HeaderMenuItemInterface> = headerMenuData as List<HeaderMenuItemInterface>;
    // const _headerToolBarData: List<HeaderToolBarInterface> = headerToolBarData as List<HeaderToolBarInterface>;


    return <>
        <CssBaseline />
        <HideOnScroll>
            <Header headerMenuData={[]}  headerToolBarData={headerToolBarData} selected={''}/>
        </HideOnScroll>
        <Toolbar/>
        <Container maxWidth="lg">
            {/*style={{height: '100%' }}*/}
            <MainPageWrap/>
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

