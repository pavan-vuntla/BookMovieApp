import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import "./Home.css";
import Filters from "./Filters";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  gridListMain: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
});
const Home = (props) => {
  let data = [];
  const [upcomingPoster, setUpcomingPoster] = useState([]);
  const [releasedPoster, setReleasedPoster] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${props.baseUrl}movies?limit=1000`);
      const json = await response.json();
      data = await json.movies;
      setUpcomingPoster(data);
      setReleasedPoster(data);
    }
    fetchData();
  }, []);

  async function fetchFilterData(filterURL) {
    const response = await fetch(filterURL);
    const json = await response.json();
    data = await json.movies;
    setReleasedPoster(data);
  }
  const { classes } = props;

  const movieDetailsHandler = (e, details) => {
    props.history.push("/movie/" + details.id, details);
  };

  return (
    <div>
      <Header hideBookShow={true} baseUrl={props.baseUrl} />
      <h3>Upcoming Movies</h3>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={6} cellHeight={250}>
          {upcomingPoster
            .filter((s) => s.status === "PUBLISHED")
            .map((movie) => (
              <GridListTile key={movie.id}>
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="movie-poster"
                />
                <GridListTileBar title={movie.title} />
              </GridListTile>
            ))}
        </GridList>
      </div>
      <div className="bottom">
        <div className="released margin">
          <GridList cols={4} cellHeight={350} className={classes.gridListMain}>
            {releasedPoster
              .filter((s) => s.status === "RELEASED")
              .map((movie) => (
                <GridListTile
                  key={movie.id}
                  onClick={(e) => movieDetailsHandler(e, movie)}
                  className="released-movie-grid-item"
                >
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="moviesImg"
                  />
                  <GridListTileBar
                    title={movie.title}
                    subtitle={
                      <span>
                        Release Date:
                        {new Date(movie.release_date).toDateString()}
                      </span>
                    }
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
        <div className="filter margin">
          <Filters handleFilter={fetchFilterData} baseUrl={props.baseUrl} />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
