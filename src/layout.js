import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu';
import { Button } from 'react-materialize';
import PropTypes from 'prop-types';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

const Layout = ({currentUser, signIn, signOut}) => {
  return (
    <div id="App">
        <Menu pageWrapId={ "page-wrapper" } outerContainerId={ "App" }>
          <Link className="menu-item" to="/">
            Dashboard
          </Link>

          <Link className="menu-item" to="/collection">
            My Collection
          </Link>

          <Link className="menu-item" to="/marketplace">
            Discover
          </Link>

          <Link className="menu-item" to="/docs">
            Docs
          </Link>
        </Menu>
        <main id="page-wrapper">
          <Outlet/>
        </main>
        { currentUser
          ? <Button onClick={signOut} floating large className='btn-login' icon={<AccountBalanceWalletIcon fontSize="medium" />} tooltip={'Log out ' + currentUser.accountId + '.'} />
          : <Button onClick={signIn} floating large className='btn-login' icon={<BrokenImageIcon fontSize="medium" />} tooltip='Log in using NEAR wallet.' />
        }
    </div>
  );
};

Layout.propTypes = {
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Layout;