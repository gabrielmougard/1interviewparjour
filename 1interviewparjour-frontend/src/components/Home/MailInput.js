import React from 'react';
import { Box, TextInput, Button } from 'grommet';
import Tile from './Tile';

export default () => {

  return (
    <Tile
      name="1. Inscrivez vous"
      summary={
        <span>
          Rentrez votre mail ci-dessus. Notre équipe se charge du reste et vous concocte des problèmes intriguant ! 
        </span>
      }
      direction="row"
      wrap
      justify="between"
    >
      <Box elevation="medium">
        <Box
          width="medium"
          direction="row"
          align="center"
          justify="between"
          gap="medium"
          pad={{ vertical: 'small', horizontal: 'medium' }}
        >
      
            <Box animation="fadeIn" align="center" pad={{ vertical: 'small', horizontal: 'large' }}>
              <TextInput
                size="medium"
                placeholder="Votre email !"
              />
            </Box>   
        </Box>
        <Box
          direction="row"
          justify="between"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          background="light-2"
        >
          <Box direction="row" gap="small" align="center" pad={{ vertical: 'small', horizontal: 'large' }}>
              <Box animation="fadeIn">
                <Button primary label="Inscription gratuite !" />
              </Box>
          </Box>
        </Box>
      </Box>
    </Tile>
  );
};
