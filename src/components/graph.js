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
import { getGraphData } from '../actions/graph-actions'
import PieGraph from './graphs/pie-graph'

import '../styles/graph.less';


class Graph extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {
        let {format, questionName} = this.props.specs;
        this.props.getGraphData(format, 12, questionName);
    }

    renderGraph(type, data) {
        switch(type) {
            case 'table':
                return <PieGraph data={data.items} total={data.total} extra={data.extra} />;
            case 'pie':
                return <PieGraph data={data.items} total={data.total} extra={data.extra} />;
            case 'bars':
                return <PieGraph data={data.items} total={data.total} extra={data.extra} />;
            default:
                return null;
        }
    }

    render(){

        let {graphData} = this.props;
        let {type} = this.props.specs;

        return (
            <div className="graph">
                { this.renderGraph(type, graphData) }
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
        getGraphData
    }
)(Graph);

