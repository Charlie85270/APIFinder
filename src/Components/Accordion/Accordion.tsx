import React, { Component } from "react";
import "./Accordion.scss";

interface Props {
  title: string;
}
class Accordion extends Component<Props> {
  render() {
    const { title } = this.props;
    return (
      <div className="Accordion">
        <div className="Accordion-button">
          <span className="Accordion-button--label is-size-7">{title}</span>
        </div>
        <div className="Accordion-content">{this.props.children}</div>
      </div>
    );
  }
}

export default Accordion;
