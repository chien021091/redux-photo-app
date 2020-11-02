import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Header.scss'
Header.propTypes = {

};

function Header(props) {
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
                            Ease Frontend
                    </a>
                    </Col>

                    <Col xs="auto">
                        <NavLink
                            exact
                            className="header__link"
                            to="/sign-in"
                            activeClassName="header__link--active"
                        >
                            Sign In
                    </NavLink>
                    </Col>
                </Row>

            </Container>
        </header>
    );
}

export default Header;