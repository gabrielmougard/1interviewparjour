import React from 'react';

import { Route, Routes } from '../Router';

import Home from './Home';
import CGU from './Legal/CGU'
import Privacy from './Legal/Privacy'
import Contact from './Legal/Contact'

export default () => (
  <Routes notFoundRedirect="/">

    <Route exact path="/" component={Home} />
    <Route exact path="/cgu" component={CGU} />
    <Route exact path="/privacy" component={Privacy} />
    <Route exact path="/contact" component={Contact} />

  </Routes>
);
