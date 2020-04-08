import { createBrowserHistory } from "history";
import React, { Component, Suspense } from "react";
import { Route, Router } from "react-router-dom";
import { setCurrentLanguage } from "./i18n";
import myData from "./data/api.json";
import "./styles/variables.scss";
import AppContext from "./AppContext";
import { AppState, SearchFilters } from "./AppState";
import { HOME } from "./routes";
import Header from "./Components/Header/Header";
import Filters from "./Components/Filters/Filters";
import "./App.scss";
import Utils from "./Utils/Utils";
import LoadingPage from "./Pages/Loading/LoadingPage";
import { Datas } from "./Models/Datas/Datas";
import ReactGA from "react-ga";
import Home from "./Pages/Home";

ReactGA.initialize("UA-163030135-1");
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component<{}, AppState> {
  history = createBrowserHistory();

  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: false,
      APIs: { count: 0, entries: [] },
      filters: {
        query: "",
        categories: [],
        https: false,
        cors: false,
        auth: false
      },

      setFiltersValue: this.setFiltersValue,
      i18n: {
        changeLanguage: this.changeLanguage
      }
    };
  }

  getDatas = (): Promise<Datas> => {
    return fetch("https://api.publicapis.org/entries").then(res => res.json());
  };

  getTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme !== "light" && theme !== "dark") {
      localStorage.setItem("theme", "dark");
    }
    return theme;
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getDatas()
      .then(response => {
        const dataState = {
          ...response,
          entries: Utils.sortApiByName(response.entries)
        };

        this.setState({ APIs: dataState });
        ReactGA.event({
          category: "Data",
          action: "Success fetch APIs data"
        });
      })
      .catch(error => {
        ReactGA.event({
          category: "Data",
          action: "Error to fetch APIs data"
        });
        const dataState = {
          ...myData,
          entries: Utils.sortApiByName(myData.entries)
        };
        this.setState({ APIs: dataState });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  scrollToTop = () => {
    const el = document.getElementById("content-page");

    if (el) {
      el.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      el.focus();
    }
  };

  setFiltersValue = (filters: SearchFilters) => {
    this.setState({ filters });
    this.scrollToTop();
  };

  changeLanguage = (lang: string) => {
    setCurrentLanguage(lang.toLocaleLowerCase());
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingPage></LoadingPage>;
    }

    return (
      <AppContext.Provider value={this.state}>
        <Router history={this.history}>
          <Suspense fallback={<LoadingPage></LoadingPage>}>
            <main
              id="main"
              className={`wrapper ${this.getTheme()}`}
              tabIndex={-1}
            >
              <Header />
              <div className="columns is-desktop">
                <div className="column desktop-filter is-one-fifth is-hidden-touch">
                  <Filters />
                </div>

                <div className="column">
                  <div className="page-content" id="content-page">
                    <Route path={HOME} component={Home} />
                  </div>
                </div>
              </div>
            </main>
          </Suspense>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
