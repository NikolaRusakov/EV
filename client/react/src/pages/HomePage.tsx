import * as React from 'react'
import {Component} from "react";
// import Loader from '../components/Loader'
import {Col, Row} from "reactstrap";
import {connect} from "react-redux";
import ItemList from "../components/ItemList";
import {callApi} from "../api";

class HomePage extends Component {
    state = {
        response: []
    };
    componentDidMount() {
        callApi('getFile/vocabulary').then(res => {
            console.log(res);
            this.setState({response: res})
        }).catch(err => console.error(err));
    }
    render() {
        // const {data} = this.props;
        // if (!data) {
        // return <Loader/>
        // }
        const{response}=this.state;
        // console.log(response);
        return (
            <Row>
                <Col lg="4" key="homePage">
                    <ItemList data={response&&response}/>
                </Col>
            </Row>
        )
    }
}

export default HomePage;