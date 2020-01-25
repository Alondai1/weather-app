import React from "react";
import FavoritePreview from "../FavoritePreview/FavoritePreview.cmp";
import "./FavoritesList.style.scss";

function FavoritesList(props) {
  return (
    <div className="favorites-list">
      <ul>
        {props.favorites.map(fav => {
          return <FavoritePreview city={fav} key={fav.id}></FavoritePreview>;
        })}
      </ul>
    </div>
  );
}

export default FavoritesList;
