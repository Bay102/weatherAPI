import React from 'react';
import { WEATHER_API, WEATHER_URL } from './constants';
import { DayCard } from './DayCard';
import { DegreeToggle } from './DegreeToggle';

export class ForecastContainer extends React.Component {
  state = {
    data: [],
    loading: false, //!!! ALWAYS NEED A VISUAL TO DISPLAY TO USER EITHER LOADING OR ERROR !!!! //
    error: false,
    degreeType: 'fahrenheit',
  };

  // * after component has rendered to DOM, this will run //
  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await fetch(`${WEATHER_URL}${WEATHER_API}`);
      if (response.ok) {
        const json = await response.json();
        const data = json.list
          .filter((day) => day.dt_txt.includes('00:00:00'))
          .map((item) => ({
            temp: item.main.temp,
            dt: item.dt,
            date: item.dt_txt,
            imgId: item.weather[0].id,
            desc: item.weather[0].description,
          }));
        this.setState({
          data,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          error: true,
        });
      }
    } catch (err) {
      console.error('Page Error');
    }
  }

  updateForecastDegree = ({ target: { value } }) => {
    this.setState({
      degreeType: value,
    });
  };

  render() {
    const { loading, error, data, degreeType } = this.state;
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
              <DayCard key={item.dt} degreeType={degreeType} data={item} />
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
