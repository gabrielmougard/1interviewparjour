import React from 'react';

//import { Route, Routes } from '../Router';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications'

import Home from '../containers/home'
import Method from '../containers/home/method'
import Example from '../containers/home/example'
import Pro from '../containers/home/pro'
import Introduction from '../containers/home/introduction'

import MailAuth from '../containers/mail_auth/index'
import Planning from '../containers/planning/index'
import PaymentPortal from '../containers/payment/index'
import PaymentSuccess from '../containers/payment_success/index'
import PaymentCancel from '../containers/payment_cancel/index'

import CGU from './Legal/CGU'
import Privacy from './Legal/Privacy'
import Contact from './Legal/Contact'


export default () => (
  <Router>
    <Switch>
      <Route path="/" exact={true}>
        <ToastProvider>
          <Home />
        </ToastProvider>
      </Route>
      <Route path="/method" exact={true}>
        <ToastProvider>
          <Method />
        </ToastProvider>
      </Route>
      <Route path="/example" exact={true}>
        <ToastProvider>
          <Example />
        </ToastProvider>
      </Route>
      <Route path="/pro" exact={true}>
        <ToastProvider>
          <Pro />
        </ToastProvider>
      </Route>
      <Route path="/introduction" exact={true}>
        <ToastProvider>
          <Introduction />
        </ToastProvider>
      </Route>
      <Route path="/planning" exact={true}>
        <ToastProvider
          placement="top-center"
          autoDismissTimeout={1000}
        >
          <MailAuth
            childComponent={
              <Planning />
            }
          />
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
        <ToastProvider
          placement="top-center"
          autoDismissTimeout={1000}
        >
          <MailAuth
            childComponent={
              <PaymentPortal />
            }
          />
        </ToastProvider>
      </Route>
      <Route path="/payment_success" exact={true}>
        <ToastProvider
          placement="top-center"
          autoDismissTimeout={1000}
        >
          <MailAuth
            childComponent={
              <PaymentSuccess />
            }
          />
        </ToastProvider>
      </Route>
      <Route path="/payment_canceled" exact={true}>
        <ToastProvider
          placement="top-center"
          autoDismissTimeout={1000}
        >
          <MailAuth
            childComponent={<PaymentCancel />}
          />
        </ToastProvider>
      </Route>
      <Route path="*">
        <ToastProvider>
          <Home />
        </ToastProvider>
      </Route>
    </Switch>
  </Router>

);
