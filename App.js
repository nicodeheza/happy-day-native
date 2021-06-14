import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import Home from './components/home/Home';
import Loading from './components/loading/Loading';
import Principal from './components/principal/Principal';
import {uri} from './constants';
import{authContext} from './contexts';

export default function App() {
  const [auth, setAuth]= useState(undefined);
  useEffect(()=>{
    if(auth === undefined){
      fetch(`${uri}/api`,{
        method:'GET',
        headers:{"Content-type": "application/json; charset=UTF-8"}
  })
  .then(res=> res.json())
  .then(data=>{
    setAuth(data.auth);
    //console.log(data);
   // console.log('app fetch');
  })
  .catch(err => console.log(err));
    }
  });

  return (
    <authContext.Provider value={setAuth}>
    <StatusBar backgroundColor="#61dafb" barStyle={"dark-content"} />
      {
        auth === undefined ?
        (<Loading/>) :
        auth ?
        (<Principal/>) :
        (<Home/>)
      }
    </authContext.Provider>
  );
}

