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
import { BarChart, Bar, XAxis, YAxis, Legend, LabelList } from 'recharts';
import { CustomLabel } from './custom-label'
import { reduceData, reduceDataByKeys } from '../../utils/methods'


class MultiRowGroupedGraph extends React.Component {

    constructor(props){
        super(props);

    }

    componentWillMount () {
        let {format, questionName, templateId, group_by, order, name} = this.props;

        group_by.forEach((g, i) => {
            let graphName = name + '_' + i;
            setTimeout(this.props.getGraphData(graphName, format, templateId, questionName, {answer: g.value}, order), 10);
        });
    }

    componentWillReceiveProps(nextProps) {
        let {format, templateId, questionName, group_by, order, name} = this.props;

        if (nextProps.templateId != templateId) {
            group_by.forEach((g, i) => {
                let graphName = name + '_' + i;
                setTimeout(this.props.getGraphData(graphName, format, nextProps.templateId, questionName, {answer: g.value}, order), 10);
            });
        }
    }


    render(){
        let {name, templateId, questionName, order, group_by, graphData, getRawData} = this.props;
        let ywidth = this.props.getStyle('ywidth');
        let dataSets = group_by.map((g,i) => ({name: name + '_' + i, label: g.label}));
        let total = 0;
        let data = [];
        let limit = this.props.hasOwnProperty('limit') ? this.props.limit : false;
        let noData = false;

        dataSets.forEach((ds, i) => {
            if (!graphData.hasOwnProperty(ds.name)) {
                noData = true;
                return;
            }

            if (limit) {
                if (i > 0 && dataSets[0].hasOwnProperty('items')) {
                    let keys = dataSets[0].items.map(it => it.value);
                    ds.items = reduceDataByKeys(graphData[ds.name].items, keys);
                } else {
                    ds.items = reduceData(graphData[ds.name].items, limit);
                }
            } else {
                ds.items = graphData[ds.name].items;
            }

            total = (i == 0) ? graphData[ds.name].total : total;
        });

        if (noData) return (<div>NO DATA</div>);

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
                    {group_by.map((g,i) =>
                        <Bar key={'graph_'+name+'_'+i} {...stacked} dataKey={g.label} fill={g.color} barSize={15} isAnimationActive={false} >
                            <LabelList dataKey={g.label} position="top" fill={g.color} fontSize={12} formatter={(val) => Math.round(val) + '%'}/>
                        </Bar>
                    )}
                </BarChart>
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
)(MultiRowGroupedGraph);


