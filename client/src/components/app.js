import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './navbar';
import Home from './Home';
import Summoner from './summoner';

export default () => {
    return (
        <BrowserRouter>
            <Fragment>
                <CssBaseline />
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/summoner/:summonerName" component={Summoner} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
}
