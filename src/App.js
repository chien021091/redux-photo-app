import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NotFound from './components/NotFound';
import Header from './components/Header';
import productApi from 'api/productApi';
import SignIn from 'features/Auth/pages/SignIn';
import firebase from 'firebase';

const Photo = React.lazy(() => import('./features/Photo'));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};
firebase.initializeApp(config);

function App() {
  // save on state, or save on redux ....
  const [productList, setProductList ] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try{
        const params = {
          _page : 1,
          _limit : 10
        }
        const response = await productApi.getAll(params);
        setProductList(response.data);
        console.log(response);
      }catch(e){
        console.log("Failed to fetch products list ", e);
      }
    }
    fetchProductList();
  }, []);

  //handle firebase auth change
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
        if(!user){
          console.log("User log out");
          return;
        }   

        console.log("Logged in user: ", user.displayName);

        const token = await user.getIdToken();

        console.log("Logged in user token: ", token);
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
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>

    </div>
  );
}

export default App;
