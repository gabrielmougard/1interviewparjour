import React from 'react';
import { Box, Stack } from 'grommet';
import RoutedAnchor from '../RoutedAnchor'
import Tile from './Tile';
import Hero from './Hero'

export default () => {

  return (
    <Tile
      name="4. (PRO) Recevez une correction détaillée"
      summary={
        <span>
          Si vous avez souscrit à l'offre PRO à{' '}
          <RoutedAnchor path="/pro" label="6,99€/mois" a11yTitle="1interviewparjour - PRO" />
          {' '}, alors vous recevrez en plus une solution détaillée avec les meilleures pratiques et les analyses en complexité.
        </span>
      }
      direction="row"
      width="medium"
      overflow="hidden"
    >
      <Stack anchor="center">
        <Box>
          <Hero cellPading="small" linkThickness="xxsmall" pro={true}/>
        </Box>
      </Stack>
    </Tile>
  );
};
