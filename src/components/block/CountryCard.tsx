import styled from '@emotion/styled';
import { Box, Grid, Card, Typography } from '@mui/material';
import { WithTranslation, withTranslation } from 'react-i18next';
import { CountryCardProps } from './Interface';

const CardStyle = styled(Card)`
  background: var(--color-box);
  padding-left: 0;
  padding-top:0;
  padding-right: 0;
  
  .card-image{
    overflow:hidden;
    width: 100%;
    cursor: pointer;
    height: 0;
    padding: 0;
    padding-bottom: calc(60% );
    position: relative;
    img {
      //width: 100%;
      object-fit: contain
    }
  }
  

  //margin: 50px;
` as typeof Card


//flex={'1 1 120%'}  className={'MuiPaper-elevation2'}
export const CountryCard = withTranslation(['common'])(({t, onDetail,item, ...rest} : CountryCardProps & WithTranslation)=>{
  return   <CardStyle sx={{minWidth: 280}}   onClick={() => {
            onDetail(item)
        }}>
            <Box width={'calc(100% - 24px)'} className={'card-image'}  display={'flex'} flexDirection={'column'}
                 justifyContent={'space-between'}>
                <Box  position={'absolute'}   flex={1} style={{background: "var(--field-opacity)"}} display={'flex'}
                     alignItems={'center'}
                     justifyContent={'center'}>
                    <img src={item.flags?.svg} width={'100%'} height={'100%'}/>
                </Box>
            </Box>
                <Box paddingX={3}   display={'flex'} flexDirection={'column'}>
                    <Typography
                        color={'textPrimary'}
                        variant={'h4'}
                        component={'h3'} marginY={3}>{item.name.common}</Typography>

                    <Typography color={'--color-text-primary'} component={'p'} display={'inline-flex'} marginBottom={1}>
                       <Typography color={'textPrimary'}>{t('labelPopulation')}: </Typography>
                       <Typography color={'textSecondary'} paddingLeft={1}>{item.population.toLocaleString('en')}</Typography>
                    </Typography>
                    <Typography color={'--color-text-primary'} component={'p'} display={'inline-flex'}  marginBottom={1}>
                        <Typography color={'textPrimary'}>{t('labelRegion')}: </Typography>
                        <Typography color={'textSecondary'} paddingLeft={1}>{item.region}</Typography>
                    </Typography>
                    <Typography color={'--color-text-primary'} component={'p'} display={'inline-flex'} marginY={1/2}>
                        <Typography color={'textPrimary'}>{t('labelCapital')}: </Typography>
                        <Typography color={'textSecondary'} paddingLeft={1}>{item.capital?.length&&item.capital[0]}</Typography>
                    </Typography>
                </Box>
            {/*</Box>*/}
        </CardStyle>
} )