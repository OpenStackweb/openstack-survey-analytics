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
import { getGraphData, getRawData } from '../../actions/graph-actions'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';


class PieGraph extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        let {format, templateId, questionName, order, name} = this.props;

        if (nextProps.templateId != templateId) {
            this.props.getGraphData(name, format, nextProps.templateId, questionName, null, order);
        }
    }

    componentWillMount () {
        let {format, templateId, questionName, order, name} = this.props;
        this.props.getGraphData(name, format, templateId, questionName, null, order);
    }

    render(){
        let {name, colors, templateId, questionName, order, getRawData} = this.props;
        if (!this.props.graphData.hasOwnProperty(name)) return (<div></div>);

        let {items, total, extra} = this.props.graphData[name];

        let data = items.map(item => ({value: item.value_count, name: item.value.toString()}));

        let extras = [<span key="total_count" ><b>N:</b> {total} </span>];

        if (typeof extra != 'undefined') {
            for (var [key, value] of Object.entries(extra)) {
                extras.push(<span key={value + "_label"}><b>{key}:</b> {value} </span>);
            }
        }


        return (
            <div className="col-md-12 pie-graph">
                <div className="extra">
                    {extras}
                </div>
                <PieChart width={400} height={400}>
                    <Pie dataKey="value" data={data} fill="#82ca9d" startAngle={90} endAngle={-270} >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>
                <div className="raw-data-buttons">
                    <button className="btn btn-default" onClick={getRawData.bind(this, name, templateId, questionName, null, order)}>
                        Raw Data
                    </button>
                </div>
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
)(PieGraph);


