import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import SignIn from './components/SignIn';
import Layout from './layout';
import NotFound from './components/404.jsx';
import Dashboard from './components/Dashboard.jsx';
import Collection from './components/Collection.jsx';
import 'materialize-css/dist/css/materialize.css'
import './App.css';
import { Route, Routes } from 'react-router-dom'
var version = require('../package.json').version;
require('materialize-css');

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet, provider }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const onNftMint = (e) => {
    e.preventDefault();

    const { fieldset, name_prompt } = e.target.elements;
    setErrorMessage(null);
    
    let file = file_chooser.files[0];
    
    if (!file){
        setErrorMessage('No file was chosen.');
    }
  };
  
  const signIn = () => {
    wallet.requestSignIn(
      {contractId: nearConfig.contractName, methodNames: [contract.hello.name]}, //contract requesting access
      'NEAR Challenge #3 - NFT Art', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout currentUser={currentUser} signIn={signIn} signOut={signOut}/>}>
        <Route index element={
          currentUser
            ? <Dashboard version={version} currentUser={currentUser}/>
            : <SignIn/>
        }/>
        <Route path="collection" element={
          currentUser
            ? <Collection onNftMint={onNftMint} currentUser={currentUser} errorMessage={errorMessage}/>
            : <SignIn/>
        }/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

App.propTypes = {
  contract: PropTypes.shape({
    hello: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
