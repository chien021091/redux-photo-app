import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import './Header.scss'
import { KEYS_TOKEN_CREDENTIEL } from 'constants/keys';
import { saveUser } from 'app/userSlice';
import { useDispatch, useSelector } from 'react-redux';
Header.propTypes = {

};

function Header(props) {
    const isLogin = useSelector(state => state.user.isLogin);

    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem(KEYS_TOKEN_CREDENTIEL);
        const action = saveUser({
            current : {},
            isLogin : false
        });
        dispatch(action);
    }

    return (
        <header className="header">
            <Container>
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <a
                            className="header__link header__title"
                            href="https://www.youtube.com/watch?v=302PCo3poh4&ab_channel=EasyFrontend"
                            target="_blank"
                            rel="noopener noreferrer">
                            Chien Vlog
                    </a>
                    </Col>

                    <Col xs="auto">
                        {
                            isLogin && <span
                                    className="header__link"
                                    onClick={handleLogout}
                                >
                                    Log Out
                            </span>
                        }
                        {
                            !isLogin && <NavLink
                                    exact
                                    className="header__link"
                                    to="/sign-in"
                                    activeClassName="header__link--active"
                                >
                                    Sign In
                            </NavLink>
                        }
                        
                    </Col>
                </Row>

            </Container>
        </header>
    );
}

export default Header;