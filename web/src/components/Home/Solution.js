import React from 'react';
import { Box, Anchor, Stack, Image } from 'grommet';
import Tile from './Tile';

import pro from '../../../public/img/pro.png'

export default () => {

  return (
    <Tile
      name="4. (PRO) Recevez une correction détaillée"
      summary={
        <span>
          Si vous avez souscrit à l'offre PRO à{' '} 
          <Anchor href="https://1interviewparjour.fr" a11yTitle="1interviewparjour">
            7€/mois
          </Anchor>
          {' '}, alors vous recevrez en plus une solution détaillée avec les meilleures pratiques et les analyses en complexité.
        </span>
      }
      direction="row"
      width="medium"
      overflow="hidden"
    >
      <Stack anchor="center">
        <Box direction="row" gap="medium" height="small" width="small">
          <Image
            fit="cover"
            src={pro}
          />
        </Box>
      </Stack>
    </Tile>
  );
};
