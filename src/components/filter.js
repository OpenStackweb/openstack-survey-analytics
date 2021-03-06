/**
 * Copyright 2019 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React from 'react';
import { connect } from 'react-redux';
import T from "i18n-react/dist/i18n-react";
import { getGraphData, getGraphNPS } from '../actions/graph-actions'
import Select from 'react-select'

import '../styles/filter.less';


class Filter extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {

    }

    renderFilter(type, options) {

        switch(type) {
            case 'dropdown':
                return <Select options={options} />;
            case 'checkbox':

                return options.map(op => {
                     return (
                        <label>
                            {op.name}
                            <input type="checkbox" value={op.value} />
                        </label>
                    );
                });
            default:
                return null;
        }
    }

    render(){
        let {type, options} = this.props.specs;

        return (
            <div className="filter col-md-3">
                { this.renderFilter(type, options) }
            </div>
        );
    }
}

const mapStateToProps = ({ graphState, loggedUserState }) => ({
    graphData : graphState.graphData,
    member: loggedUserState.member,
    accessToken: loggedUserState.accessToken
})

export default connect (
    mapStateToProps,
    {
    }
)(Filter);

