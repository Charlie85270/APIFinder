import React, { Component, ContextType } from "react";
import AppContext from "../../AppContext";
import "./Card.scss";
import { Api } from "../../Models/Api/Api";
import { ReactComponent as AuthIcon } from ".././../Images/auth.svg";
import { ReactComponent as HttpsIcon } from ".././../Images/https.svg";
import { ReactComponent as CorsIcon } from ".././../Images/cors.svg";
import Utils from "../../Utils/Utils";
import ReactGA from "react-ga";
interface Props {
  data: Api;
}
interface State {
  imgUrl: string;
}

class Card extends Component<Props, State> {
  static contextType = AppContext;
  context!: ContextType<typeof AppContext>;
  constructor(props: Props) {
    super(props);
    this.state = {
      imgUrl: `//logo.clearbit.com/${Utils.getDomainNameFromUrl(
        props.data.Link
      )}`
    };
  }
  onError(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      imgUrl: "api.png"
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div
        className="Card"
        role="button"
        onClick={() => {
          ReactGA.event({
            category: "Click on Api card",
            action: data.Link
          });
          window.open(data.Link, "_blank");
        }}
      >
        <div className="Card-header">
          <img
            title={data.Category}
            src={Utils.getImageFromCategory(data.Category)}
            className="image-header"
            alt={`${data.Category} API`}
          ></img>
        </div>
        <div className="Card-information">
          <div className="Card-header-title">
            <span className="is-size-4" title={data.API}>
              {Utils.truncateString(data.API, 20)}
            </span>
          </div>
          <span className="Card-header--icones">
            {data.HTTPS && <HttpsIcon />}
            {data.Cors && <CorsIcon />}
            {data.Auth && <AuthIcon />}
          </span>
          <h2 className="Card-information-category is-size-7">
            {data.Category}
          </h2>

          <span className="Card-information-url-icon">
            <img
              alt={`Icon API ${data.Category}`}
              onError={this.onError.bind(this)}
              src={this.state.imgUrl}
            />
          </span>
        </div>
        <div className="Card-description is-size-6" title={data.Description}>
          {Utils.truncateString(data.Description, 60)}
        </div>
      </div>
    );
  }
}

export default Card;
