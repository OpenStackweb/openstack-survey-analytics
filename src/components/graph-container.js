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
import { getGraphData, getGraphNPS } from '../actions/graph-actions'
import Filter from '../components/filter'
import PieGraph from './graphs/pie-graph'
import BarGraph from './graphs/bar-graph'
import RowGraph from './graphs/row-graph'
import IndustriesGraph from './graphs/industries-graph'

import '../styles/filter.less';
import '../styles/graph.less';


export default class GraphContainer extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {

    }

    renderGraph(name, specs) {

        switch(specs.type) {
            case 'table':
                return <PieGraph name={name} {...specs} />;
            case 'pie':
                return <PieGraph name={name} {...specs} />;
            case 'bars':
                return <BarGraph name={name} {...specs} />;
            case 'rows':
                return <RowGraph name={name} {...specs} />;
            case 'industries':
                return <IndustriesGraph name={name} {...specs} />;
            default:
                return null;
        }
    }

    render(){
        let {filters} = this.props.specs;
        let {name, specs} = this.props;

        return (
            <div className="graph-container container-flow">
                <div className="row filters-container">
                    {filters && filters.map(f => (
                        <Filter key={f + '_filter'} specs={f} />
                    ))}
                </div>

                <div className="graph-title">
                    <h2>{specs.title}</h2>
                </div>

                <div className="row graph">
                    { this.renderGraph(name, specs) }
                </div>
            </div>
        );
    }
}


