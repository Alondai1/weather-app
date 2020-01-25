import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { getNextDaysForecast } from "../../store/actions/weatherActions";
import { setCurrentCity, toggleFavorite } from "../../store/actions/appActions";
import SearchBar from "../../components/SearchBar/SearchBar.cmp";
import ForecastList from "../../components/ForecastList/ForecastList.cmp";
import { Button, Icon, Popup, Loader } from "semantic-ui-react";
import weatherService from "../../services/WeatherService";

import "../../animations.scss";
import "./HomePage.style.scss";

class HomePage extends Component {
  state = {
    toggleCF: "c",
    popupIsOpen: false,
    isLoaderActive: true,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    if (!this.props.currentCity) {
      try {
        let userCity = await weatherService.getUserCity();    
        await dispatch(setCurrentCity(userCity));
        dispatch(getNextDaysForecast(this.props.currentCity.id));
      } catch (err) {
        let userCity = {id: 215854,description: "Israel",title: "Tel-Aviv",isFav: false};
        await dispatch(setCurrentCity(userCity));
        dispatch(getNextDaysForecast(this.props.currentCity.id));
        this.setState({ isLoaderActive: false });
        toast(`${err.message}, Try again later`, {
          className: "my-toest",
        });
      }
    } else {
      try {
        dispatch(getNextDaysForecast(this.props.currentCity.id));
      } catch (err) {
        toast(`${err.message}, Try again later`, {
          className: "my-toest",
        });
      }
    }
  }

  toggleCF = () => {
    this.setState(state => ({
      toggleCF: state.toggleCF === "c" ? "f" : "c",
    }));
  };

  handleToggleFavorite = async () => {
    this.setState({ popupIsOpen: true });
    this.timeout = setTimeout(() => {
      this.setState({ popupIsOpen: false });
    }, 2000);
    const currentCity = { ...this.props.currentCity };
    currentCity.isFav = !currentCity.isFav;
    const { dispatch } = this.props;
    try {
      dispatch(toggleFavorite(this.props.currentCity));
      dispatch(setCurrentCity(currentCity));
    } catch (err) {
      toast("There is a server problem, Try again later", {});
    }
  };

  setCurrentCity = async city => {
    const { dispatch } = this.props;
    try {
      await dispatch(setCurrentCity(city));
      dispatch(getNextDaysForecast(this.props.currentCity.id));
    } catch (err) {
      toast("There is a server problem, Try again later", {});
    }
  };

  handlePopupClose() {
    clearTimeout(this.timeout);
  }

  render() {
    return !this.props.nextDaysForecast ? (
      <Loader active={this.state.isLoaderActive}>Loading</Loader>
    ) : (
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="SlideIn"
      >
        <div className="home-page">
          <SearchBar setCurrentCity={this.setCurrentCity}></SearchBar>
          {this.props.currentCity ? (
            <Popup
              trigger={
                <Icon
                  name={`heart${
                    this.props.currentCity.isFav ? "" : " outline"
                  }`}
                  className="heart-icon"
                />
              }
              content={
                this.props.currentCity.isFav
                  ? "Added To Favorites"
                  : "Removed From Favorites"
              }
              on="click"
              open={this.state.popupIsOpen}
              onOpen={this.handleToggleFavorite}
              onClose={this.handlePopupClose}
              position="top right"
            />
          ) : (
            ""
          )}

          <div className="content-container">
            <h1 className="headline">{`${this.props.nextDaysForecast.Headline.Text} in ${this.props.currentCity.title}`}</h1>
            <Button
              onClick={this.toggleCF}
              basic
              color="grey"
              content={this.state.toggleCF === "c" ? "View In ℉" : "View In ℃"}
            />
            <ForecastList
              nextDaysForecast={this.props.nextDaysForecast}
              toggleCF={this.state.toggleCF}
            ></ForecastList>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = ({ weatherReducer, appReducer }) => {
  const { nextDaysForecast } = weatherReducer;
  const { currentCity } = appReducer;
  return {
    nextDaysForecast,
    currentCity,
  };
};

export default connect(mapStateToProps)(HomePage);
