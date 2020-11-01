import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NotFound from './components/NotFound';
import Header from './components/Header';
import productApi from 'api/productApi';

const Photo = React.lazy(() => import('./features/Photo'));

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

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loadding ...</div>}>

        <BrowserRouter>

          <Header />

          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>

    </div>
  );
}

export default App;
