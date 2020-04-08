import React, { Component, ContextType } from "react";
import AppContext from "../../AppContext";
import "./Header.scss";
import { ReactComponent as Logo } from ".././../Images/logo2.svg";
import { ReactComponent as IdeaIcon } from ".././../Images/idea.svg";
import { ReactComponent as FilterIcon } from ".././../Images/filter.svg";
import { ReactComponent as CloseIcon } from ".././../Images/close.svg";
import SearchBar from "../Form/SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import ReactGA from "react-ga";

interface State {
  showFilter: boolean;
}
class Header extends Component<{}, State> {
  static contextType = AppContext;
  context!: ContextType<typeof AppContext>;
  constructor(props: {}) {
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
      ReactGA.event({
        category: "Theme",
        action: `Swith theme to "light"`
      });
    } else {
      localStorage.setItem("theme", "dark");
      ReactGA.event({
        category: "Theme",
        action: `Swith theme to "Dark"`
      });
    }
    window.location.reload();
  };

  render() {
    const { showFilter } = this.state;

    return (
      <div className="header">
        <div className="header-content">
          <span className="header-title">
            <Logo
              className="header--logo is-hidden-desktop"
              title="Search over 680 public APIs"
            />
            <span className="header-label is-size-4 is-hidden-touch">
              APIsFinder
            </span>
          </span>
          <span className="searchBar">
            <SearchBar></SearchBar>
          </span>
          <span
            className="is-hidden-desktop filter-icon"
            onClick={() => {
              ReactGA.event({
                category: "Filters",
                action: "Show filters"
              });
              this.setState({ showFilter: !this.state.showFilter });
            }}
          >
            <FilterIcon />
          </span>
          <span className="header-link" onClick={this.switchTheme}>
            <IdeaIcon className="header-link--icon is-hidden-desktop" />
            {this.getTheme() === "light" ? "Dark mode" : "Light mode"}
          </span>
        </div>
        {showFilter && (
          <div className="header-filter">
            <span className="close-filter-icon">
              <CloseIcon
                onClick={() => {
                  ReactGA.event({
                    category: "Filters",
                    action: "Hide filters"
                  });
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

export default Header;
