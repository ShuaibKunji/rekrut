import React, { Component } from "react";
import { WeatherForecast } from "../core/endpoints";

class WeatherTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatheritems: [],
    };
  }

  getWeather() {
    this.setState({ weatheritems: [] });
    fetch(WeatherForecast.GET_FORECAST)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ weatheritems: data });
      });
  }

  render() {
    let infoTable =
      this.state.weatheritems.length != 0 ? (
        <table
          className="table table-striped table-md"
          style={{ border: "solid", marginTop: "5px" }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Summary</th>
              <th>Temperature in Celcius</th>
              <th>Temperature in Farenheit</th>
            </tr>
          </thead>
          {this.state.weatheritems.map((item) => {
            return (
              <tbody>
                <tr>
                  <td>{item.date}</td>
                  <td>{item.summary}</td>
                  <td>{item.temperatureC}</td>
                  <td>{item.temperatureF}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : null;
    return (
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
          marginTop: "5px",
        }}
      >
        <button
          className="btn btn-success m5"
          onClick={() => {
            this.getWeather();
          }}
        >
          Get Weather Information
        </button>
        {infoTable}
      </div>
    );
  }
}

export default WeatherTable;
