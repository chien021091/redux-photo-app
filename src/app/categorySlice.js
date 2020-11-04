import { createSlice } from "@reduxjs/toolkit";

const initialCategorys = [];

const category = createSlice({
    name: 'category',
    initialState : initialCategorys,
    reducers : {
        getListCategory(state, action){
          state = action.payload;
          return state;
        }
    }
});

const { reducer : categoryReducer, actions } = category;
export const { getListCategory } = actions;
export default categoryReducer;