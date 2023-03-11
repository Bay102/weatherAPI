export const DegreeToggle = ({ updateForecastDegree, degreeType }) => {
  return (
    <>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          className="form-check-input"
          name="degree-type"
          id="celsius"
          value="celsius"
          onChange={updateForecastDegree}
          checked={degreeType === 'celsius'}
        />
        <label htmlFor="celsius">Celsius</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          className="form-check-input"
          name="degree-type"
          id="far"
          value="far"
          onChange={updateForecastDegree}
          checked={degreeType === 'fahrenheit'}
        />
        <label htmlFor="celsius">Fahrenheit</label>
      </div>
    </>
    
  );
};
