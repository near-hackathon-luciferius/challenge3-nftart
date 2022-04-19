import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextInput } from 'react-materialize';

export default function Form({ onSubmit, currentUser }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Say hello, { currentUser.accountId }!</p>
        <div className="highlight">
          <TextInput
            autoComplete="off"
            autoFocus
            id="name_prompt"
            className="name_input"
            label="Your name"
            required
          />
        </div>
        <Button type="submit" value="hello" small className="margin_button"
                tooltip="Executes the method hello which returns a message from NEAR. This does not require a confirmation.">
          Hello
        </Button>
        <Button type="submit" value="remember" small className="margin_button"
                tooltip="Executes the method remember_me which stores the given name in the smart contract. This does require a confirmation.">
          Remember me
        </Button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};