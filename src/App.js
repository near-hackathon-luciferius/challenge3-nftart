import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import SignIn from './components/SignIn';
import { Button } from 'react-materialize';
import Layout from './layout';
import NotFound from './components/404.jsx';
import Dashboard from './components/Dashboard.jsx';
import 'materialize-css/dist/css/materialize.css'
import './App.css';
import { Route, Routes } from 'react-router-dom'
var version = require('../package.json').version;
require('materialize-css');

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet, lastTransaction, provider, errorMessage }) => {
  const [answer, setAnswer] = useState(errorMessage ? decodeURI(errorMessage) : currentUser ? "Thinking please wait..." : "Please login first.");

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, name_prompt } = e.target.elements;

    fieldset.disabled = true;
    //Big(donation.value || '0').times(10 ** 24).toFixed()
    if (e.nativeEvent.submitter.value === 'hello') {        
        contract.hello(
          { name: name_prompt.value },
          BOATLOAD_OF_GAS,
          0
        ).then((answer) => {
          fieldset.disabled = false;
          name_prompt.value = '';
          name_prompt.focus();
          setAnswer(answer);
        });
    }
    else {
        contract.remember_me(
          { name: name_prompt.value },
          BOATLOAD_OF_GAS,
          Big('0.00045').times(10 ** 24).toFixed()
        ).then((answer) => {
          fieldset.disabled = false;
          name_prompt.value = '';
          name_prompt.focus();
          setAnswer(answer);
        });
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
  
  useEffect(() => {
      if (currentUser && lastTransaction && !errorMessage) {
          getState(lastTransaction, currentUser.accountId);
      }
      else if (currentUser && !errorMessage){
          getLastRememberedMessage(currentUser.accountId);
      }
      window.history.pushState({}, "", window.location.origin + window.location.pathname);

      async function getState(txHash, accountId) {
        const result = await provider.txStatus(txHash, accountId);
        setAnswer(result.receipts_outcome[0].outcome.logs.pop());
      }
      
      async function getLastRememberedMessage(accountId) {
        const result = await contract.get_last_message({ account_id: accountId });
        setAnswer(result);
      }
  }, [currentUser, errorMessage, lastTransaction, contract, provider]);
  


  return (
    <Routes>
      <Route path="/" element={<Layout currentUser={currentUser} signIn={signIn} signOut={signOut}/>}>
        <Route index element={
          currentUser
            ? <Dashboard version={version} onSubmit={onSubmit} currentUser={currentUser} answer={answer}/>
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
