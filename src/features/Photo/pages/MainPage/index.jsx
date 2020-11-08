import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import Banner from "components/Banner";
import images from "constants/images";
import { useDispatch, useSelector } from "react-redux";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto, updateListPhoto } from "features/Photo/photoSlice";
import photoApi from "api/photoApi";

MainPage.propTypes = {};

function MainPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  const photos = useSelector(state => state.photos);

  const isLogin = useSelector(state => state.user.isLogin);

  useEffect(() => {
    const fetchPhotoList = async () => {
      try{
        const params = {};
        const response = await photoApi.getAll(params);
        const action = updateListPhoto(response.listResult);
        dispatch(action);

        console.log(response);
      }catch(e){
        console.log("Failed to fetch photos list ", e);
      }
    }
    fetchPhotoList();
  }, []);

  const handlePhotoEditClick = photo => {
    console.log("Photo Edit", photo);
    history.push(`/photos/${photo.id}`);
  }

  const handlePhotoRemoveClick = async photo => {
    try{
      console.log("Photo Remove", photo);
      await photoApi.deletePhoto([photo.id]);
      const action = removePhoto(photo);
      dispatch(action);  
    }catch(e){
      console.log("error remove", e);
    }
  }

  return (
    <div className="photo-main">
      <Banner title="Your awesome photos" backgroundUrl={images.PINK_BG} />

      {
        isLogin && <Container className="text-center">
                    <Link to="/photos/add">Add new Photo</Link>
                  </Container>
      }
      
      <PhotoList  photoList={photos} onPhotoEditClick={handlePhotoEditClick} onPhotoRemoveClick={handlePhotoRemoveClick} />

    </div>
  );
}

export default MainPage;
