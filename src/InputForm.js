import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class InputForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            input: '',
            locationObject: {},
            error: false
        }
    }

    async getLocationData (inputData){
        try {
            const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.input}&format=json`);
            console.log(response.data[0]);
        } 
        catch (error) {
            console.error(error);
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            input: e.target.input.value
        }, this.getLocationData)
    }

    render() {
        return (
        <Container>
            <Form onSubmit={ this.handleSubmit }>
            <Form.Group className="mb-3">
                <Form.Label>Enter Location</Form.Label>
                <Form.Control type="text" name="input" placeholder="Explore!" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            <h2>{this.state.input}</h2>
        </Container>
        );
    }
}

export default InputForm;
