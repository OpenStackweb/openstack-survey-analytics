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
import graphDefinitions from 'js-yaml-loader!../graph-definitions.yml';
import GraphContainer from '../components/graph-container'
import Select from 'react-select';
import {getSurveyTemplatesMetaData} from '../actions/survey-actions'


//import '../styles/dashboard-page.less';


class DashboardPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            templateIds: [12,10,8]
        };

        this.handleTemplateChange = this.handleTemplateChange.bind(this);
    }

    componentWillMount() {
        let {templates} = this.props;
        if(templates.length == 0) {
            this.props.getSurveyTemplatesMetaData();
        }
    }

    handleTemplateChange(index, option) {
        let {templateIds} = this.state;
        templateIds[index] = option.value;
        this.setState({templateIds: templateIds});
    }

    render(){
        let {templates} = this.props;
        let {templateIds} = this.state;
        let graphs = [];

        if (templates.length == 0) {
            return (<div className="container">Loading...</div>)
        }

        let templateOptions = templates.map(t => ({label: t.title, value: t.id}) );
        let selectedTemplates = templateIds.map(tid => templates.find(t => t.id == tid)).sort(
            (a, b) => (a.id < b.id ? 1 : (a.id > b.id ? -1 : 0))
        );

        for (var [name, specs] of Object.entries(graphDefinitions)) {
            graphs.push(<GraphContainer key={name + '_graphbox'} name={name} templates={selectedTemplates} specs={specs} />);
        }

        return (
            <div className="container">
                <div className="row">
                    {selectedTemplates.map((template, idx) => {
                         let selectedOpt = templateOptions.find(t => t.value == template.id);
                         let label = idx == 0 ? 'Main Template' : (idx == 1 ? 'Compare 1' : 'Compare 2');

                         return (
                             <div key={'template_select_'+idx} className="col-md-4">
                                 <label>{label}</label>
                                 <Select
                                     placeholder="Select a template"
                                     value={selectedOpt}
                                     onChange={this.handleTemplateChange.bind(this, idx)}
                                     options={templateOptions}
                                 />
                             </div>
                         );
                    })}
                </div>
                {selectedTemplates.length > 0 &&
                    <div>
                        {graphs}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ surveyState, loggedUserState }) => ({
    member: loggedUserState.member,
    accessToken: loggedUserState.accessToken,
    templates: surveyState.templates
})

export default connect (
    mapStateToProps,
    {
        getSurveyTemplatesMetaData
    }
)(DashboardPage);

