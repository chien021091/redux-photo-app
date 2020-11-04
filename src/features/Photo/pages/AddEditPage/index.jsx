import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Banner from "components/Banner";
import PhotoForm from "features/Photo/components/PhotoForm";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, updatePhoto } from "features/Photo/photoSlice";
import { useHistory, useParams } from "react-router-dom";
import photoApi from "api/photoApi";

AddEditPage.propTypes = {};

function AddEditPage(props) {

  const { photoId } = useParams();
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

  const handleSubmit = async values => {
    console.log("Form Submit", values);

    if(isAddMode){
      const newPhoto =  await photoApi.addNew(values);
      const action = addPhoto(newPhoto);
      dispatch(action);
    } else {
      const newPhoto = await photoApi.updatePhoto(values);
      const action = updatePhoto(newPhoto);
      dispatch(action);
    }

    history.push('/photos'); 
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
