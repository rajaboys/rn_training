import React, { PureComponent } from 'react';

class WeatherApp extends PureComponent {
  state = {
    cities: [
      {
        name: 'ahmedabad',
        temp: 38,
      },
      {
        name: 'pune',
        temp: 30,
      },
    ],
  };

  render() {
    return (
      <div>
        <h1>Weather App</h1>
      </div>
    );
  }
}

export default WeatherApp;
