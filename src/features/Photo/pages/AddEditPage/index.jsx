import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Banner from "components/Banner";
import PhotoForm from "features/Photo/components/PhotoForm";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto } from "features/Photo/photoSlice";
import { useHistory, useParams } from "react-router-dom";

AddEditPage.propTypes = {};

function AddEditPage(props) {

  const { photoId } = useParams();
  const isAddMode = !photoId;
  const listPhoto = useSelector(state => state.photos) || [];

  const initialValues = isAddMode 
  ? {
    title: "",
    categoryId: null,
    photo: ''
  } :  listPhoto.find(p => p.id === photoId);

  const dispatch = useDispatch();
  const history = useHistory();


  const handleSubmit = values => {
    return new Promise(resolve => {
      console.log("Form Submit", values);

      setTimeout(() => {
        const action = addPhoto(values);
        console.log("action", action);
        dispatch(action);
        history.push('/photos');
        resolve(true);
      }, 2000)     
    })
    
  }

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo" />

      <div className="photo-edit__form">
        <PhotoForm onSubmit={handleSubmit} initialValues={initialValues} />
      </div>
    </div>
  );
}

export default AddEditPage;
