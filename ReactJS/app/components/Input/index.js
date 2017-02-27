/**
 * This program belongs to Prosodie.
 * It is considered a trade secret, and is not to be divulged or used
 * by parties who have not received written authorization from the owner.
 * For more details please contact us on contact@prosodie.com
 *
 * @author         vchollet
 * @company        Prosodie
 * @version        1.0
 * @date           13/02/2017
 */

"use strict";

import AJV from 'ajv';
import React, {Component} from 'react';

/**
 * Input overrides the default input Bootstrap block
 * by including an input type error management MVC.
 */
export class Input extends Component {

    /**
     * Default constructor.
     * @param {object} props
     */
    constructor(props) {
        //Set the props
        super(props);

        //Set the error
        this.state = {
            error: {
                status: false,
                message: ""
            }
        };

        console.log(props);

        //Set the Validator
        this.validator = new AJV({allErrors: true, messages: true});
        this.props.schema.id = this.props.name;
        this.validator.addSchema([this.props.schema]);
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.value) {
            console.log("Input value received " + nextProps);
            this.state.value = nextProps.value;
            this.refs["input"].value = nextProps.value;
            this.validate(nextProps.value);
        }
    }


    /**
     * Check the input value.
     * @param value
     */
    validate(value) {
        if ( !value || value === "" ) {
            this.state.error.status = true;
            this.state.error.message = this.props.label + ' is requested';
        } else if ( !this.validator.validate(this.props.name, value) ) {
            this.state.error.status = true;
            this.state.error.message = this.validator.errorsText();
        } else {
            this.state.error.status = false;
            this.state.error.message = "";
        }
    }

    /**
     * Callback triggered when the Input is changed.
     * @param event
     */
    onChange(event) {
        //Update the event
        event.target.name = this.props.name;

        //Update the state
        this.setState({value: event.target.value});

        //Override the onChange callback
        if ( this.props.onChange ) {
            this.props.onChange(event);
        }
    }

    /**
     * Callback triggered when the Input is changed.
     * @param event
     */
    onBlur(event) {
        //Update the event
        event.target.name = this.props.name;

        //Set the new Value
        this.state.value = event.target.value;

        //Check the input
        this.validate(this.state.value);

        //Update the state
        this.forceUpdate();

        //Override the onBlur callback
        if ( this.props.onBlur ) {
            this.props.onBlur(event, this.state.error);
        }
    }

    /**
     * Render the Input Component.
     * @returns {XML}
     */
    render() {

        //Render the data
        return (
            <div className={this.state.error.status ? "form-group row has-error has-feedback" : "form-group row"}>
                <label className="col-sm-2 col-form-label">{this.props.label}</label>
                <div className="col-sm-10">
                    <input ref="input"
                           className="form-control editor edit-text"
                           type="text"
                           placeholder={this.props.placeholder}
                           onBlur={this.onBlur.bind(this)}
                           onChange={this.onChange.bind(this)}/>
                    <span className="help-block"
                          style={{display: this.state.error.status ? "block" : "none"}}>{this.state.error.message}</span>
                </div>
            </div>
        );
    }
}