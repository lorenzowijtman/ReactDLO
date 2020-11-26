import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Questions from '../../components/student/questions/Questions';
import Menu from '../../components/student/menu/Menu';
import PageContainer from '../../layouts/student/pageContainer/PageContainer';

import BaseStudentMain from './BaseStudentMain';

import AccountWidget from '../../components/general/accountWidget/AccountWidget';

const Student = (props) => (
  <div className="layout layout--student">
    <Menu />
    <header className="header header--student">
      <AccountWidget {...props} style={{float: 'right', marginRight: '20px'}} />
    </header>
    <PageContainer>
      <Switch>
        <Route path="/student/lessen/maken/:id" component={Questions} />
        <Route path="/student" component={BaseStudentMain} />
      </Switch>
    </PageContainer>
  </div>
);

export default Student;
