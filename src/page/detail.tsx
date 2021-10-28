import { WithTranslation, withTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button, CountryDetail } from 'components';
import React from 'react';
import { Country, useCountry } from '../stores';
import { Box, Grid } from '@mui/material';

export const DetailPage = withTranslation('common')(({t}:{} & WithTranslation)=>{
    const match: any = useRouteMatch("/detail/:country");
    
    const history = useHistory();
    const country = match?.params.country ?? 'Malaysia';
    const  {countryMap} =  useCountry()
    const [countryItem,setCountryItem]  = React.useState<Country>(countryMap[country]??countryMap['Malaysia'])
    React.useEffect(()=>{
        setCountryItem(countryMap[country]??countryMap['Malaysia'])
    },[country])


    return <Box flex={1} height={'100%'} width={'100%'}>
        <Grid container marginY={3} flex={1} >
            <Grid item xs={12}>
                <Button variant={'contained'} size={'medium'} color={'primary'}
                        onClick={()=>history.goBack()}
                >{t('labelBack')}</Button>
            </Grid>
            <Grid item xs={12} marginTop={2}>
                <CountryDetail item={countryItem}/>
            </Grid>
        </Grid>
    </Box>
    
})
