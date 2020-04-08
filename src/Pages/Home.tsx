import React, { Component, ContextType } from "react";
import "./Home.scss";
import AppContext from "../AppContext";
import Card from "../Components/Card/Card";
import { Api } from "../Models/Api/Api";
import Utils from "../Utils/Utils";
import { AppState } from "../AppState";
import Masonry from "react-masonry-css";
import Footer from "../Components/Footer/Footer";
import LoadingPage from "./Loading/LoadingPage";

interface State {
  currentItem: number;
  itemPerPage: number;
  apis: Api[];
  totalCount: number;
}

class Home extends Component<{}, State> {
  static contextType = AppContext;
  context!: ContextType<typeof AppContext>;
  constructor(props: {}) {
    super(props);
    this.state = {
      itemPerPage: 12,
      currentItem: 0,
      apis: [],
      totalCount: 0
    };
  }

  handleScroll = (event: any) => {
    const content = document.getElementById("content-page");
    if (
      content &&
      content.scrollTop + content.clientHeight >= content.scrollHeight
    ) {
      this.getNextApis();
    }
  };

  componentDidMount() {
    const pageContent = document.getElementById("content-page");
    if (pageContent) {
      pageContent.addEventListener("scroll", this.handleScroll);
    }
    this.getNextApis();
  }
  componentWillUnmount() {
    const pageContent = document.getElementById("content-page");
    if (pageContent) {
      pageContent.removeEventListener("scroll", this.handleScroll);
    }
  }

  componentWillReceiveProps(nextProps: any, nextContext: AppState) {
    if (Utils.filtersHaveChanged(nextContext.filters, this.context.filters)) {
      window.scrollTo(0, 0);
      this.setState({ currentItem: 0, apis: [] }, () => {
        this.getNextApis();
      });
    }
    if (
      this.state.apis.length === 0 &&
      this.context.APIs.count !== nextContext.APIs.count
    ) {
      window.scrollTo(0, 0);
      this.setState({ currentItem: 0, apis: [] }, () => {
        this.getNextApis();
      });
    }
  }

  getNextApis = () => {
    const { itemPerPage, currentItem } = this.state;
    const apis = Utils.getFilteredApis(
      this.context.APIs.entries,
      this.context.filters
    );

    this.setState({
      totalCount: apis.length,
      currentItem: currentItem + itemPerPage,
      apis: this.state.apis.concat(
        apis.slice(currentItem, currentItem + itemPerPage)
      )
    });
  };

  render() {
    const breakpointColumnsObj = {
      default: 4,
      1100: 3,
      800: 2,
      600: 1
    };

    const { totalCount } = this.state;

    if (this.context.isLoading) {
      return <LoadingPage></LoadingPage>;
    }
    return (
      <div className="Home">
        <span className="result is-size-4">
          <h1 className="result-text">{totalCount} Api(s) found</h1>
        </span>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {this.state.apis.map((api, key) => {
            return <Card key={key} data={api}></Card>;
          })}
        </Masonry>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
