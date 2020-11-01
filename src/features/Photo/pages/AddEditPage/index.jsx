import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Banner from "components/Banner";
import PhotoForm from "features/Photo/components/PhotoForm";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, updatePhoto } from "features/Photo/photoSlice";
import { useHistory, useParams } from "react-router-dom";
import { randomNumber } from "utils/common";

AddEditPage.propTypes = {};

function AddEditPage(props) {

  const { photoId } = useParams();
  console.log("photoId", photoId);
  const isAddMode = !photoId;
  const editPhoto = useSelector(state => state.photos.find(p => p.id === +photoId));

  const initialValues = isAddMode 
  ? {
    title: "",
    categoryId: null,
    photo: ''
  } :  editPhoto;

  const dispatch = useDispatch();
  const history = useHistory();


  const handleSubmit = values => {
    return new Promise(resolve => {
      console.log("Form Submit", values);

      setTimeout(() => {
        if(isAddMode){
          const newPhoto = {
            ...values,
            id: randomNumber(10000, 99999)
          }
          const action = addPhoto(newPhoto);
          dispatch(action);
        } else {
          const action = updatePhoto(values);
          dispatch(action);
        }

        history.push('/photos');
        resolve(true);
      }, 2000)     
    })
    
  }

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo" />

      <div className="photo-edit__form">
        <PhotoForm onSubmit={handleSubmit} initialValues={initialValues} isAddMode={isAddMode} />
      </div>
    </div>
  );
}

export default AddEditPage;
