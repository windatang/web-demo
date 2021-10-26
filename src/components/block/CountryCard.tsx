import styled from '@emotion/styled';
import { Box, Grid, Card, Typography } from '@mui/material';
import { WithTranslation, withTranslation } from 'react-i18next';
import { CountryCardProps } from './Interface';

const CardStyle = styled(Card)`
  background: var(--color-global-bg);
  width: 100%;
  cursor: pointer;
  height: 0;
  padding: 0;
  padding-bottom: calc(100% + 80px);
  position: relative;

  img {
    //width: 100%;
    object-fit: contain
  }

  //margin: 50px;
` as typeof Card
const BoxNFT = styled(Box)`
  background: var(--color-global-bg);

  img {
    object-fit: contain
  }
` as typeof Box

const CountryCard = withTranslation(['common'])(({t, onDetail,item, ...rest} & CountryCardProps & WithTranslation)=>{
    <Grid item xs={12} md={6} lg={4} flex={'1 1 120%'}>
        <CardStyle sx={{maxWidth: 345}}  onClick={() => {
            onDetail(item)
        }}>
            <Box position={'absolute'}
                 width={'100%'} height={'100%'} display={'flex'} flexDirection={'column'}
                 justifyContent={'space-between'}>
                <Box flex={1} style={{background: "var(--field-opacity)"}} display={'flex'}
                     alignItems={'center'}
                     justifyContent={'center'}>
                    <img src={'http://static.loopring.io/assets/images/vips/SUPERVIP.png'}/></Box>
                <Box padding={2} height={80}>
                    <Typography
                        color={'text.secondary'}
                        component={'h6'}>{item.name}</Typography>
                    <Typography color={'--color-text-primary'} component={'p'}>
                        ID: #{item.id}
                    </Typography>
                </Box>
            </Box>
        </CardStyle>
    </Grid>
})