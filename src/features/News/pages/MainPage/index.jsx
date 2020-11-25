import React from 'react';
import PropTypes from 'prop-types';
import Banner from 'components/Banner';
import images from 'constants/images';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

MainPage.propTypes = {
    
};

function MainPage(props) {
    const isLogin = useSelector(state => state.user.isLogin);
    
    return (
        <div className="news-main">
            <Banner title="Your awesome photos" backgroundUrl={images.PINK_BG} />
            {
                isLogin && <Container className="text-center">
                            <Link to="/news/add">Them bai viet moi</Link>
                        </Container>
            }
        </div>
    );
}

export default MainPage;