import React from 'react';

//import { Route, Routes } from '../Router';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications'

import Home from '../containers/home/index'
import Planning from '../containers/planning/index'
import CGU from './Legal/CGU'
import Privacy from './Legal/Privacy'
import Contact from './Legal/Contact'
import PaymentPortal from '../containers/payment/index'
import PaymentSuccess from '../containers/payment_success/index'
import PaymentCancel from '../containers/payment_cancel/index'

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact={true}>
        <ToastProvider>
          <Home />
        </ToastProvider>
      </Route>
      <Route path="/planning" exact={true}>
        <ToastProvider>
          <Planning />
        </ToastProvider>
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
      <Route path="/payment_success" exact={true}>
        <ToastProvider>
          <PaymentSuccess />
        </ToastProvider>
      </Route>
      <Route path="/payment_cancel" exact={true}>
        <PaymentCancel />
      </Route>
      <Route path="*">
        <Home />
      </Route>
    </Switch>
  </Router>

);
