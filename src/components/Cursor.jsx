import React, { Component } from "react";
import cursor from "../images/virus.png";
class Cursor extends Component {
  state = {};

  componentDidMount() {
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", e => {
      cursor.setAttribute(
        "style",
        "top:" + (e.pageY - 25) + "px; left:" + (e.pageX - 25) + "px;"
      );
    });
  }

  render() {
    return (
      <div className="cursor">
        <img src={cursor} alt="pointer" />
      </div>
    );
  }
}

export default Cursor;
