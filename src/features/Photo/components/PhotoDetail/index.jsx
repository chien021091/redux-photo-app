import React from 'react';
import PropTypes from 'prop-types';
import './PhotoDetail.scss';

PhotoDetail.propTypes = {
    photo : PropTypes.object
};

PhotoDetail.defaultProps = {
    photo : {}
}

function PhotoDetail(props) {
    const {photo} = props;

    return (
        <div className="photo">
            <img src={photo.photo} alt={photo.title} />
        </div>
    );
}

export default PhotoDetail;