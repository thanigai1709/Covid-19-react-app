import React, { Component } from "react";
class CountryTracker extends Component {
  state = {};
  render() {
    if (this.props.requestStatus) {
      return (
        <div className="country-stat-init">
          <div>
            <div className="lds-heart">
              <div></div>
            </div>
            <div className="loader-txt">Loading..</div>
          </div>
        </div>
      );
    } else if (!this.props.requestStatus && this.props.countryStats != null) {
      return (
        <div>
          <div className="row g-mb36">
            <div className="col-sm-4">
              <div className="stat-wrp text-center">
                <div className="stat-type">
                  <i className="fas fa-smile-beam"></i>
                </div>
                <div className="stat-val">
                  {this.props.countryStats.recovered.toLocaleString()}
                </div>
                <div className="stat-title">Recovered</div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="stat-wrp text-center">
                <div className="stat-type">
                  <i className="fas fa-frown"></i>
                </div>
                <div className="stat-val">
                  {this.props.countryStats.confirmed.toLocaleString()}
                </div>
                <div className="stat-title">Confirmed</div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="stat-wrp text-center">
                <div className="stat-type">
                  <i className="fas fa-dizzy"></i>
                </div>
                <div className="stat-val">
                  {this.props.countryStats.deaths.toLocaleString()}
                </div>
                <div className="stat-title">Deaths</div>
              </div>
            </div>
          </div>
          <div className="showing-for text-right">
            Showing stats for <span>{this.props.showingFor}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="country-stat-init">
          <div>Please select any country to view stats</div>
        </div>
      );
    }
  }
}

export default CountryTracker;
