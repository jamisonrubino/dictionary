import React from 'react';
import PropTypes from 'prop-types';

import SearchedWord from './SearchedWord';
import PendingSearch from './PendingSearch';

const SearchedList = props =>
  <ul>
    <PendingSearch
      word={props.pendingSearch.word}
      definition={props.pendingSearch.definition}
    />
    {props.searchedList
      .map((search, index) =>
        <SearchedWord
          key={index}
          word={search.word}
          definition={search.definition}
          handleRemove={() => props.removeWordAt(index)}
          />
      )}
  </ul>;

SearchedList.propTypes = {
  searchedList: PropTypes.array.isRequired,
  pendingSearch: PropTypes.shape({
    word: PropTypes.string,
    definition: PropTypes.definition
  }).isRequired,
  removeWordAt: PropTypes.func.isRequired
};

export default SearchedList;
