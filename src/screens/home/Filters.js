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



const Filters = () => {
    const[movieName,setMoviesName]=useState('');
    const [movieGener, setMovieGener] = useState([]);
    const [selectedGener, setSelectedGener] = useState([]);
    const [movieArtist, setMovieArtist] = useState([]);
    let data = [];

    useEffect(() => {
      async function fetchGenreData() {
                const response = await fetch(
                  "http://localhost:8085/api/v1/genres"
                );
                const json = await response.json();
                data = await json.genres;
        setMovieGener(data);
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
            setMovieArtist(data);
          }
          fetchArtistData();
        }, []);

         const handleChange = (event) => {
           setSelectedGener(event.target.value);
         };


    return (
      <Card>
        <CardHeader title="FIND MOVIES BY:" />
        <CardContent>
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="my-input">Movie Name</InputLabel>
            <Input id="my-input" value={movieName} />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="my-input">Geners</InputLabel>
            <Select
              id="genre-simple-select"
              multiple
              value={selectedGener}
              input={<Input />}
              onChange={handleChange}
            >
              {movieGener.map((name) => (
                <MenuItem key={name.genre} value={name.genre}>
                  <Checkbox checked={selectedGener.indexOf(name.genre) > -1} />
                  <ListItemText primary={name.genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="my-input">Artists</InputLabel>
            <Select id="artist-simple-select" multiple value={movieArtist}>
              {movieArtist.map((name) => (
                <MenuItem key={name.first_name} value={name.first_name}>
                  <Checkbox />
                  {`${name.first_name} ${name.last_name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="my-input" shrink>
              Release Date Start
            </InputLabel>
            <TextField type="date" id="my-input" value={movieName} />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="my-input" shrink>
              Release Date End
            </InputLabel>
            <TextField type="date" id="my-input" value={movieName} />
          </FormControl>
          <FormControl style={{ width: "100%", padding: "10px 0px" }}>
            <Button variant="contained" color="primary">
              APPLY
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    );
}
 
export default Filters;