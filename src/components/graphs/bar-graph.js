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
import { getGraphData } from '../../actions/graph-actions'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CustomLabel } from './custom-label'


class BarGraph extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {
        let {format, questionName, name} = this.props;

        this.props.getGraphData(name, format, 12, questionName, null, 'value_order');
    }


    render(){
        let {name} = this.props;

        if (!this.props.graphData.hasOwnProperty(name)) return (<div>NO DATA</div>);

        let {items, total} = this.props.graphData[name];

        let extras = [<span key="total_count" ><b>N:</b> {total} </span>];

        return (
            <div id={'graph_' + name} className="col-md-12">
                <div className="extra">
                    {extras}
                </div>
                <BarChart
                    width={1000}
                    height={400}
                    data={items}
                    margin={{top: 80, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="value" tick={{fontSize: 10}} interval={0} />
                    <YAxis hide={true} />
                    <Bar dataKey="value_count" fill="#0274b5" barSize={40} label={<CustomLabel char="%" rounded fill="#0274b5" />} isAnimationActive={false} />
                </BarChart>
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
)(BarGraph);

