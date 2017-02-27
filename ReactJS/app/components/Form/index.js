/**
 * Created by symbioz on 13/02/2017.
 */

"use strict";

import React, {Component} from 'react';
import {Input} from '../Input';

export class Form extends Component {

    constructor(props){
        //Set the props
        super(props);
    }

    render(){

        return (
            <div>
                <h1>{this.props.title}</h1>
                <form>
                    {this.props.inputs.map(input => (
                        <Input  key={input.name}
                                name={input.name}
                                label={input.label}
                                value={input.value}
                                type={input.type}
                                schema={input.schema}
                                onChange={input.onChange}
                                onBlur={input.onBlur}/>
                    ))}
                </form>
            </div>
        );
    }
}
