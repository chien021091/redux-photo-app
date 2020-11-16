import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './PhotoCard.scss';
import { useSelector } from 'react-redux';

PhotoCard.propTypes = {
    photo : PropTypes.object,
    onEditClick : PropTypes.func,
    onRemoveClick: PropTypes.func,
    handleShowClick : PropTypes.func
};

PhotoCard.defaultProps = {
    photo : {},
    onEditClick: null,
    onRemoveClick: null,
    handleShowClick : null
}

function PhotoCard(props) {

    const {photo, onEditClick, onRemoveClick, onShowClick } = props;
    const isLogin = useSelector(state => state.user.isLogin);

    const handleEditClick = () => {
        onEditClick(photo);
    }

    const handleRemoveClick = () => {
        onRemoveClick(photo);
    }

    const handleShowClick = () => {
        onShowClick(photo);
    }

    return (
        <div className="photo">
            <img src={photo.photo} alt={photo.title} />

            <div className="photo__overlay">
                <h3 className="photo__title">{photo.title}</h3>

                {
                   isLogin &&  <div className="photo__actions">
                                    <div>
                                        <Button outline size="sm" color="light" onClick={handleEditClick}>
                                        Edit
                                        </Button>
                                    </div>

                                    <div>
                                        <Button outline size="sm" color="danger" onClick={handleRemoveClick}>
                                        Remove
                                        </Button>
                                    </div>
                                    <div>
                                        <Button outline size="sm" color="light" onClick={handleShowClick}>
                                        Detail
                                        </Button>
                                    </div>
                                </div>
                }             
            </div>
            </div>
    );
}

export default PhotoCard;