import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextInput } from 'react-materialize';

export default function Form({ onNftMint, errorMessage }) {
  return (
    <form onSubmit={onNftMint}>
      <fieldset id="fieldset">
        <p>Choose an image file below. Accepted are .png and .jpeg images only. The maximum file size is 3MB.</p>
        { errorMessage && <div className="error"> { errorMessage } </div> }
        <div className="highlight">
          <input type="file" id="file_chooser" />
        </div>
        <Button type="submit" small
                tooltip="Mints the chosen image as a NFT.">
          Mint!
        </Button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onNftMint: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};