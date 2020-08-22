import React from 'react';
import Helmet from 'react-helmet';
import { Box } from 'grommet';
import Header from '../Header';
import Page from '../Page';

export default () => (
  <Page>
     <Box margin={{ bottom: 'large' }} width="xlarge" alignSelf="center">
        <Helmet>
            <title>Conditions générales d'utilisation</title>
            <meta name="description" content={"Conditions générales d'utilisation"} />
        </Helmet>
      </Box>
      <Box align={"center"}>
        <Header
            align={"center"}
            label={"Conditions générales d'utilisation"}
            summary={"Comment utiliser le site 1interviewparjour.com ?"}
            details={"PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING THIS WEBSITE. By using this website, you signify your consent to these terms of use. If you do not agree to these Terms of Use, please do not use the website. <continue here>..."}
        />
      </Box>
  </Page>
);
