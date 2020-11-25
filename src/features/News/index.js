import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from 'components/NotFound';
import MainPage from './pages/MainPage';
import AddEditPage from './pages/AddEditPage';

News.propTypes = {
    
};

function News(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${match.url}`} component={MainPage} />
            <Route path={`${match.url}/add`} component={AddEditPage} />
            <Route path={`${match.url}/:newId`} component={AddEditPage} />

            <Route component={NotFound} />
        </Switch>
    );
}

export default News;