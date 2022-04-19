import React from 'react'
import PropTypes from 'prop-types';
import Form from './Form';

const Dashboard = ({version, answer, onSubmit, currentUser}) => {
   return <>
                 <header>
                   <h1>NEAR Challenge #3 - NFT Art - {version}</h1>
                 </header>      
                 <h5>Status: { answer }</h5>
                 <Form onSubmit={onSubmit} currentUser={currentUser} />
             </>
}

Dashboard.propTypes = {
  version: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};

export default Dashboard;