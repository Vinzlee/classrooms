'use strict';

import React from 'react';
import {render} from 'react-dom';
import {MyForm} from './components/MyForm';

/**
 * React Application entry point.
 */
class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            inputs: {
                firstname: {
                    label: "First Name",
                    value: "",
                    schema: {
                        type: "string",
                        minLength: 2,
                        maxLength: 30
                    }
                },
                lastname: {
                    label: "Last Name",
                    value: "",
                    schema: {
                        type: "string",
                        minLength: 2,
                        maxLength: 30
                    }
                },
                email: {
                    label: "Email",
                    value: "",
                    schema: {
                        type: "string",
                        format: "email"
                    }
                }
            }
        };
    }

    componentWillMount() {

        setTimeout(() => {
            console.log("Data Loaded");
            this.state.inputs.firstname.value = "Vincent";
            this.state.inputs.lastname.value = "Chollet";
            this.state.inputs.email.value = "vinz.chollet@gmail.com";

            this.setState(this.state);

        }, 2000);

    }

    onChange(event) {
        console.log(event.target.name, event.target.value);
    }

    onBlur(event, error) {
        //console.log("EVENT", event);
        console.log("ERROR", error);
        this.state.inputs[event.target.name].value = event.target.value;
        this.setState(this.state);
    }

    /**
     * Render the main View.
     * @returns {XML}
     */
    render () {

        return(
              <MyForm />
        );
    }
}

render(<App/>, document.getElementById('app'));
