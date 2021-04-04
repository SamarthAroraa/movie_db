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

                        <Input
                          defaultValue="Inception"
                          placeholder="Movie Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Genre</label>
                        <Input
                          defaultValue="Psycho-Thriller"
                          placeholder="Genre"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Actor(s) [space separated]</label>
                        <Input
                          defaultValue="Leonardo di Caprio,Cillian Murphy,Tom Hardy"
                          placeholder="Comma separated actor names"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Director(s) [space separated]</label>
                        <Input
                          defaultValue="Christopher Nolan"
                          placeholder="Comma separated director names"
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
