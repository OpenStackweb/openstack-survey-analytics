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
import { getGraphData } from '../../actions/graph-actions'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, Legend } from 'recharts';
import { CustomLabel } from './custom-label'


class OneRowGraph extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {
        let {format, templateID, questionName, order, name} = this.props;

        this.props.getGraphData(name, format, templateID, questionName, null, order);
    }


    render(){
        let {name, colors} = this.props;

        if (!this.props.graphData.hasOwnProperty(name)) return (<div>NO DATA</div>);

        let data = this.props.graphData[name].items;
        let total = this.props.graphData[name].total;

        let extras = [<span key="total_count" ><b>N:</b> {total} </span>];

        let ywidth = this.props.getStyle('ywidth');

        let stackedData = {name: 'stacked'};
        data.forEach(it => {
            stackedData[it.value] = it.value_count;
        });

        return (
            <div id={'graph_' + name} className="col-md-12">
                <div className="extra">
                    {extras}
                </div>
                <BarChart
                    width={1000}
                    height={200}
                    data={[stackedData]}
                    layout="vertical"
                    margin={{top: 80, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis type="number" hide={true} />
                    <YAxis type="category" dataKey="name" width={ywidth} tick={false} interval={0} />
                    <Legend align="center" />
                    {data.map((it, idx) =>
                        <Bar key={'graph_'+name+'_'+idx} dataKey={it.value} stackId="a" fill={colors[idx]} barSize={30} isAnimationActive={false}>
                            <LabelList dataKey={it.value} position="top" fill={colors[idx]} formatter={(val) => Math.round(val) + ' %'}/>
                        </Bar>
                    )}
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
)(OneRowGraph);


