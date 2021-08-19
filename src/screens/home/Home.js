import React,{useEffect, useState} from "react";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from "@material-ui/core/GridListTileBar";
import "./Home.css";
import Filters from './Filters'

const styles = () => ({
   root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    },
    gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
    gridTile: {
    padding: "10px",
    },

  });
const Home = (props) => {
    let data = [];
    const[upcomingPoster,setUpcomingPoster]=useState([]);
    const[releasedPoster,setReleasedPoster]=useState([]);
    useEffect(() =>{
    async function fetchData() {
    const response = await fetch(
      `${props.baseUrl}movies`
    );
    const json = await response.json();
    data = await json.movies;
    setUpcomingPoster(data);
    setReleasedPoster(data);
   }
   fetchData();
   console.log("home",props);
   
   },[]);

  async function fetchFilterData(filterURL) {
          console.log(filterURL);
          const response = await fetch(
          filterURL
          );
          const json = await response.json();
          data = await json.movies;
          setReleasedPoster(data); 
          }
   const { classes } = props;      

   const movieDetailsHandler=(e,details)=>{
     console.log("details",details);
     props.history.push("/movie/" + details.id,
      details);
      }
   
  return (
    <div>
      <Header hideBookShow={true} baseUrl={props.baseUrl}/>
      <h3>Upcoming Movies</h3>
      <div className={classes.root}>
      <GridList className={classes.gridList} cols={6} cellHeight={250} >
          {upcomingPoster.map((movie) => (
            <GridListTile
              key={movie.id}
              onClick={(e) => movieDetailsHandler(e, movie)}
            >
              <img
                src={movie.poster_url}
                alt={movie.title}
              />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
      </GridList>
      </div>
      <div className="bottom">
        <div className="released margin">
          <GridList cellHeight={350} cols={4}>
            {releasedPoster
              .filter((s) => (s.status === "RELEASED"))
              .map((movie) => (
                <GridListTile
                  key={movie.id}
                  className={classes.gridTile}
                  onClick={(e) => movieDetailsHandler(e, movie)}
                >
                  <img src={movie.poster_url} alt={movie.title} />
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
          <Filters handleFilter={fetchFilterData}/>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
