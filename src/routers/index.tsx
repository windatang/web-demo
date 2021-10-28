import { Route, Switch, useLocation } from 'react-router-dom'
import React from 'react';
import { headerMenuData, headerRoot, headerToolBarData, SagaStatus } from 'common-resources';
import { Header, HideOnScroll } from '../components';
import { Container } from '@mui/material';
import { DetailPage, MainPage } from 'page';


// const ContentWrap = ({children}: React.PropsWithChildren<any>) => {
//     return <>
//
//         <Container maxWidth="lg"
//                                                          style={{
//                                                              minHeight: `calc(100% - ${LAYOUT.HEADER_HEIGHT}px - 32px)`,
//                                                              display: 'flex',
//                                                              flexDirection: 'column'
//                                                          }}>
//         <Box display={'flex'} flex={1} alignItems={'stretch'} flexDirection={'row'} marginTop={3}>
//             {children}
//         </Box>
//     </Container></>
// }

const RouterView = ({state}: { state: keyof typeof SagaStatus }) => {

    const location = useLocation()

    // React.useEffect(() => {
    //     if(location.pathname){
    //         const pathname = location.pathname;
    //         if(pathname.match(/(trading\/lite)|(landing-pag)/ig))  {
    //             store.dispatch(resetSwap(undefined))
    //         }
    //         if(pathname.match(/(liquidity\/pools)/ig))  {
    //             store.dispatch(resetAmmPool(undefined))
    //         }
    //     }
    // }, [location?.pathname])

    // const {allowTrade} = useSystem();

    return <>
        <HideOnScroll window={undefined}/>
        {/*<Header isWrap={false}*/}
        {/*        headerMenuData={headerMenuData}*/}
        {/*        headerToolBarData={headerToolBarData}*/}
        {/*        selected={location.pathname === '/' ? headerRoot : location.pathname}/>*/}
        <Container maxWidth="lg">
            <Switch>
                <Route exact path='/'>
                    <MainPage/>
                </Route>
                <Route path='/detail(/:country)'>
                    <DetailPage/>
                </Route>


            </Switch>
        </Container>
    </>
}

export default RouterView
