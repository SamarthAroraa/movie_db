/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{useState, useEffect}from "react";
import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

const Tables =(props) => {
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(async ()=>{
      let this_movies = await (await axios.get(process.env.REACT_APP_API_URI+'movies')).data;
      let this_tv = await (await axios.get(process.env.REACT_APP_API_URI+'tv-shows')).data;
      let this_actors = await (await axios.get(process.env.REACT_APP_API_URI+'actors')).data;
      let this_directors = await (await axios.get(process.env.REACT_APP_API_URI+'directors')).data;
      let this_genre = await (await axios.get(process.env.REACT_APP_API_URI+'genres')).data;
      
      //make a movies array of objects
      let update_movies = [];
      for(let i =0 ; i < this_movies.length; i++){
        let obj = {};
        obj.name=this_movies[i].name;
        obj.genre=this_movies[i].genre.name;
        obj.director=this_movies[i].director.name;
        let actor_array = []
        for(let j = 0 ; j < this_movies[i].actors.length; j++){
            actor_array.push(this_movies[i].actors[j].name);
        }
        let actor_string = actor_array.join(', ');
        obj.actors = actor_string;
        let sum_ratings = 0.0 ;
        for(let j = 0 ; j < this_movies[i].ratings.length; j++){
          sum_ratings+=parseFloat(this_movies[i].ratings[j].stars);
        }
        if(sum_ratings)
        obj.rating = (sum_ratings/this_movies[i].ratings.length).toFixed(2);
        update_movies.push(obj);

      }
      console.log(update_movies)
      setMovies(update_movies);


      //make a tv array of objects
      let update_tv = [];
      for(let i =0 ; i < this_tv.length; i++){
        let obj = {};
        obj.name=this_tv[i].name;
        obj.genre=this_tv[i].genre.name;
        obj.director=this_tv[i].director.name;
        let actor_array = []
        for(let j = 0 ; j < this_tv[i].actors.length; j++){
            actor_array.push(this_tv[i].actors[j].name);
        }
        let actor_string = actor_array.join(', ');
        obj.actors = actor_string;
        let sum_ratings = 0.0 ;
        for(let j = 0 ; j < this_tv[i].ratings.length; j++){
          sum_ratings+=parseFloat(this_tv[i].ratings[j].stars);
        }
        if(sum_ratings)
        obj.rating = (sum_ratings/this_tv[i].ratings.length).toFixed(2);
        update_tv.push(obj);

      }
      setTv(update_tv);

      //make a genre array of objects
      let update_genre = [];
      for(let i =0 ; i < this_genre.length; i++){
        let obj = {};
        obj.name=this_genre[i].name;
        let tv_shows = []
        for(let j = 0; j < this_genre[i].tv_shows.length; j++){
          tv_shows.push(this_genre[i].tv_shows[j].name);
        }
        let tv_string = tv_shows.join(', ');
        obj.tv_shows= tv_string;

        let movies = []
        for(let j = 0; j < this_genre[i].movies.length; j++){
          movies.push(this_genre[i].movies[j].name);
        }
        let movie_string = movies.join(', ');
        obj.movies= movie_string;

        update_genre.push(obj);

      }
      setGenres(update_genre);

       //make a actor array of objects
       let update_actors = [];
       for(let i =0 ; i < this_actors.length; i++){
         let obj = {};
         obj.name=this_actors[i].name;
         let tv_shows = []
         for(let j = 0; j < this_actors[i].tv_shows.length; j++){
           tv_shows.push(this_actors[i].tv_shows[j].name);
         }
         let tv_string = tv_shows.join(', ');
         obj.tv_shows= tv_string;
 
         let movies = []
         for(let j = 0; j < this_actors[i].movies.length; j++){
           movies.push(this_actors[i].movies[j].name);
         }
         let movie_string = movies.join(', ');
         obj.movies= movie_string;
 
         update_actors.push(obj);
 
       }
       setActors(update_actors);
       
       //make a actor array of objects
       let update_directors = [];
       for(let i =0 ; i < this_directors.length; i++){
         let obj = {};
         obj.name=this_directors[i].name;
         let tv_shows = []
         for(let j = 0; j < this_directors[i].tv_shows.length; j++){
           tv_shows.push(this_directors[i].tv_shows[j].name);
         }
         let tv_string = tv_shows.join(', ');
         obj.tv_shows= tv_string;
 
         let movies = []
         for(let j = 0; j < this_directors[i].movies.length; j++){
           movies.push(this_directors[i].movies[j].name);
         }
         let movie_string = movies.join(', ');
         obj.movies= movie_string;
 
         update_directors.push(obj);
 
       }
        setDirectors(update_directors);
 

      // console.log(this_actors, this_directors, this_genres, this_movies);
      
    }, [])
    const getTruncatedName = (source) => {
      let skippedString = source.trimEnd();
      if(skippedString.length > 46){
          return skippedString.substring(0, 46) + '...';
      }else{
          return source;
      }
  }
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Movie Database</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive >
                    <thead className="text-primary">
                      <tr>
                        <th>Movie Name</th>
                        <th>Genre</th>
                        <th>Actors</th>
                        <th className="">Director</th>
                        <th className="text-right">Rating[out of 5]</th>
                      </tr>
                    </thead>
                    <tbody >
                      {movies.map((movie, idx)=>(
                        <tr key = {idx}>
                        <td>{getTruncatedName(movie.name)}</td>
                        <td>{getTruncatedName(movie.genre)}</td>
                        <td style={{maxWidth:'25vw', overflow:'scroll'}}>{movie.actors}</td>
                        <td>{getTruncatedName(movie.director)}</td>
                        
                        <td className="text-right">{movie.rating? (movie.rating): "-"}</td>

                      </tr>
                      ))}
                      
                      
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">TV-show Database</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>TV-show Name</th>
                        <th>Genre</th>
                        <th>Actors</th>
                        <th className="">Director</th>
                        <th className="text-right">Rating[out of 5]</th>
                      </tr>
                    </thead>
                    <tbody>
                    {tv.map((tv_show, idx)=>(
                        <tr key = {idx}>
                        <td>{getTruncatedName(tv_show.name)}</td>
                        <td>{getTruncatedName(tv_show.genre)}</td>
                        <td style={{maxWidth:'25vw', overflow:'scroll'}}>{tv_show.actors}</td>
                        <td>{getTruncatedName(tv_show.director)}</td>
                        
                        <td className="text-right">{tv_show.rating? (tv_show.rating): "-"}</td>

                      </tr>
                      ))}
                     
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            {/* Genres */}
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Genres</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Genre Name</th>
                        <th>Movies</th>
                        <th>TV shows</th>
                      </tr>
                    </thead>
                    <tbody>
                    {genres.map((genre, idx)=>(
                        <tr key = {idx}>
                        <td>{getTruncatedName(genre.name)}</td>
                        <td style={{maxWidth:'25vw', overflow:'scroll'}}>{ genre.movies ? genre.movies : '-'}</td>
                        <td style={{maxWidth:'25vw', overflow:'scroll'}}>{genre.tv_shows ? genre.tv_shows : '-' }</td>
                        

                      </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

                    {/* Actors */}
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Actors</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Actor Name</th>
                        <th>Movies</th>
                        <th>TV shows</th>
                      </tr>
                    </thead>
                    <tbody>
                    {actors.map((actor, idx)=>(
                        <tr key = {idx}>
                        <td>{getTruncatedName(actor.name)}</td>
                        <td style={{maxWidth:'25vw', overflow:'scroll'}}>{ actor.movies ? actor.movies : '-'}</td>
                        <td style={{maxWidth:'25vw', overflow:'scroll'}}>{actor.tv_shows ? actor.tv_shows : '-' }</td>
                        

                      </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

          {/* Directors */}
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Directors</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Director Name</th>
                        <th>Movies</th>
                        <th>TV shows</th>
                      </tr>
                    </thead>
                    <tbody>
                    {directors.map((director, idx)=>(
                        <tr key = {idx}>
                        <td>{getTruncatedName(director.name)}</td>
                        <td style={{maxWidth:'25vw', overflow:'scroll'}}>{ director.movies ? director.movies : '-'}</td>
                        <td style={{maxWidth:'25vw', overflow:'scroll'}}>{director.tv_shows ? director.tv_shows : '-' }</td>
                        

                      </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            
           
          </Row>
        </div>
      </>
    );
  
}

export default Tables;
