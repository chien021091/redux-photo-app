import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import Banner from "components/Banner";
import images from "constants/images";
import { useDispatch, useSelector } from "react-redux";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto } from "features/Photo/photoSlice";

MainPage.propTypes = {};

function MainPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  const photos = useSelector(state => state.photos);
  console.log("List of Photos", photos);

  const handlePhotoEditClick = photo => {
    console.log("Photo Edit", photo);
    history.push(`/photos/${photo.id}`);
  }

  const handlePhotoRemoveClick = photo => {
    
    console.log("Photo Remove", photo);

    const action = removePhoto(photo);
    console.log("action", action);
    dispatch(action);  
  }

  return (
    <div className="photo-main">
      <Banner title="Your awesome photos" backgroundUrl={images.PINK_BG} />

      <Container className="text-center">
        <Link to="/photos/add">Add new Photo</Link>
      </Container>

      <PhotoList  photoList={photos} onPhotoEditClick={handlePhotoEditClick} onPhotoRemoveClick={handlePhotoRemoveClick} />

    </div>
  );
}

export default MainPage;
