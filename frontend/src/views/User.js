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
import React, { useState } from "react";
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Row,
  Col,
} from "reactstrap";


const User = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mediaType, setMediaType] = useState("movie");
  const [state, setState] = useState({
    media_name:"",
    actors:"",
    director:"",
    genre: ""

  })
  function capitalize(input) {  
    var words = input.split(' ');  
    var CapitalizedWords = [];  
    words.forEach(element => {
      if(element!=''){ 
      element = element.trim();
      element = element.toLowerCase();
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
      }
    });  
    return CapitalizedWords.join(' ');  
}  
  const handleSubmission = async (e)=>{
    e.preventDefault();

    //passable will be the object containing information we'll pass on to our backend 
    let passable = state;
    passable = {...state, type:mediaType }
    let actor_string = state.actors;
    if(actor_string.charAt(actor_string.length-1)==','){
      actor_string= actor_string.slice(0, -1)
      console.log(actor_string)
    }
    let actor_array = actor_string.split(",");
    for(let i= 0 ; i <actor_array.length; i ++){
      actor_array[i] = capitalize(actor_array[i]);
    }
    passable.actors = actor_array;
    Object.keys(passable).map((key, idx)=> {if(key!='actors'){passable[key] = capitalize(passable[key])}})
    passable.type=mediaType.toLocaleLowerCase();
    console.log(passable);

    //make a backend function to process all the passed values
    
    
    var config = {
      
      url: 'http://localhost:1337/datapoint/new',
    };
    let res = await axios.post(config.url, passable);

    
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <>
      <div className="content">
        <Row>

          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add a Movie/TV Show</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                      Type
                      </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => { setMediaType("movie") }}>Movie</DropdownItem>
                      <DropdownItem onClick={() => { setMediaType("tv") }} >TV Show</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        {mediaType == "movie" ? (<label>Movie Name</label>) : (<label>TV-show Name</label>)}

                        <Input key={mediaType}
                          placeholder={mediaType == "movie" ? ("Inception") : ("The Office")}
                          value={state.media_name}
                          name="media_name"
                          onChange={handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Genre [only one]</label>
                        <Input key={mediaType}
                          placeholder={mediaType == "movie" ? ("Thriller") : ("Sitcom")}
                          value={state.genre}
                          name="genre"
                          onChange={handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Actor(s) [comma separated]</label>
                        <Input key={mediaType}
                          placeholder={mediaType == "movie" ? ("Leonardo di Caprio, Cillian Murphy, Tom Hardy") : ("Steve Carell, John Krasinski, Jenna Fischer")}
                          value={state.actors}
                          name="actors"
                          onChange={handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Director [only one]</label>
                        <Input key={mediaType}
                          placeholder={mediaType == "movie" ? ("Christopher Nolan") : ("Greg Daniels")}
                          name="director"
                          value={state.director}
                          onChange={handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={handleSubmission}
                      >
                        Add Data point
                        </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default User;
