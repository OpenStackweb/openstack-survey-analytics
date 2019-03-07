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
import { BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { CustomLabel } from './custom-label'
import { reduceData } from '../../utils/methods'


class MultiRowGraph extends React.Component {

    constructor(props){
        super(props);

    }

    componentWillMount () {
        let {format, questionName, templates, order, name} = this.props;

        templates.forEach((t, i) => {
            let graphName = name + '_' + t.id;
            this.props.getGraphData(graphName, format, t.id, questionName, null, order);
        });
    }


    render(){
        let {name, templates, graphData} = this.props;
        let ywidth = this.props.getStyle('ywidth');
        let dataSets = templates.map(t => ({name: name + '_' + t.id, label: t.label}));
        let total = 0;
        let data = [];
        let limit = this.props.hasOwnProperty('limit') ? this.props.limit : false;

        dataSets.forEach((ds, i) => {
            if (!graphData.hasOwnProperty(ds.name)) {
                return (<div>NO DATA</div>);
            }

            if (limit) {
                ds.items = reduceData(graphData[ds.name].items, limit);
            } else {
                ds.items = graphData[ds.name].items;
            }

            total = (i == 0) ? graphData[ds.name].total : total;
        });


        dataSets.forEach(ds => {
            ds.items.forEach(it => {
                let dataItem = data.find(item => item.name == it.value);
                if (!dataItem) {
                    dataItem = {name: it.value};
                    dataItem[ds.label] = it.value_count;
                    data.push(dataItem);
                } else {
                    dataItem[ds.label] = it.value_count;
                }
            });
        });

        let extras = [<span key="total_count" ><b>N:</b> {total} </span>];
        let stacked = {};
        let position = 'right';

        if (this.props.hasOwnProperty('stacked')) {
            stacked = {stackId: 'a'};
            position = 'top';
        }

        return (
            <div className="col-md-12 industries-graph">
                <div className="extra">
                    {extras}
                </div>
                <BarChart
                    width={1000}
                    height={400}
                    data={data}
                    layout="vertical"
                    margin={{top: 5, right: 60, left: 60, bottom: 5}}
                >
                    <XAxis type="number" hide={true} />
                    <YAxis type="category" dataKey="name" width={ywidth} />
                    <Legend align="right" />
                    {templates.map(t =>
                        <Bar key={'graph_'+name+'_'+t.id} {...stacked} dataKey={t.label} fill={t.color} barSize={15} label={<CustomLabel char="%" rounded fill={t.color} position={position}/>} isAnimationActive={false} />
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
        getGraphData,
        getRawData
    }
)(MultiRowGraph);


