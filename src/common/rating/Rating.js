import React, { useState } from "react";
import "./Rating.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  selectedStar: {
    color: "yellow",
  },
});

const StarRating = (props, { totalStars = 5 }) => {
  const [starsSelected, selectStar] = useState(0);
  const { classes } = props;

  const Star = ({ selected = false, onClick = (f) => f }) => (
    <StarBorderIcon
      className={selected ? classes.selectedStar : "star"}
      onClick={onClick}
    />
  );

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => selectStar(i + 1)}
        />
      ))}
    </div>
  );
};

export default withStyles(styles)(StarRating);
