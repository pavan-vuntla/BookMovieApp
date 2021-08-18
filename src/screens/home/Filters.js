import React, { useEffect, useState } from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";


const styles = (theme) => ({
  cardComponent: {
    margin: theme.spacing.unit,
    minWidth: "240px",
    maxWidth: "240px",
  },

  findMovie: {
    color: theme.palette.primary.light,
  },
});


const Filters = (props) => {
    const[movieName,setMoviesName]=useState('');
    const [movieGener, setMovieGener] = useState([]);
    const [selectedGener, setSelectedGener] = useState([]);
    const [movieArtist, setMovieArtist] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState([]);
    const [releaseDateStart, setReleaseDateStart] = useState("");
    const [releaseDateEnd, setReleaseDateEnd] = useState("");
    let data = [];



    useEffect(() => {
      async function fetchGenreData() {
                const response = await fetch(
                  "http://localhost:8085/api/v1/genres"
                );
                const json = await response.json();
                data = await json.genres;
                
        setMovieGener(data.map((g) => g.genre));
        
      }
      fetchGenreData();
    }, []);

        useEffect(() => {
          async function fetchArtistData() {
             const response = await fetch(
               "http://localhost:8085/api/v1/artists"
             );
             const json = await response.json();
             data = await json.artists;
            setMovieArtist(data.map(a=>`${a.first_name} ${a.last_name}`));
          }
          fetchArtistData();
        }, []);

        const filterClickHandler =()=>{
        const filterURL=`http://localhost:8085/api/v1/movies?genre=${selectedGener.join(",")}&title=${movieName}&artists=${selectedArtist.join(",")}&start_date=${releaseDateStart}&end_date=${releaseDateEnd}`;
        props.handleFilter(filterURL);

        }

        const handleMovieChange = (event) => {
            setMoviesName(event.target.value);
         };

         const handleGenreChange = (event) => {
           setSelectedGener(event.target.value);
         };
         const handleArtistChange = (event) => {
         setSelectedArtist(event.target.value);
         };

         const dateChangeHandler=(e,type)=>{
           const releaseDate=e.target.value;
           
           console.log(releaseDate)
           type==="startdate"?setReleaseDateStart(releaseDate):setReleaseDateEnd(releaseDate);

         }

         const { classes } = props;

    return (
      <Card>
        <CardHeader
          classes={{ title: classes.findMovie }}
          title="FIND MOVIES BY:"
        />
        <CardContent>
          <FormControl className={classes.cardComponent}>
            <InputLabel htmlFor="my-input">Movie Name</InputLabel>
            <Input
              id="my-input"
              value={movieName}
              onChange={handleMovieChange}
            />
          </FormControl>
          <FormControl className={classes.cardComponent}>
            <InputLabel htmlFor="my-input">Geners</InputLabel>
            <Select
              id="genre-simple-select"
              multiple
              value={selectedGener}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              onChange={handleGenreChange}
            >
              {movieGener.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedGener.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.cardComponent}>
            <InputLabel htmlFor="my-input">Artists</InputLabel>
            <Select
              id="artist-simple-select"
              multiple
              value={selectedArtist}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              onChange={handleArtistChange}
            >
              {movieArtist.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedArtist.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.cardComponent}>
            <TextField
              label="Release Date Start"
              type="date"
              id="startdate"
              InputLabelProps={{
                shrink: true,
              }}
              value={releaseDateStart}
              onChange={(e)=>dateChangeHandler(e,"startdate")}
              format="dd-mm-yyyy"
            />
          </FormControl>
          <FormControl className={classes.cardComponent}>
            <TextField
              label="Release Date End"
              type="date"
              id="enddate"
              InputLabelProps={{
                shrink: true,
              }}
              value={releaseDateEnd}
              onChange={(e)=>dateChangeHandler(e,"enddate")}
            />
          </FormControl>
          <FormControl className={classes.cardComponent}>
            <Button variant="contained" color="primary" onClick={filterClickHandler}>
              APPLY
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    );
}
 
export default withStyles(styles)(Filters);