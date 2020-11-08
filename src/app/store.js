import { configureStore } from '@reduxjs/toolkit';
import photoReducer from 'features/Photo/photoSlice';
import categoryReducer from './categorySlice';
import userReducer from './userSlice';

const rootReducer = {
    photos: photoReducer,
    user : userReducer,
    category : categoryReducer,
}

const store = configureStore({
    reducer : rootReducer
});

export default store;