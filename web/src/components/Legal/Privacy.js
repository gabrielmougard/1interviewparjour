import React from 'react';
import Helmet from 'react-helmet';
import { Box } from 'grommet';
import Header from '../Header';
import Page from '../Page';

export default () => (
  <Page>
     <Box margin={{ bottom: 'large' }} width="xlarge" alignSelf="center">
        <Helmet>
            <title>Protections des données</title>
            <meta name="description" content={"Protection des données"} />
        </Helmet>
      </Box>
      <Box align={"center"}>
        <Header
            align={"center"}
            label={"Protection des données"}
            summary={"Nous nous engageons à ne pas divulger vos données"}
            details={"1interviewparjour.com (the 'Company') respects the privacy concerns of the users of its website, 1interviewparjour.com and the services provided therein (the 'Site'). The Company thus provides this privacy statement to explain what information is gathered during a visit to the Site and how such information may be used."}
        />
      </Box>
  </Page>
);