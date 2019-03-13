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
import Restrict from '../routes/restrict'
import history from '../history'
import {getSurveyData} from '../actions/graph-actions'
import { RawHTML } from 'openstack-uicore-foundation/lib/components';

import '../styles/survey-detail-page.less';


class SurveyDetailPage extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {
        let surveyId = this.props.match.params.survey_id;
        this.props.getSurveyData(surveyId);
    }

    render(){
        let {survey} = this.props;

        if (!survey.id) return (<div>NO DATA</div>);

        return (
            <div className="container">

                <button className="btn btn-default back-button" onClick={(ev) => {history.goBack()}}>Go Back</button>
                <div className="survey-detail">
                    <h1>Survey #{survey.id}</h1>
                    <hr/>
                    <b>Last Edited: </b> {survey.last_edited}<br/>
                    <b>Submitter: </b> {survey.owner.first_name} {survey.owner.last_name} ({survey.owner.email})<br/>
                    <b>Status: </b> {survey.state}
                    <br/>
                    {survey.steps.filter(stp => stp.answers.length > 0).map(stp =>
                        <div className="step-detail" key={'step_'+stp.id}>
                            <h4>{stp.name} ({stp.state})</h4>
                            <div className="detail-answers">
                            {stp.answers.map(ans =>
                                <div key={'ans_'+ans.id}><RawHTML>{ans.question}</RawHTML>: <b>{ans.value}</b></div>
                            )}
                            </div>
                        </div>
                    )}
                    <hr/>
                    <div className="deployments">
                        <h1>Deployments</h1>
                        {survey.entity_surveys.map(dep =>
                            <div className="deployment-detail" key={'deployment_'+dep.id}>
                                <h2>- {dep.steps[0].answers[0].value} -</h2>
                                {dep.steps.map(depstp =>
                                    <div className="dep-step-detail" key={'dep_step_'+depstp.id}>
                                        <h4>{depstp.name} ({depstp.state})</h4>
                                        <div className="detail-answers">
                                        {depstp.answers.map(ans =>
                                            <div key={'dep_ans_'+ans.id}><RawHTML>{ans.question}</RawHTML>: <b>{ans.value}</b></div>
                                        )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ surveyState, loggedUserState }) => ({
    member: loggedUserState.member,
    ...surveyState
})

export default Restrict(connect (
    mapStateToProps,
    {
        getSurveyData
    }
)(SurveyDetailPage), 'raw-data');

