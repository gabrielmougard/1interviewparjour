import React from 'react';
import { Box, Video } from 'grommet';
import Header from '../Header';
import Section from './Section';
import presentationPlanning from '../../img/presentationPlanning.mp4'

export default () => (
  <Section background="#FFFFFF" pad={{ top: 'xlarge' }}>

    <Header
      level={2}
      label="Une manière unique de créer vos planning personnalisés !"
      summary="Adaptez les difficultés, les sujets que vous voulez traiter, les langages... Tant de combinaisons sont possibles !"
    />

    <Box
      direction="row"
      wrap
      justify="center"
      align="center"
      margin={{ top: 'large', bottom: 'xlarge' }}
    >
      <Video controls="over" fit="cover">
        <source key="video" src={presentationPlanning} type="video/mp4" />
        <track
          default
        />
      </Video>
    </Box>
  </Section>
);
