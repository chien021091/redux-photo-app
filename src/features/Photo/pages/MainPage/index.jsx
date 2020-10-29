import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../../../../components/Banner';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import images from '../../../../constants/images';

MainPage.propTypes = {

};

function MainPage(props) {
    return (
        <div class="photo-main">
            <Banner title="Your awesome photos" backgroundUrl={images.PINK_BG} />

            <Container className="text-center">
                <Link to="/photos/add">Add new Photo</Link>
            </Container>
        </div>
    );
}

export default MainPage;