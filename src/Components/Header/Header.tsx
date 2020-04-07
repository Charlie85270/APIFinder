import React, { Component, ContextType } from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import AppContext from "../../AppContext";
import "./Header.scss";
import { ReactComponent as Logo } from ".././../Images/logo.svg";
import { ReactComponent as IdeaIcon } from ".././../Images/idea.svg";
import { ReactComponent as FilterIcon } from ".././../Images/filter.svg";
import { ReactComponent as CloseIcon } from ".././../Images/close.svg";
import SearchBar from "../Form/SearchBar/SearchBar";
import Filters from "../Filters/Filters";
interface State {
  showFilter: boolean;
}
class Header extends Component<WithTranslation, State> {
  static contextType = AppContext;
  context!: ContextType<typeof AppContext>;
  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      showFilter: false
    };
  }
  getTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme !== "light" && theme !== "dark") {
      localStorage.setItem("theme", "dark");
    }
    return theme;
  };

  switchTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    window.location.reload();
  };

  render() {
    const { t } = this.props;
    const { showFilter } = this.state;
    return (
      <div className="header">
        <div className="header-content">
          <span className="header-title">
            <Logo className="header--logo is-hidden-desktop" />
            <span className="header-label is-size-4 is-hidden-touch">
              APIFinder
            </span>
          </span>
          <span className="searchBar">
            <SearchBar></SearchBar>
          </span>
          <span
            className="is-hidden-desktop filter-icon"
            onClick={() => {
              this.setState({ showFilter: !this.state.showFilter });
            }}
          >
            <FilterIcon />
          </span>
          <span className="header-link" onClick={this.switchTheme}>
            <IdeaIcon className="header-link--icon is-hidden-desktop" />
            {this.getTheme() === "light" ? t("header.dark") : t("header.light")}
          </span>
        </div>
        {showFilter && (
          <div className="header-filter">
            <span className="close-filter-icon">
              <CloseIcon
                onClick={() => {
                  this.setState({ showFilter: !this.state.showFilter });
                }}
              ></CloseIcon>
            </span>
            <span className="is-hidden-desktop">
              <Filters></Filters>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation()(Header);
