import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, Switch, Redirect, Route, Link } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import MainPage from './pages/MainPage';
import NotFound from '../../components/NotFound';

Photo.propTypes = {

};

function Photo(props) {
    const match = useRouteMatch();
    console.log({ match });
    return (
        <Switch>
            <Route exact path={`${match.url}`} component={MainPage} />
            <Route path={`${match.url}/add`} component={AddEditPage} />
            <Route path={`${match.url}/:photoId`} component={AddEditPage} />

            <Route component={NotFound} />
        </Switch>
    );
}

export default Photo;