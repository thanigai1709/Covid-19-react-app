import React, { Component } from "react";
import axios from "axios";
import CountryTracker from "./CountryTracker";
import Emoji from "./Emoji";
import Cursor from "./Cursor";
class Tracker extends Component {
  state = {
    globalStats: {
      recovered: "",
      confirmed: "",
      deaths: ""
    },
    loading: true,
    countries: [],
    isSelected: false,
    countryStats: null,
    showingFor: ""
  };
  async componentDidMount() {
    axios.get("https://covid19.mathdro.id/api/").then(resp => {
      this.setState({
        globalStats: {
          recovered: resp.data.recovered.value,
          confirmed: resp.data.confirmed.value,
          deaths: resp.data.deaths.value
        }
      });
      //getting countries for country based stats
      axios.get("https://covid19.mathdro.id/api/countries").then(cresp => {
        this.setState({
          loading: false,
          countries: cresp.data.countries
        });
      });
    });
  }

  handleSelectCountry = e => {
    this.setState({
      isSelected: true,
      showingFor: e.target.value
    });
    axios
      .get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
      .then(resp => {
        this.setState({
          isSelected: false,
          countryStats: {
            recovered: resp.data.recovered.value,
            confirmed: resp.data.confirmed.value,
            deaths: resp.data.deaths.value
          }
        });
        console.log(this.state.countryStats);
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="tracker-page-loader-wrp">
          <div className="tracker-page-loader-innr">
            <div className="tracker-page-loader-mdl-algn">
              <div className="lds-heart">
                <div></div>
              </div>
              <div className="loader-txt">Loading..</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <Cursor />
          <div className="tracker-main-wrp g-pt52 g-pb52">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="tracker-sidebar-wrp">
                    <div className="g-mb36">
                      <Emoji />
                    </div>
                    <div className="precuations g-mb36">
                      <div className="stats-title">Stay Home. Save Lives.</div>
                      <div className="tracker-content">
                        <ul>
                          <li>
                            <span>Stay</span> home
                          </li>
                          <li>
                            <span>Keep</span> a safe distance
                          </li>
                          <li>
                            <span>Wash</span> hands often
                          </li>
                          <li>
                            <span>Cover</span> your cough
                          </li>
                          <li>
                            <span>Sick?</span> Call the helpline
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="dev-info g-mb16">
                    Data sources from John Hopkins University CSSE
                  </div>
                  <div className="dev-info g-mb8">
                    Developed by Thanigai Babu
                  </div>
                  <div className="follow g-mb8">
                    <a
                      href="https://www.instagram.com/thanigai_babu_17/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/thanigai-babu-65040b187/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href="https://github.com/usernameXavier"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="stats-title">Global Stats</div>
                  <div className="row g-mb36">
                    <div className="col-sm-4">
                      <div className="stat-wrp text-center">
                        <div className="stat-type">
                          <i className="fas fa-smile-beam"></i>
                        </div>
                        <div className="stat-val">
                          {this.state.globalStats.recovered.toLocaleString()}
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
                          {this.state.globalStats.confirmed.toLocaleString()}
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
                          {this.state.globalStats.deaths.toLocaleString()}
                        </div>
                        <div className="stat-title">Deaths</div>
                      </div>
                    </div>
                  </div>
                  <div className="stats-title">Country Stats</div>
                  <div className="country-slct-wrp">
                    <select
                      className="form-control"
                      onChange={this.handleSelectCountry}
                      defaultValue={"Select"}
                    >
                      <option disabled value="Select">
                        Select Country
                      </option>
                      {this.state.countries.map(country => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <CountryTracker
                    requestStatus={this.state.isSelected}
                    countryStats={this.state.countryStats}
                    showingFor={this.state.showingFor}
                  />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Tracker;
