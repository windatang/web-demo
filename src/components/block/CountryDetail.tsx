import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { WithTranslation, withTranslation } from 'react-i18next';
import { CountryCardDetail } from './Interface';
import React from 'react';
import { Button } from '../basic-lib';
import { Country, useCountry } from '../../stores';
import { useHistory } from 'react-router-dom';

// const CardStyle = styled(Card)`
//   background: var(--color-global-bg);
//   width: 100%;
//   cursor: pointer;
//   height: 0;
//   padding: 0;
//   padding-bottom: calc(60% + 80px);
//   position: relative;
//
//   img {
//     //width: 100%;
//     object-fit: contain
//   }
//
//   //margin: 50px;
// ` as typeof Card
const BoxDetail = styled(Box)`
  background: var(--color-global-bg);

  img {
    object-fit: contain
  }
` as typeof Box
const BoxStyle = styled(Box)`
  background: var(--color-global-bg);
  column-count: 2;
  column-gap: ${({theme}) => theme.unit * 3}px;

  img {
    object-fit: contain
  }
` as typeof Box
const BtnBorders = withTranslation('common')(React.memo(({simple}: { simple: string }) => {
    const [data, setData] = React.useState<Country | undefined>(undefined);
    const history = useHistory()
    const {countryList} = useCountry()
    React.useEffect(() => {
        btnInfoCallBack()
    }, [])
    const btnInfoCallBack = React.useCallback(async () => {
        // const data = await fetch(`https://restcountries.com/v3.1/name/${simple}`).then(results => results.json());
       const data = countryList?.find((item)=>item.cca3 === simple)
        if(data){
            setData(data)
        }
       
    }, [])
    return <>{data ? <Button variant={'outlined'} size={'medium'} color={'secondary'} onClick={() => {
        history.push(`/detail?country=${data.name.common}`)
    }}
    >{data.name.common}</Button> : <></>}</>
}))
//flex={'1 1 120%'}  className={'MuiPaper-elevation2'}
export const CountryDetail = withTranslation('common')(React.memo(({
                                                                         t,
                                                                         item,
                                                                         ...rest
                                                                     }: CountryCardDetail & WithTranslation) => {
    return <>
        <BoxDetail display={'flex'} width={570} height={570} margin={1} marginTop={-4} alignItems={'center'}
                   justifyContent={'center'}>
            <img src={item.flags?.svg} width={'100%'} height={'100%'}/> </BoxDetail>
        <Box flex={1} marginLeft={2} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
            <Box paddingX={3} display={'flex'} flexDirection={'column'}>
                <Typography
                    color={'textPrimary'}
                    variant={'h4'}
                    component={'h3'} marginY={3}>{item.name.common}</Typography>
                <BoxStyle>
                    <Typography color={'--color-text-primary'} component={'p'} display={'flex'} marginBottom={1}>
                        <Typography color={'textPrimary'}>{t('labelNativeName')}: </Typography>
                        <Typography color={'textSecondary'} paddingLeft={1}>{
                            item.name.nativeName && Reflect.ownKeys(item.name.nativeName).map((ele) => item.name.nativeName[ ele as string ].official).join(',')
                        }</Typography>
                    </Typography>
                    <Typography color={'--color-text-primary'} component={'p'} display={'flex'} marginBottom={1}>
                        <Typography color={'textPrimary'}>{t('labelPopulation')}: </Typography>
                        <Typography color={'textSecondary'}
                                    paddingLeft={1}>{item.population.toLocaleString('en')}</Typography>
                    </Typography>
                    <Typography color={'--color-text-primary'} component={'p'} display={'flex'} marginBottom={1}>
                        <Typography color={'textPrimary'}>{t('labelRegion')}: </Typography>
                        <Typography color={'textSecondary'} paddingLeft={1}>{item.region}</Typography>
                    </Typography>
                    <Typography color={'--color-text-primary'} component={'p'} display={'flex'} marginBottom={1}>
                        <Typography color={'textPrimary'}>{t('labelSubRegion')}: </Typography>
                        <Typography color={'textSecondary'} paddingLeft={1}>{item.subregion}</Typography>
                    </Typography>
                    <Typography color={'--color-text-primary'} component={'p'} display={'flex'} marginY={1 / 2}>
                        <Typography color={'textPrimary'}>{t('labelCapital')}: </Typography>
                        <Typography color={'textSecondary'} paddingLeft={1}>{item.capital[ 0 ]}</Typography>
                    </Typography>
                    <Typography color={'--color-text-primary'} component={'p'} display={'flex'} marginY={1 / 2}>
                        <Typography color={'textPrimary'}>{t('labelTotalLevelDomain')}: </Typography>
                        <Typography color={'textSecondary'} paddingLeft={1}>{item.tld.join(',')}</Typography>
                    </Typography>
                    <Typography color={'--color-text-primary'} component={'p'} display={'flex'} marginY={1 / 2}>
                        <Typography color={'textPrimary'}>{t('labelCurrencies')}: </Typography>
                        <Typography color={'textSecondary'} paddingLeft={1}>{
                            item.currencies && Reflect.ownKeys(item.currencies).join(',')}</Typography>
                    </Typography>
                    <Typography color={'--color-text-primary'} component={'p'} display={'flex'} marginY={1 / 2}>
                        <Typography color={'textPrimary'}>{t('labelLanguages')}: </Typography>
                        <Typography color={'textSecondary'} paddingLeft={1}>{
                            item.languages && Reflect.ownKeys(item.languages).map((ele) => item.languages[ ele as string ]).join(',')}
                        </Typography>
                    </Typography>
                </BoxStyle>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} marginTop={2}>
                    <Typography color={'textPrimary'}>{t('labelBorderCountry')}: </Typography>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} marginLeft={2}>
                        {item.borders.map((item, index) => {
                            return <BtnBorders key={item + index} simple={item}/>
                        })}

                    </Box>
                </Box>
            </Box>
            <Box></Box>
        </Box>
    </>
}))


