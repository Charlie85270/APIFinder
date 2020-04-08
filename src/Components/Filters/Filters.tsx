import React, { Component, ContextType } from "react";
import AppContext from "../../AppContext";
import "./Filters.scss";
import Utils from "../../Utils/Utils";
import Accordion from "../Accordion/Accordion";
import Checkbox from "../Form/Checkbox/Checkbox";
import { ReactComponent as HttpsIcon } from ".././../Images/https.svg";
import { ReactComponent as AuthIcon } from ".././../Images/auth.svg";
import { ReactComponent as CorsIcon } from ".././../Images/cors.svg";
import { ReactComponent as Logo } from ".././../Images/logo2.svg";
import { ReactSVG } from "react-svg";
import ReactGA from "react-ga";
import Spinner from "../Spinner/Spinner";
class Filters extends Component {
  static contextType = AppContext;
  context!: ContextType<typeof AppContext>;

  handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.context.setFiltersValue({
      ...this.context.filters,
      query: value
    });
    ReactGA.event({
      category: "Search",
      action: "Search a filter",
      label: value
    });
  };

  toggleCategory = (category: string) => {
    const categories = [...this.context.filters.categories];
    if (this.categoryIsSelected(category)) {
      this.context.setFiltersValue({
        ...this.context.filters,
        categories: categories.filter(cat => cat !== category)
      });
      ReactGA.event({
        category: "Reset filter by category",
        action: category
      });
    } else {
      ReactGA.event({
        category: "Filter by category",
        action: category
      });
      categories.push(category);
      this.context.setFiltersValue({
        ...this.context.filters,
        categories
      });
    }
  };

  categoryIsSelected = (category: string): boolean => {
    return this.context.filters.categories.includes(category);
  };

  render() {
    return (
      <div className="Filters">
        {this.context.isLoading ? (
          <Spinner></Spinner>
        ) : (
          <div className="filter-box">
            <Logo className="logo is-hidden-touch"></Logo>
            <div className="filter-security">
              <Accordion title={`Security ${3}`}>
                <ul className="filter-categories-list">
                  <li>
                    <Checkbox
                      label="HTTPS"
                      checked={this.context.filters.https}
                      name="HTTPS"
                      onChange={() => {
                        ReactGA.event({
                          category: this.context.filters.https
                            ? "Reset filter by category"
                            : "Filter by category",
                          action: "HTTPS"
                        });
                        this.context.setFiltersValue({
                          ...this.context.filters,
                          https: !this.context.filters.https
                        });
                      }}
                    >
                      <HttpsIcon></HttpsIcon>
                    </Checkbox>
                  </li>
                  <li>
                    <Checkbox
                      label="CORS"
                      checked={this.context.filters.cors}
                      name="CORS"
                      onChange={() => {
                        this.context.setFiltersValue({
                          ...this.context.filters,
                          cors: !this.context.filters.cors
                        });
                        ReactGA.event({
                          category: this.context.filters.cors
                            ? "Reset filter by category"
                            : "Filter by category",
                          action: "CORS"
                        });
                      }}
                    >
                      <CorsIcon></CorsIcon>
                    </Checkbox>
                  </li>
                  <li>
                    <Checkbox
                      label="AUTH"
                      checked={this.context.filters.auth}
                      name="AUTH"
                      onChange={() => {
                        this.context.setFiltersValue({
                          ...this.context.filters,
                          auth: !this.context.filters.auth
                        });
                        ReactGA.event({
                          category: this.context.filters.auth
                            ? "Reset filter by category"
                            : "Filter by category",
                          action: "AUTH"
                        });
                      }}
                    >
                      <AuthIcon></AuthIcon>
                    </Checkbox>
                  </li>
                </ul>
              </Accordion>
            </div>
            <div className="filter-categories">
              <Accordion
                title={`Category ${
                  Utils.getAllCategories(this.context.APIs.entries).length
                }`}
              >
                <ul className="filter-categories-list">
                  {Utils.getAllCategories(this.context.APIs.entries).map(
                    (category, index) => {
                      return (
                        <li key={index}>
                          <Checkbox
                            label={category}
                            checked={this.categoryIsSelected(category)}
                            name={category}
                            onChange={() => this.toggleCategory(category)}
                          >
                            <ReactSVG
                              src={Utils.getIconeFromCategory(category)}
                            ></ReactSVG>
                          </Checkbox>
                          <span
                            className={`category-number ${
                              this.categoryIsSelected(category)
                                ? "selected"
                                : ""
                            }`}
                          >
                            {Utils.getNubmerApisByCategory(
                              category,
                              this.context.APIs.entries
                            )}
                          </span>
                        </li>
                      );
                    }
                  )}
                </ul>
              </Accordion>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Filters;
