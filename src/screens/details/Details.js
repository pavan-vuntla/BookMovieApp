import React from 'react';
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import "./Details.css"
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import YouTube from "react-youtube";
import StarRating from "../../common/rating/Rating";


const styles = () => ({
  emptyStar: {
    color: "black",
  },
  marginTop16:{
      marginTop:"16px"
  },
  artistMargin:{
       marginTop:"16px",
      marginBottom:"16px"
  }
});
function Details(props) {
    
    const regex =  new RegExp(/(?<==)(\w*)/gm);
    
    let videoId = props.location.state.trailer_url.match(regex);
    console.log("details",regex);
    console.log("details",videoId);
  const backHomeHandler = () => {

    props.history.push("/")
  };

  const { classes } = props;

  const opts = {
    
    playerVars: {
      autoplay: 0,
      
    },
  };

    const VideoOnReady=(e)=> {
    e.target.pauseVideo();
    console.log(e.target);
  };



  return (
    <div>
      <Header hideBookShow={false} {...props} />
      <div className="back" onClick={backHomeHandler}>
        {`< Back to Home`}
      </div>
      <div className="details">
        <div className="left" >
          <img
            src={props.location.state.poster_url}
            alt={props.location.state.title}
            className="imgwidth"
          />
        </div>
        <div className="middle">
          <Typography variant="headline" component="h2">
            {props.location.state.title}
          </Typography>
          <Typography>
            <strong>Genre: </strong>
            {props.location.state.genres.join(",")}
          </Typography>
          <Typography>
            <strong>Duration: </strong>
            {props.location.state.duration}
          </Typography>
          <Typography>
            <strong>Release Date: </strong>
            {new Date(props.location.state.release_date).toDateString()}
          </Typography>
          <Typography>
            <strong>Rating: </strong>
            {props.location.state.rating}
          </Typography>
          <Typography className={classes.marginTop16}>
            <strong>Plot: </strong>(
            <a href={props.location.state.wiki_url}>Wiki Link</a>)
            {props.location.state.storyline}
          </Typography>
          <Typography className={classes.marginTop16}>
            <strong>Trailer: </strong>
          </Typography>
          <YouTube videoId={videoId[0]} opts={opts} host= 'https://www.youtube.com' onReady={VideoOnReady} />;
        </div>
        <div className="right">
          <Typography>
            <strong>Rate this movie:</strong>
          </Typography>

          <Typography component={'span'} style={{width:"120px"}}>
            <StarRating />
          </Typography>
          <Typography className={classes.artistMargin}>
            <strong>Artists:</strong>
          </Typography>

          <GridList cols={2}>
            {props.location.state.artists?props.location.state.artists.map((artist) => (
              <GridListTile key={artist.id} style={{ padding: "10px" }}>
                <img
                  margin="auto"
                  src={artist.profile_url}
                  alt={artist.first_name}
                />
                <GridListTileBar
                  title={`${artist.first_name} ${artist.last_name}`}
                />
              </GridListTile>
            )):null}
          </GridList>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Details);