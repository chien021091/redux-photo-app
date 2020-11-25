import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from '../PhotoCart';
import { Col, Row } from 'reactstrap';
import { Grid, makeStyles } from '@material-ui/core';

PhotoList.propTypes = {
    photoList : PropTypes.array,
    onPhotoEditClick : PropTypes.func,
    onPhotoRemoveClick: PropTypes.func
};

PhotoList.defaultProps = {
    photoList : [],
    onPhotoEditClick: null,
    onPhotoRemoveClick: null
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }));

function PhotoList(props) {

    const classes = useStyles();
    const {photoList, onPhotoEditClick, onPhotoRemoveClick, onPhotoShowClick } = props;

    return (      
        <div className={classes.root}>
            <Grid container spacing={4}>
            {
                photoList.map(photo => (
                    <Grid item key={photo.title} xs='12' md='6' lg='3'>
                        <PhotoCard photo={photo} onEditClick={onPhotoEditClick} onRemoveClick={onPhotoRemoveClick} onShowClick={onPhotoShowClick} />
                    </Grid>
                ))
            }
            </Grid>
        </div>
        

    );
}

export default PhotoList;