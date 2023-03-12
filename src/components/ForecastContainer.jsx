import React from 'react';
import { DayCard } from './DayCard';
import { DegreeToggle } from './DegreeToggle';
import { WeatherService } from '../services';

const weather = new WeatherService();

export class ForecastContainer extends React.Component {
  state = {
    data: [],
    loading: false, //!!! ALWAYS NEED A VISUAL TO DISPLAY TO USER EITHER LOADING OR ERROR !!!! //
    error: false,
    degreeType: 'fahrenheit',
    speedType: 'mph',
  };

  // * after component has rendered to DOM, this will run //
  componentDidMount() {
    this.setState({ loading: true });
    weather.fetchFiveDayForecast().then(
      (res) => {
        if (res && res.response.ok) {
          this.setState({
            data: res.data,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      },
      (error) => {
        console.log(error);

        this.setState({
          loading: false,
          error: true,
        });
      }
    );
  }

  updateForecastDegree = ({ target: { value } }) => {
    this.setState({
      degreeType: value,
    });
  };

  speedOnChange = ({ target: { value } }) => {
    this.setState({
      speedType: value,
    });
  };

  render() {
    const { loading, error, data, degreeType, speedType } = this.state;
    return (
      <div className="container mt-5">
        <h1 className="display-1 jumbotron bg-light py-5 mb-b">5-Day Forecast</h1>
        <h5 className="text-muted">Las Vegas, NV</h5>
        <DegreeToggle
          degreeType={degreeType}
          updateForecastDegree={this.updateForecastDegree}
        />
        <div className="row justify-content-center">
          {!loading ? (
            data.map((item) => (
              <DayCard
                key={item.dt}
                data={item}
                degreeType={degreeType}
                speedType={speedType}
                speedOnChange={this.speedOnChange}
              />
            ))
          ) : (
            <div>loading...</div>
          )}
        </div>
        {error && <h3 className="text-danger">Error loading data 😞</h3>}
      </div>
    );
  }
}
