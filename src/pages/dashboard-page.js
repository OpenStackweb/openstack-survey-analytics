/**
 * Copyright 2018 OpenStack Foundation
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
import graphDefinitions from 'js-yaml-loader!../graph-definitions.yml';
import filterDefinitions from 'js-yaml-loader!../filter-definitions.yml';
import Graph from '../components/graph'
import Filter from '../components/filter'

//import '../styles/dashboard-page.less';


class DashboardPage extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {
    }

    render(){

        let graphComponents = [];
        for (var [name, specs] of Object.entries(graphDefinitions)) {
            graphComponents.push(<Graph key={name + '_graph'} name={name} specs={specs} />);
        }

        let filterComponents = [];
        for (var [key, specs] of Object.entries(filterDefinitions)) {
            filterComponents.push(<Filter key={key + '_filter'} specs={specs} />);
        }

        return (
            <div className="container">
                <div className="row filters-container">
                    {filterComponents}
                </div>
                <div className="graphs-container">
                    {graphComponents}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ graphState, loggedUserState }) => ({
    graph_data : graphState.graphs_data,
    member: loggedUserState.member,
    accessToken: loggedUserState.accessToken
})

export default connect (
    mapStateToProps,
    {
    }
)(DashboardPage);

