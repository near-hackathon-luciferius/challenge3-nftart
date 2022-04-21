import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

const Dashboard = ({currentUser, onNftMint, errorMessage}) => {
   return <>
                 <header>
                   <h1>{currentUser.accountId}'s Collection</h1>
                 </header>
                 <h5>Mint a new NFT below.</h5>
                 <Form onNftMint={onNftMint} errorMessage={errorMessage} />
          </>
}

Dashboard.propTypes = {
  onNftMint: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};

export default Dashboard;