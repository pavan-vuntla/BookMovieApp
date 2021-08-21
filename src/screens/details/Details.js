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
    },
    ratingWidth:{
        width:"120px"
    }
  });
  function Details(props) {
    const videoId = props.location.state.trailer_url.split("=").pop();
    console.log("details",videoId);
    const backHomeHandler = () => {
        props.history.push("/")
        };

  const { classes } = props;

  const opts = {
      
      playerVars: {
        autoplay: 0,
        'origin': 'http://localhost:3000',
        
      },
    };

  const VideoOnReady=(e)=> {
      e.target.pauseVideo();
      console.log("Video",e.target);
    };

    return (
      <div>
        <Header hideBookShow={false} baseUrl={props.baseUrl} history={props.history} match={props.match} location={props.location}/>
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
            <YouTube videoId={videoId} opts={opts} host= 'http://www.youtube.com' onReady={VideoOnReady} />;
          </div>
          <div className="right">
            <Typography>
              <strong>Rate this movie:</strong>
            </Typography>

            <Typography component={'span'} className={classes.ratingWidth}>
              <StarRating />
            </Typography>
            <Typography className={classes.artistMargin}>
              <strong>Artists:</strong>
            </Typography>
            {props.location.state.artists?
            <GridList cols={2}>
              {props.location.state.artists.map((artist) => (
                <GridListTile key={artist.id} >
                  <img
                    margin="auto"
                    src={artist.profile_url}
                    alt={artist.first_name}
                  />
                  <GridListTileBar
                    title={`${artist.first_name} ${artist.last_name}`}
                  />
                </GridListTile>
              ))}
            </GridList>:null}
          </div>
        </div>
      </div>
    );
  }

  export default withStyles(styles)(Details);