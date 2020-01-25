import React from "react";
import "./ForecastList.style.scss";
import ForecastPreview from "../ForecastPreview/ForecastPreview.cmp";

function ForecastList(props) {
  return (
    <div className="forecast-list">
      <ul>
        {props.nextDaysForecast.DailyForecasts.map(day => {
          return (
            <ForecastPreview
              day={day}
              key={day.Date}
              toggleCF={props.toggleCF}
            ></ForecastPreview>
          );
        })}
      </ul>
    </div>
  );
}

export default ForecastList;
