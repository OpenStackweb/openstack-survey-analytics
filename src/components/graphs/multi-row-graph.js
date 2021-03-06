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
import {reduceData, reduceDataByKeys} from '../../utils/methods'


class MultiRowGraph extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {
        let {format, questionName, templates, order, name} = this.props;

        templates.forEach((t, i) => {
            let graphName = name + '_' + t.id;
            setTimeout(this.props.getGraphData(graphName, format, t.id, questionName, null, order), 10);
        });
    }

    componentWillReceiveProps(nextProps) {
        let {format, questionName, templates, order, name} = this.props;

        if (JSON.stringify(templates.map(t => t.id)) != JSON.stringify(nextProps.templates.map(t => t.id))) {
            nextProps.templates.forEach((t, i) => {
                let graphName = name + '_' + t.id;
                setTimeout(this.props.getGraphData(graphName, format, t.id, questionName, null, order), 10);
            });
        }
    }


    render(){
        let {name, questionName, order, templates, colors, graphData, getRawData} = this.props;
        let ywidth = this.props.getStyle('ywidth');
        let dataSets = templates.map(t => ({name: name + '_' + t.id, label: t.title}));
        let total = 0;
        let data = [];
        let limit = this.props.hasOwnProperty('limit') ? this.props.limit : false;
        let noData = false;
        let extras = [];

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

            extras.push(<span key={"ncount_"+i} className="total-count"><b>{ds.label} N:</b> {graphData[ds.name].total}</span>);
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
                    height={500}
                    data={data}
                    layout="vertical"
                    margin={{top: 5, right: 60, left: 60, bottom: 5}}
                >
                    <XAxis type="number" hide={true} />
                    <YAxis type="category" dataKey="name" width={ywidth} />
                    <Legend align="right" />
                    {templates.map((t, idx) =>
                        <Bar key={'graph_'+name+'_'+t.id + '_' + idx} {...stacked} dataKey={t.title} fill={colors[idx % colors.length]} barSize={15} isAnimationActive={false}
                             label={<CustomLabel char="%" rounded fill={colors[idx % colors.length]} position={position}/>}
                        />
                    )}
                </BarChart>
                <div className="raw-data-buttons">
                    {templates.map((t,i) => {
                        let graphName = name + '_' + t.id;
                        return (
                            <button key={"raw_data_"+t.id+ "_" + i} className="btn btn-default" onClick={getRawData.bind(this, graphName, t.id, questionName, null, order)}>
                                {t.title} Raw Data
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ graphState, loggedUserState, surveyState }) => ({
    graphData : graphState.graphData,
    member: loggedUserState.member,
    accessToken: loggedUserState.accessToken,
    allTemplates: surveyState.templates
})

export default connect (
    mapStateToProps,
    {
        getGraphData,
        getRawData
    }
)(MultiRowGraph);


