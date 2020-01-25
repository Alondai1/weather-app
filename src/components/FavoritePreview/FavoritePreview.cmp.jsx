import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleFavorite, setCurrentCity } from "../../store/actions/appActions";
import { Card, Image, Button } from "semantic-ui-react";
import weatherService from "../../services/WeatherService";
import "./FavoritePreview.style.scss";

class FavoritePreview extends React.Component {
  state = { cityInfo: null };

  async componentDidMount() {
    const cityInfo = await weatherService.getCityInfo(this.props.city.id);
    this.setState({ cityInfo });
  }

  setCurrentCity = async () => {
    const { dispatch } = this.props;
    await dispatch(setCurrentCity(this.props.city));
    this.props.history.push("/");
  };

  toggleFavorite = async () => {
    const currentCity = { ...this.props.city };
    currentCity.isFav = !currentCity.isFav;
    const { dispatch } = this.props;
    await dispatch(toggleFavorite(this.props.city));
    if (currentCity.id === this.props.currentCity.id)
      await dispatch(setCurrentCity(currentCity));
  };

  render() {
    return (
      this.state.cityInfo && (
        <li className="favorite-preview">
          <Card className="list-item">
            <Image
              src={`https://developer.accuweather.com/sites/default/files/${
                this.state.cityInfo.WeatherIcon < 10
                  ? "0" + this.state.cityInfo.WeatherIcon
                  : this.state.cityInfo.WeatherIcon
              }-s.png`}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Meta>{this.props.city.title}</Card.Meta>
              <Card.Description>
                {this.state.cityInfo.WeatherText}
                <br />
                {this.state.cityInfo.Temperature.Metric.Value + "℃"}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                basic
                color="teal"
                onClick={this.toggleFavorite}
                className="remove-btn"
              >
                Remove
              </Button>
              <Button color="teal" onClick={this.setCurrentCity}>
                See More
              </Button>
            </Card.Content>
          </Card>
        </li>
      )
    );
  }
}

const mapStateToProps = ({ appReducer }) => {
  const { currentCity } = appReducer;
  return {
    currentCity,
  };
};
export default withRouter(connect(mapStateToProps)(FavoritePreview));
