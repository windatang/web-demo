import { withTranslation, WithTranslation } from 'react-i18next';
import { Grid,FormControl,InputLabel, Select,SelectChangeEvent } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Button, CountryCard, CountryDetail, InputSearch, MenuItem } from '../components';
import React from 'react';
import * as _ from 'lodash'
import { Country, useCountry } from '../stores';
import { Region, RegionList } from '../common-resources';

export const MainPage = withTranslation('common')(({t}:& WithTranslation)=>{
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

                 <InputSearch  onChange={()=>{}} />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">All</InputLabel>
                    <Select
                        // native={}
                        labelId="select-label"
                        value={region}
                        label="Age"
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