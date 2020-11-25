import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NotFound from './components/NotFound';
import Header from './components/Header';
import SignIn from 'features/Auth/pages/SignIn';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { getMe } from 'app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import categoryApi from 'api/categoryApi';
import { getListCategory } from 'app/categorySlice';
import Register from 'features/Auth/pages/Register';

const Photo = React.lazy(() => import('./features/Photo'));
const News = React.lazy(() => import('features/News'));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};
firebase.initializeApp(config);

function App() {
  // save on state, or save on redux ....
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoryList = async () => {
      try{
        const response = await categoryApi.getAll();
        const lstCats = response.reduce((curr, cat) => {
          const newCat = {...cat, value : cat.id, label: cat.name};
          curr.push(newCat);
          return curr;
        }, []);
        const action = getListCategory(lstCats);
        dispatch(action);
        console.log("category", lstCats);
      }catch(e){
        console.log("Failed to fetch products list ", e);
      }
    }
    fetchCategoryList();
  }, []);

  //handle firebase auth change
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
        if(!user){
          console.log("User log out");
          return;
        }   

        //get me when sign In
        const action = getMe();
        const actionResult = await dispatch(action);

        const currentUser = unwrapResult(actionResult);

        console.log("currentUser", currentUser);
        //console.log("Logged in user: ", user.displayName);
        //const token = await user.getIdToken();
        //console.log("Logged in user token: ", token);
        //this.setState({isSignedIn: !!user})
      }
    );

    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loadding ...</div>}>

        <BrowserRouter>

          <Header />

          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path="/news" component={News} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>

    </div>
  );
}

export default App;
