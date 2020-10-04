import React from 'react';
import Helmet from 'react-helmet';
import { Box } from 'grommet';
import Header from '../Header';
import Page from '../Page';

export default () => (
  <Page>
     <Box margin={{ bottom: 'large' }} width="xlarge" alignSelf="center">
        <Helmet>
            <title>Contact</title>
            <meta name="description" content={"Contact"} />
        </Helmet>
      </Box>
      <Box align={"center"}>
        <Header
            align={"center"}
            label={"Contactez nous"}
            summary={"Vous desirez savoir plus d'informations à propos de 1interviewparjour.com ?"}
            details={"Contactez nous à contact@1interviewparjour.com"}
        />
      </Box>
  </Page>
);