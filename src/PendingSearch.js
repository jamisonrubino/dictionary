import React from 'react';
import PropTypes from 'prop-types';

const PendingSearch = props => {
  if (props.word) {
    return (
      <li className="pending">
        <p className="word">
          {props.word}
        </p>
        <p className="definition">
          {props.definition}
        </p>
      </li>
    );
  }
  return null;
};

PendingSearch.propTypes = {
  word: PropTypes.string,
  definition: PropTypes.string
};

export default PendingSearch;
