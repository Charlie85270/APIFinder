import React, { Component, ContextType } from "react";
import "./SearchBar.scss";

import { ReactComponent as SearchIcon } from ".././../../Images/search.svg";
import { ReactComponent as CloseIcon } from ".././../../Images/close.svg";
import AppContext from "../../../AppContext";

interface Props {
  theme?: "LIGHT";
}

class SearchBar extends Component<Props> {
  static contextType = AppContext;
  context!: ContextType<typeof AppContext>;
  constructor(props: Props) {
    super(props);
    this.state = {
      allCategories: []
    };
  }

  handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.context.setFiltersValue({
      ...this.context.filters,
      query: value
    });
  };

  render() {
    const { theme } = this.props;
    return (
      <div className={`filter-query ${theme ? theme : ""}`}>
        <label htmlFor="query">
          <input
            type="text"
            value={this.context.filters.query}
            className="input-query"
            id="query"
            onChange={this.handleQueryChange}
            placeholder="Search an API"
          ></input>
          <span className="is-sr-only">Search an API</span>
          {this.context.filters.query === "" ? (
            <SearchIcon className="input-icon" />
          ) : (
            <CloseIcon
              className="input-icon close-icon"
              onClick={() => {
                this.context.setFiltersValue({
                  ...this.context.filters,
                  query: ""
                });
              }}
            />
          )}
        </label>
      </div>
    );
  }
}

export default SearchBar;
