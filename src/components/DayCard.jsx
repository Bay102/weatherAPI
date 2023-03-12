import moment from 'moment/moment';

export const DayCard = ({ data, degreeType, speedType, speedOnChange }) => {
  const { temp, dt, imgId, desc, humidity, windSpeed, feelsLike } = data;

  const newDate = new Date();
  newDate.setTime(dt * 1000);

  const icon = `owf owf-${imgId} owf-4x`;

  const fahrenheit = Math.round(temp);
  const celsius = Math.round((fahrenheit - 32) * (5 / 9));

  const mph = Math.floor(windSpeed);
  const kph = Math.floor(mph * 1.60934);

  return (
    <div className="col-sm-3">
      <div className="card">
        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <i className={icon}></i>
        <h2>{degreeType === 'celsius' ? `${celsius}℃` : `${fahrenheit}℉`}</h2>
        <div className="card-body">
          <p className="card-text">{desc}</p>
          <div>Humidity: {humidity}</div>
          <div> WindSpeed: {speedType === 'mph' ? `${mph}` : `${kph}`}</div>
          <select onChange={speedOnChange} value={speedType} name="" id="">
            <option value="mph">mph</option>
            <option value="kph">kph</option>
          </select>
          <div> Feels Like: {feelsLike}℉</div>
        </div>
      </div>
    </div>
  );
};
