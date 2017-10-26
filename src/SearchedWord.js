import React from 'react';
import PropTypes from 'prop-types';

const SearchedWord = props => {
  return (
    <li>
      <p className="word">
        {props.word}
      </p>
      <p className="definition">
        {props.definition}
      </p>
      <button onClick={props.handleRemove}>remove</button>
    </li>
  );
  return null;
}

SearchedWord.propTypes = {
  word: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default SearchedWord;
