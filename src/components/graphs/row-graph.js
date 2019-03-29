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
import {getGraphData, getRawData} from '../../actions/graph-actions'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CustomLabel } from './custom-label'


class RowGraph extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {
        let {format, templateId, questionName, order, name} = this.props;

        this.props.getGraphData(name, format, templateId, questionName, null, order);
    }

    componentWillReceiveProps(nextProps) {
        let {format, templateId, questionName, order, name} = this.props;

        if (nextProps.templateId != templateId) {
            this.props.getGraphData(name, format, nextProps.templateId, questionName, null, order);
        }
    }


    render(){
        let {name, templateId, questionName, order, getRawData} = this.props;

        if (!this.props.graphData.hasOwnProperty(name)) return (<div>NO DATA</div>);

        let data = this.props.graphData[name].items;
        let total = this.props.graphData[name].total;

        let extras = [<span key="total_count" ><b>N:</b> {total} </span>];

        let ywidth = this.props.getStyle('ywidth');
        let barcolor = this.props.getStyle('color');

        return (
            <div id={'graph_' + name} className="col-md-12">
                <div className="extra">
                    {extras}
                </div>
                <BarChart
                    width={1000}
                    height={400}
                    data={data}
                    layout="vertical"
                    margin={{top: 80, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis type="number" hide={true} />
                    <YAxis type="category" dataKey="value" width={ywidth} tick={{fontSize: 10}} interval={0} />
                    <Bar dataKey="value_count" fill={barcolor} barSize={15} label={<CustomLabel char="%" rounded fill={barcolor} position="right"/>} isAnimationActive={false} />
                </BarChart>
                <button className="btn btn-default" onClick={getRawData.bind(this, name, templateId, questionName, null, order)}>
                    Raw Data
                </button>
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
        getGraphData,
        getRawData
    }
)(RowGraph);


