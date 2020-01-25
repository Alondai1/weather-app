import React from "react";
import { Search } from "semantic-ui-react";
import "./SearchBar.style.scss";
import weatherService from "../../services/WeatherService";

class SearchBar extends React.Component {
  state = {
    searchValue: "",
    userInput: "",
    results: [],
  };

  handleResultSelect = (e, { result }) => {
    this.props.setCurrentCity(result);
    this.setState({ userInput: "" });
  };

  handleSearchChange = async (e, { value }) => {
    this.setState({ userInput: value });
    const res = await weatherService.getSearchResults(value);
    if (res) {
      const results = res
        .filter((result, idx) => idx < 6)
        .map(result => {
          return {
            title: result.LocalizedName,
            description: result.Country.LocalizedName,
            id: result.Key,
            isFav: false,
          };
        });
      this.setState({ results });
    }
  };

  render() {
    return (
      <Search
        placeholder="Search..."
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={this.state.results}
        value={this.state.userInput}
        className="search-bar"
      />
    );
  }
}

export default SearchBar;
