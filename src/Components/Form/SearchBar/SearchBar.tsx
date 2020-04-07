import React, { Component, ContextType } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

import "./SearchBar.scss";

import { ReactComponent as SearchIcon } from ".././../../Images/search.svg";
import { ReactComponent as CloseIcon } from ".././../../Images/close.svg";
import AppContext from "../../../AppContext";

interface Props {
  theme?: "LIGHT";
}

class SearchBar extends Component<Props & WithTranslation> {
  static contextType = AppContext;
  context!: ContextType<typeof AppContext>;
  constructor(props: WithTranslation) {
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
    const { t, theme } = this.props;
    return (
      <div className={`filter-query ${theme ? theme : ""}`}>
        <input
          type="text"
          value={this.context.filters.query}
          className="input-query"
          id="query"
          onChange={this.handleQueryChange}
          placeholder={t("filters.query.placeholder")}
        ></input>
        <label htmlFor="query">
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

export default withTranslation()(SearchBar);
