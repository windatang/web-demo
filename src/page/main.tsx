import { withTranslation, WithTranslation } from 'react-i18next';
import { Box, FormControl, Grid, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { CountryCard, InputSearch, MenuItem } from '../components';
import React from 'react';
import * as _ from 'lodash'
import { Country, useCountry } from '../stores';
import { Region, RegionList } from '../common-resources';
import styled from '@emotion/styled';


const BoxStyle = styled(Box)`
  @media only screen and (max-width: 900px) {
    .select-region{
      justify-content: flex-start;
    }
  }
` as typeof Box
export const MainPage = withTranslation('common')(({t}: & WithTranslation) => {
    const {countryList, region: regionMap} = useCountry();
    const [region, setRegion] = React.useState<Region | 'All'>('All');
    const history = useHistory()
    const [searchValue, setSearchValue] = React.useState<string>('');

    const [countryViewList, setCountryViewList] = React.useState<Country[]>(countryList ?? [])
    const handleFilterChange = React.useCallback(_.debounce(({
                                                                 searchValue,
                                                                 region
                                                             }: { searchValue: string, region: Region | 'All' }) => {
        let list = (region && region !== 'All') ? regionMap[ region ] : countryList;
        list = list?.filter((item) => RegExp(searchValue, 'i').test(item.name.common));
        setCountryViewList(list ?? [])
    }, 200), []);
    const handlerRegionChange = React.useCallback((event: SelectChangeEvent) => {
        // @ts-ignore
        setRegion(event.target.value as string);
        handleFilterChange({searchValue, region: event.target.value as any})
    }, [searchValue,]);
    const handleSearchChange = React.useCallback((value) => {
        setSearchValue(value)
        handleFilterChange({searchValue: value, region})
    }, [handleFilterChange, region])
    // const [search ,setSearch] = React.useState('')
    return <BoxStyle flex={1} display={'flex'} flexDirection={'column'} width={'100%'}  >
        <Grid container spacing={3}  marginTop={3} >
            <Grid item xs={12} md={6} >
                <Box maxWidth={450}>
                    <InputSearch fullWidth
                                 value={searchValue} placeholder={t('labelSearchForCountry')} onChange={handleSearchChange}/>

                </Box>
            </Grid>
            <Grid  item xs={12} md={6}  className={'select-region'}  justifyContent={'flex-end'} display={'flex'}>
                <Box maxWidth={120} minWidth={120}>
                    <FormControl fullWidth  >
                        {/*<InputLabel id="demo-simple-select-label">All</InputLabel>*/}
                        <Select
                            // native={}
                            labelId="select-label"
                            value={region}
                            label="Age"
                            onChange={handlerRegionChange}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {RegionList.map((item) => {
                                return <MenuItem value={item} key={item}>{item}</MenuItem>
                            }, [])}
                            {/*<MenuItem value={10}>Ten</MenuItem>*/}
                            {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                            {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>


            {/*<CountryDetail item={countryItem}/>*/}
        </Grid>
        <Grid container spacing={2} marginY={2}>
            {countryViewList.map((item: Country, index: number) => {
                return <Grid item xs={12} md={4} lg={3} key={item.name.common + index}>
                   <Box margin={1}>
                       <CountryCard onDetail={
                           () => {
                               history.push(`/detail/${item.name.common}`)
                           }
                       } item={item}/>
                   </Box>
                </Grid>
            })}
        </Grid>


    </BoxStyle>
})