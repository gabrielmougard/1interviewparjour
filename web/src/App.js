import React from 'react';
import PropTypes from 'prop-types';
import URLSearchParams from 'url-search-params';
import Helmet from 'react-helmet';
import { Grommet } from 'grommet';
import { grommet, dark } from 'grommet/themes';
import { aruba } from 'grommet-theme-aruba';
import { hp } from 'grommet-theme-hp';
import { dxc } from 'grommet-theme-dxc';
import { v1 } from 'grommet-theme-v1';
import { Router } from './Router';
import Content from './components/Content';
import styled from 'styled-components'

const THEMES = {
  grommet,
  dark,
  aruba,
  hp,
  dxc,
  v1,
};

const BlurredGrommet = styled(Grommet)`
    background-color: rgb(255, 255, 255, .7);
`

const App = ({ initialPath }) => {
  const [themeName, setThemeName] = React.useState('grommet');
  const [search, setSearch] = React.useState();

  React.useEffect(() => {
    if (window.location.search) {
      const {
        location: { search: nextSearch },
      } = window;
      const params = new URLSearchParams(nextSearch);
      setSearch(nextSearch);
      setThemeName(params.get('theme'));
    }
  }, []);

  return (
    <Router initialPath={initialPath} search={search}>
      <Helmet titleTemplate="%s - 1interviewparjour.com" defaultTitle="1interviewparjour.com">
        <meta
          name="description"
          content="1interviewparjour.com - Mettez vous en mode marathon pour réussir toutes vos interviews techniques !" 
        />
        <meta
          name="keywords"
          content="interviews, technique, python, algorithmes, réussite, mail, daily"
        />
      </Helmet>
      <BlurredGrommet theme={THEMES[themeName || 'grommet']}>
        <Content />
      </BlurredGrommet>
    </Router>
  );
};

App.propTypes = {
  initialPath: PropTypes.string, // Path passed in from static page renderer.
};

App.defaultProps = {
  initialPath: undefined,
};

export default App;
