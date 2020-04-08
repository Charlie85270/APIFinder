import React, { Component } from "react";
import "./Checkbox.scss";

interface Props {
  label?: string;
  name?: string;
  onChange?: (e: any) => void;
  checked: boolean;
  disabled?: boolean;
}

class Checkbox extends Component<Props> {
  render() {
    const { name, label, checked, onChange, disabled } = this.props;
    return (
      <label
        htmlFor={name}
        className={`chekbox-label checkbox ${checked ? " checked" : ""}`}
      >
        <input
          className="checkbox--input"
          name={name}
          id={name}
          type="checkbox"
          onChange={onChange}
          defaultChecked={checked}
          disabled={disabled}
        />
        {this.props.children}

        <span className="checkbox--label is-size-7">{label}</span>
      </label>
    );
  }
}
export default Checkbox;
