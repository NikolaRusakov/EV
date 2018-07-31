import React, {Component} from 'react';
// import Loader from '../components/Loader'
import {Col, Row} from "reactstrap";
import {connect} from "react-redux";
import ItemList from "../components/ItemList";
import {callApi} from "../api";
import TreeList from "../components/TreeList";

class HomePage extends React.Component {
    state = {
        response: []
    };

    componentDidMount() {
        callApi('getFile/tested').then(res => {
            console.log(res);
            this.setState({response: res})
        }).catch(err => console.error(err));
    }

    render() {
        const {response} = this.state;
        // console.log(response.data);
        return (
            <Row>
                <Col lg="4" key="homePage">
                    {/*<ItemList data={response[0]&&response[0]}/>*/}
                </Col>
                <Col lg="4">
                    {response.length !== 0 && <TreeList data={response}/>}
                </Col>


            </Row>
        )
    }
}

export default connect()(HomePage);