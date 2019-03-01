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


class IndustriesGraph extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {
        let {format, questionName, name} = this.props;
        let name_a = name + '_a';
        let name_b = name + '_b';

        this.props.getGraphData(name_a, format, 12, questionName);
        this.props.getGraphData(name_b, format, 10, questionName);
    }

    reduceData(data, threshold) {

        const reducer = (accumulator, currentValue) => accumulator + currentValue.value_count;
        let other_key = data.findIndex(it => it.value == 'Other');
        threshold = (other_key <= threshold) ? threshold + 1 : threshold;

        let spare_data = data.slice(threshold);
        let reduced_data = data.slice(0,threshold);

        let other_accumulator = spare_data.reduce(reducer,0) + reduced_data[other_key].value_count;
        reduced_data[other_key].value_count = Math.round(other_accumulator,2);

        return reduced_data;
    }

    render(){
        let {name} = this.props;
        let name_a = name + '_a';
        let name_b = name + '_b';

        if (!this.props.graphData.hasOwnProperty(name_b) || !this.props.graphData.hasOwnProperty(name_b)) return (<div>NO DATA</div>);

        let items_a = this.reduceData(this.props.graphData[name_a].items, 6);
        let items_b = this.reduceData(this.props.graphData[name_b].items, 6);


        let data = items_a.map(item_a => {
            let name = item_a.value.toString();
            let value_a = item_a.value_count;
            let value_b = 0;
            let item_b = items_b.find(it_b => it_b.value == name);
            if (item_b) {
                value_b = item_b.value_count;
            }

            return {name, 2018: value_a, 2017: value_b}
        });


        return (
            <div className="col-md-12 industries-graph">
                <BarChart
                    width={1000}
                    height={400}
                    data={data}
                    layout="vertical"
                    margin={{top: 5, right: 60, left: 60, bottom: 5}}
                >
                    <XAxis type="number" hide={true} />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Legend align="right" />
                    <Bar dataKey="2018" fill="#0374b5" barSize={15} label={<CustomLabel char="%" rounded fill="#8884d8" position="right"/>} isAnimationActive={false} />
                    <Bar dataKey="2017" fill="#9ec8e2" barSize={15} label={<CustomLabel char="%" rounded fill="#9ec8e2" position="right"/>} isAnimationActive={false} />
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
)(IndustriesGraph);


