import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BaseRoute from '../../ui/routes/general/BaseRoute';
import ScrollToTop from '../../ui/components/general/scrollToTop/ScrollToTop';

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <ScrollToTop>
        <ToastContainer />
        <BaseRoute />
      </ScrollToTop>
    </BrowserRouter>,
    document.getElementById('app'),
  );
});
