import React, { Component } from 'react';
import SearchedList from './SearchedList';
import './App.css';

class App extends Component {

  state = {
    pendingSearch: {
        word: "",
        definition: ""
      },
    searchedList: [
      {
        word: "SampleWord",
        definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur arcu dolor, gravida ut arcu sed, maximus congue nulla. Donec sed odio vitae justo volutpat fermentum sit amet eget dui. Nunc et dapibus leo. Maecenas porta mollis ornare. Cras id rutrum nisl. In hac habitasse platea dictumst. Duis at eros justo. Suspendisse potenti. Suspendisse viverra, magna in efficitur elementum, ante velit cursus magna, quis laoreet magna risus eget tortor. Aliquam et urna dignissim neque iaculis ultricies id non sapien."
      },
      {
        word: "SecondSampleWord",
        definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur arcu dolor, gravida ut arcu sed, maximus congue nulla. Donec sed odio vitae justo volutpat fermentum sit amet eget dui. Nunc et dapibus leo. Maecenas porta mollis ornare. Cras id rutrum nisl. In hac habitasse platea dictumst. Duis at eros justo. Suspendisse potenti. Suspendisse viverra, magna in efficitur elementum, ante velit cursus magna, quis laoreet magna risus eget tortor. Aliquam et urna dignissim neque iaculis ultricies id non sapien."
      }
    ]
  };


  submitWord = e => {
    e.preventDefault();
    this.setState({
      searchedList: [
        {
          word: this.state.pendingSearch,
          definition: this.getDefinition(1, this.state.pendingSearch.word)
        },
        ...this.state.searchedList
      ],
      pendingSearch: ""
    });
  }

  togglePendingSearch = e => {
    var pendingDefinition = this.getDefinition(0, e.target.value);
    this.setState({
      pendingSearch: {
        word: e.target.value,
        definition: pendingDefinition
      }
    });
  }


  removeWordAt = index =>
    this.setState({
      searchedList: [
        ...this.state.searchedList.slice(0,index),
        ...this.state.searchedList.slice(index+1)
      ]
    });

  getDefinition = (pending, word) => {
    var fetchDef;
    if (pending === 0) {
      clearTimeout(fetchDef);
      if (word.length>0) {
        return fetchDef = setTimeout(fetchWord(word), 800);
      }
    } else if (pending === 1 && word.length>0) {
      return fetchWord(word);
    }
    function fetchWord(word) {
      word = word.match(/[a-zA-Z]/gi).join("").toLowerCase().trim().replace(/\s+/g, "_");
      var req = new XMLHttpRequest();
      req.open("GET", "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word, true)
      req.setRequestHeader("Accept", "application/json");
      req.setRequestHeader("app_id", "607ee52b");
      req.setRequestHeader("app_key", "50106fbf9187724c874babe12b910b22");
      req.send();

      if(req.status === "200") {
        return req.body;
      } else {
        return req.statusText;
      }
    }
  }


  render() {
    return (
      <div className="App">
        <form onSubmit={this.submitWord}>
          <input
            type="text"
            placeholder="Search"
            onChange={this.togglePendingSearch}
            value={this.state.pendingSearch.word} />
          <input type="submit" value="Search" />
        </form>

        <SearchedList
          searchedList = {this.state.searchedList}
          pendingSearch = {this.state.pendingSearch}
          removeWordAt = {this.removeWordAt}
        />
      </div>
    );
  }
}

export default App;
