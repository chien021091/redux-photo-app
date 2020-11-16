import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import Banner from "components/Banner";
import images from "constants/images";
import { useDispatch, useSelector } from "react-redux";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto, updateListPhoto } from "features/Photo/photoSlice";
import photoApi from "api/photoApi";
import Msgbox from "custom-fields/Msgbox";
import PhotoDetail from "features/Photo/components/PhotoDetail";

MainPage.propTypes = {};

function MainPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  const photos = useSelector(state => state.photos);
  const isLogin = useSelector(state => state.user.isLogin);

  const [currentPhoto, setCurrentPhoto] = useState({});
  const [isOpen, setOpen] = useState(false);

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

  const handlePhotoShowClick = photo => {
    setCurrentPhoto(photo);
    setOpen(true);
  }

  const handleCloseMsgbox = () => {
    setOpen(false);
  }

  const dataMsgBox = {
    title: "Chi tiết ảnh",
    content: <PhotoDetail photo={currentPhoto} />,
    buttons: {
      OK_BTN : {
        label: "OK"
      }
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
      
      <PhotoList  photoList={photos} onPhotoEditClick={handlePhotoEditClick} onPhotoRemoveClick={handlePhotoRemoveClick} onPhotoShowClick={handlePhotoShowClick} />
      <Msgbox isOpen={isOpen} handleCloseMsgbox={handleCloseMsgbox} data={dataMsgBox} />
    </div>
  );
}

export default MainPage;
