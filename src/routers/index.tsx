import { Route, Switch } from 'react-router-dom'
import React from 'react';
import { Box, Container } from '@mui/material'
import { Header } from '../components/header';
import { LAYOUT, SagaStatus } from 'common-resources';


const ContentWrap = ({children}: React.PropsWithChildren<any>) => {
    return <> <Header isHideOnScroll={false}/><Container maxWidth="lg"
                                                         style={{
                                                             minHeight: `calc(100% - ${LAYOUT.HEADER_HEIGHT}px - 32px)`,
                                                             display: 'flex',
                                                             flexDirection: 'column'
                                                         }}>
        <Box display={'flex'} flex={1} alignItems={'stretch'} flexDirection={'row'} marginTop={3}>
            {children}
        </Box>
    </Container></>
}

const RouterView = ({state}: { state: keyof typeof SagaStatus }) => {

    // const location = useLocation()

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
    const proFlag = (process.env.REACT_APP_WITH_PRO && process.env.REACT_APP_WITH_PRO === 'true')
    const {tickerMap} = useTicker();
    // const {allowTrade} = useSystem();

    return <>
        <Switch>
            <Route exact path='/'>
                <Header isHideOnScroll={true}/>
            </Route>


            {/*<Route exact path='/landing-page'>*/}
            {/*    <ContentWrap>*/}
            {/*        {allowTrade?.order.enable ? <SwapPage/> : <Layer2Page/>}*/}
            {/*    </ContentWrap>*/}
            {/*</Route>*/}
            <Route exact path='/'>
                {/* <ContentWrap> */}
                {/* {allowTrade?.order.enable ? <SwapPage/> : <Layer2Page/>} */}
                {/* </ContentWrap> */}
                <Header isHideOnScroll={true}/>
                <LandPage/>
            </Route>
            {state === 'PENDING' ?
                <LoadingPage/>
                : state === 'ERROR' ? <ErrorPage {...ErrorMap.NO_NETWORK_ERROR} /> : <>

                    <Route path='/trade/lite'><ContentWrap><SwapPage/></ContentWrap></Route>
                    <Route path='/trade/lite(/:symbol)'><ContentWrap><SwapPage/></ContentWrap></Route>

                    {
                        proFlag && tickerMap && <Route path='/trade/pro'>
                          <Header isHideOnScroll={true}/>
                          <OrderbookPage/></Route>
                    }
                    {
                        proFlag && tickerMap && <Route path='/trade/pro(/:symbol)'><OrderbookPage/></Route>
                    }
                    <Route exact path='/loading'><LoadingPage/> </Route>
                    <Route exact path='/markets'><ContentWrap><QuotePage/></ContentWrap> </Route>
                    <Route exact path='/mining'><ContentWrap><MiningPage/></ContentWrap> </Route>
                    <Route exact path='/layer2'><ContentWrap><Layer2Page/></ContentWrap></Route>
                    <Route exact path='/layer2/*'><ContentWrap><Layer2Page/></ContentWrap></Route>
                    {/*<Route exact path='/layer2/my-liquidity'><ContentWrap><Layer2Page/></ContentWrap> </Route>*/}
                    {/*<Route exact path='/layer2/history'><ContentWrap><Layer2Page/></ContentWrap></Route>*/}
                    {/*<Route exact path='/layer2/order'><ContentWrap><Layer2Page/></ContentWrap></Route>*/}
                    {/*<Route exact path='/layer2/rewards'><ContentWrap><Layer2Page/></ContentWrap></Route>*/}
                    {/*<Route exact path='/layer2/redpock'><ContentWrap><Layer2Page/></ContentWrap></Route>*/}
                    {/*<Route exact path='/layer2/security'><ContentWrap><Layer2Page/></ContentWrap></Route>*/}
                    {/*<Route exact path='/layer2/vip'><ContentWrap><Layer2Page/></ContentWrap></Route>*/}
                    <Route exact path='/liquidity'> <ContentWrap><LiquidityPage/></ContentWrap></Route>
                    <Route exact path='/liquidity/pools/*'><ContentWrap><LiquidityPage/></ContentWrap></Route>
                    <Route exact path='/liquidity/pools'><ContentWrap><LiquidityPage/></ContentWrap></Route>
                    <Route exact path='/liquidity/amm-mining'><ContentWrap><LiquidityPage/></ContentWrap> </Route>
                    <Route exact path='/liquidity/my-liquidity'><ContentWrap><LiquidityPage/></ContentWrap></Route>

                </>}

        </Switch>
        <ModalGroup/>
        <Footer/>
    </>
}

export default RouterView
