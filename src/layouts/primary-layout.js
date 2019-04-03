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

import React from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavMenu from '../components/nav-menu/index'
import DashboardPage from '../pages/dashboard-page'
import RawDataPage from '../pages/raw-data-page'
import SurveyDetailPage from '../pages/survey-detail-page'
import Restrict from "../routes/restrict";

class PrimaryLayout extends React.Component {

  render(){
    let { location } = this.props;
    let extraClass = 'container';

    let useMenu = false;
    return(
      <div className="primary-layout">
        { useMenu && <NavMenu /> }
        <main id="page-wrap">

          <Switch>
              <Route exact path="/app/dashboard" component={DashboardPage}/>
              <Route exact path="/app/raw/:graph_name" component={RawDataPage}/>
              <Route strict exact path="/app/survey/:survey_id(\d+)" component={SurveyDetailPage}/>
          </Switch>
        </main>
      </div>
    );
  }

}

const mapStateToProps = ({  }) => ({

})

export default Restrict(connect(
    mapStateToProps,
    {}
)(PrimaryLayout), 'dashboard');


