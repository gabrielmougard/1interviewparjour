import React from 'react';
import { Box, Stack } from 'grommet';
import Tile from './Tile';
import mailopeningv2 from '../../img/mailopeningv2.gif'

export default () => {
  const [build, setBuild] = React.useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => setBuild(!build), 3000);
    return () => clearInterval(timer);
  }, [build]);

  return (
    <Tile
      name="2. Recevez l'interview"
      summary={
        <span>
          Recevez votre interview personnalisée par mail tout les jours à une heure déterminée !
        </span>
      }
    >
      <Stack anchor="center">
        <Box direction="row" gap="medium" height="small" width="small">
          <img src={mailopeningv2} />
        </Box>
      </Stack>
    </Tile>
  );
};
