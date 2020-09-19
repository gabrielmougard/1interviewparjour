import React from 'react';

//import { Route, Routes } from '../Router';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications'

import Home from './Home';
import CGU from './Legal/CGU'
import Privacy from './Legal/Privacy'
import Contact from './Legal/Contact'
import PaymentPortal from '../containers/payment/index'

import CustomToast from './Payment/CustomToast'

export default () => (
  <Router>
    <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
          <Route path="/cgu" exact={true}>
            <CGU />
          </Route>
          <Route path="/privacy" exact={true}>
            <Privacy />
          </Route>
          <Route path="/contact" exact={true}>
            <Contact />
          </Route>
          <Route path="/payment" exact={true}>
            <ToastProvider>
              <PaymentPortal />
            </ToastProvider>
          </Route>
    </Switch>
  </Router>

);
