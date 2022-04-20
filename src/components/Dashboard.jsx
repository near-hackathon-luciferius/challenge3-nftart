import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Dashboard = ({version, answer, onSubmit, currentUser}) => {
   return <>
                 <header>
                   <h1>NEAR Challenge #3 - NFT Art - {version}</h1>
                 </header>      
                 <h5>Head over to <Link className="menu-item" to="/collection">your collection</Link> 
                     to mint you first artwork or go to <Link className="menu-item" to="/marketplace">the marketplace</Link> to discover what others created.
                 </h5>
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