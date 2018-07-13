import * as React from 'react';
import {Button, Col, Container, Nav, Navbar, NavbarBrand, NavItem, Row} from "reactstrap";
import {Redirect, Route, Switch} from "react-router-dom";
// import MainPage from "./MainPage";
import HomePage from "./HomePage";
import {Component} from "react";

class Layout extends Component {
    // state = {
    //     response: []
    // };

    // componentDidMount() {
    //     callApi('getFile/vocabulary').then(res => {
    //         console.log(res);
    //         this.setState({response: res})
    //     }).catch(err => console.error(err));
    // }

    render() {
        return <Container fluid>
            <Row className="h-100 ml-1">
                <Col id="content" className="h-100 mt-5" md={12}>
                    <Switch>
                        {/*<Route path="/others" name="MainPage" component={MainPage}/>*/}
                        <Route name="Home" component={HomePage}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
    }
}

export default Layout