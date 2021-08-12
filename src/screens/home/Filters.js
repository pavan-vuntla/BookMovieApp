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

        const handleMovieChange = (event) => {
            setMoviesName(event.target.value);
         };

         const handleGenreChange = (event) => {
           setSelectedGener(event.target.value);
         };
         const handleArtistChange = (event) => {
         setSelectedArtist(event.target.value);
         };

    return (
      <Card>
        <CardHeader title="FIND MOVIES BY:" />
        <CardContent>
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="my-input">Movie Name</InputLabel>
            <Input
              id="my-input"
              value={movieName}
              onChange={handleMovieChange}
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
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
          <FormControl style={{ width: "100%" }}>
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
          <FormControl style={{ width: "100%" }}>
            <TextField
              label="Release Date Start"
              type="date"
              id="startdate"
              InputLabelProps={{
                shrink: true,
              }}
              value={releaseDateStart}
              
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <TextField
              label="Release Date End"
              type="date"
              id="enddate"
              InputLabelProps={{
                shrink: true,
              }}
              value={releaseDateEnd}
            />
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