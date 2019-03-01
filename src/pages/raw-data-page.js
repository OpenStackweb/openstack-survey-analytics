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
import history from '../history'


//import '../styles/dashboard-page.less';


class RawDataPage extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount () {

    }

    render(){
        let {data} = this.props;

        return (
            <div className="container">
                <button className="btn btn-default" onClick={(ev) => {history.goBack()}}>Go Back</button>
                {data.map(item => {
                    return (
                        <div>
                            <h4>{item.value}</h4>
                            <ul>
                            {item.surveys.map(s => (
                                <li>Survey {s.id} - {s.name}</li>
                            ))}
                            </ul>

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

export default connect (
    mapStateToProps,
    {
    }
)(RawDataPage);

