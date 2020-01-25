import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "../../animations.scss";
import Segment from "../../components/Segment/Segment.cmp";
import FavoritesList from "../../components/FavoritesList/FavoritesList.cmp";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { getFavorites } from "../../store/actions/appActions";

class FavoritesPage extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    try {
      await dispatch(getFavorites());
    } catch (err) {
      toast("There is a server problem, Try again later", {
      });
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="SlideIn"
      >
        <div>
          {this.props.favorites.length ? (
            <FavoritesList favorites={this.props.favorites}></FavoritesList>
          ) : (
            <Segment></Segment>
          )}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = ({ appReducer }) => {
  const { favorites } = appReducer;
  return {
    favorites,
  };
};

export default connect(mapStateToProps)(FavoritesPage);
