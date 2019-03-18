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
import Restrict from '../routes/restrict'
import T from "i18n-react/dist/i18n-react";
import history from '../history'
import { Table } from 'react-bootstrap'
import { CSVDownload, CSVLink } from "react-csv";
import { Parser } from "json2csv";

import '../styles/raw-data-page.less';


class RawDataPage extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {

    }

    linkToSurvey(surveyId, ev) {
        ev.preventDefault();
        history.push(`/app/survey/${surveyId}`);
    }

    render(){
        let {data, name} = this.props;

        let fields = [
            {label: 'SurveyId', value: 'surveys.id'},
            {label: 'Company', value: 'surveys.company'},
            {label: 'Submitter', value: 'surveys.name'},
            {label: 'Email', value: 'surveys.email'},
            {label: 'Answer', value: 'value'}
        ];

        let csvParser = new Parser({fields, unwind: 'surveys'});
        let csvData = csvParser.parse(data);

        return (
            <div className="container survey-list">
                <CSVLink data={csvData} filename={name + ".csv"} className="btn btn-primary export-btn" target="_blank">
                    Export
                </CSVLink>

                <button className="btn btn-default back-button" onClick={(ev) => {history.goBack()}}>Go Back</button>
                <h1>Raw Data for "{name}"</h1>
                {data.map(item => {
                    let ordered_surveys = item.surveys.sort(
                        (a, b) => (a.company < b.company ? -1 : (a.company > b.company ? 1 : 0))
                    );

                    return (
                        <div key={item.value}>
                            <h4>{item.value}</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>SurveyId</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {ordered_surveys.map(s => (
                                    <tr key={'survey_item_'+s.id}>
                                        <td>{s.company}</td>
                                        <td>{s.name}</td>
                                        <td>{s.email}</td>
                                        <td><a onClick={this.linkToSurvey.bind(this, s.id)} > {s.id} </a></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>

                        </div>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = ({ rawDataState, loggedUserState }) => ({
    member: loggedUserState.member,
    accessToken: loggedUserState.accessToken,
    ...rawDataState
})

export default Restrict(connect (
    mapStateToProps,
    {
    }
)(RawDataPage), 'raw-data');

