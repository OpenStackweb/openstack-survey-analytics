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
import '../../../node_modules/react-vis/dist/style.css';
import { RadialChart, DiscreteColorLegend } from 'react-vis';


export default class PieGraph extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {

    }

    render(){

        let {data, total, extra} = this.props;

        let angles = data.map(item => ({angle: item.value_count, label: item.value_count}));
        let legends = data.map(item => item.value);

        let extras = [<span><b>N:</b> {total} </span>];
        for (var [key, value] of Object.entries(extra)) {
            extras.push(<span><b>{key}:</b> {value} </span>);
        }


        return (
            <div className="pie-graph">
                <div className="extra">
                    {extras}
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <RadialChart
                            data={angles}
                            width={300}
                            height={350}
                            showLabels={true}
                            animation={true}
                            labelsRadiusMultiplier={1.2}
                        />
                    </div>
                    <div className="col-md-4 legend-container">
                        <DiscreteColorLegend height={300} items={legends} />
                    </div>
                </div>
            </div>
        );
    }
}

