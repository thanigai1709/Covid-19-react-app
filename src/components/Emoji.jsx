import React, { Component } from "react";
class Emoji extends Component {
  state = {};
  componentDidMount() {
    document.querySelector("body").addEventListener("mousemove", e => {
      let eye = document.querySelectorAll(".eye");
      eye.forEach(function(eye) {
        let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
        let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
        let radian = Math.atan2(e.pageX - x, e.pageY - y);
        let rot = radian * (180 / Math.PI) * -1 + 270;
        eye.style.transform = "rotate(" + rot + "deg)";
      });
    });
  }
  render() {
    return (
      <div className="emoji-wrp">
        <div className="face">
          <div className="eyes">
            <span className="eye"></span>
            <span className="eye"></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Emoji;
