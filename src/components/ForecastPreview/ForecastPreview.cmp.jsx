import React from "react";
import Moment from "react-moment";
import { Card, Icon, Image } from "semantic-ui-react";
import "./ForecastPreview.style.scss";

class ForecastPreview extends React.Component {
  state = {
    Ftemperature: `${this.props.day.Temperature.Maximum.Value} ℉`,
    Ctemperature: `${Math.round(
      ((this.props.day.Temperature.Maximum.Value - 32) * 5) / 9
    )} ℃`,
  };

  render() {
    const iconKey = this.props.day.Day.Icon;
    const dateToFormat = this.props.day.Date;
    return (
      <li className="forecast-preview">
        <Card className="list-item">
          <Image
            src={`https://developer.accuweather.com/sites/default/files/${
              iconKey < 10 ? "0" + iconKey : iconKey
            }-s.png`}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>
              <Moment format="ddd DD/MM/YY">{dateToFormat}</Moment>
            </Card.Header>
            <Card.Meta>{this.props.day.Day.IconPhrase}</Card.Meta>
            <Card.Description>
              {this.props.toggleCF === "c"
                ? this.state.Ctemperature
                : this.state.Ftemperature}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a href={this.props.day.Link}>
              <Icon name="question circle" />
              Read More
            </a>
          </Card.Content>
        </Card>
      </li>
    );
  }
}

export default ForecastPreview;
