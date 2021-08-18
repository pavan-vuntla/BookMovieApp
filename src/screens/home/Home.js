import React,{useEffect, useState} from "react";
import Header from "../../common/header/Header";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from "@material-ui/core/GridListTileBar";
import "./Home.css";
import Filters from './Filters'
import moment from 'moment'




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

   const movieDetailsHandler=(e,details={...props})=>{
     console.log("details",details);
     props.history.push("/movie/" + details.id,
      details);

   }
   
  return (
    <div>
      <Header hideBookShow={true} {...props} />
      <h3>Upcoming Movies</h3>

      <GridList cols={6} cellHeight={250} >
        <Grid
          item

          style={{ display: "flex", flexDirection: "row" }}
          
        >
          {upcomingPoster.map((movie) => (
            <GridListTile
              key={movie.id}
              style={{
                height: "250px",
              }}
              onClick={(e) => movieDetailsHandler(e, movie)}
            >
              <img
                margin="auto"
                height="250px"
                src={movie.poster_url}
                alt={movie.title}
              />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </Grid>
      </GridList>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "76%", margin: "16px" }}>
          <GridList cellHeight={350} cols={4}>
            {releasedPoster
              .filter((s) => (s.status === "RELEASED"))
              .map((movie) => (
                <GridListTile
                  key={movie.id}
                  style={{ padding: "10px" }}
                  onClick={(e) => movieDetailsHandler(e, movie)}
                >
                  <img margin="auto" src={movie.poster_url} alt={movie.title} />
                  <GridListTileBar
                    title={movie.title}
                    subtitle={
                      <span>
                        Release Date:
                        {moment(new Date(movie.release_date)).format(
                          "ddd MMM D Y"
                        )}
                      </span>
                    }
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
        <div style={{ width: "24%", margin: "16px" }}>
          <Filters handleFilter={fetchFilterData}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
