import React from 'react';
import { Box, Image } from 'grommet';
import Header from '../Header';
import Section from './Section';


const COMPANIES = [
  'HPE',
  'GE',
  'Boeing',
  'GitHub',
  'HP',
  'Samsung',
  'Twilio',
  'DXC',
  'MicroFocus',
  'Shopify',
  'Datadog',
  'Sigfox',
  'Blablacar3',
  'IBM',
  'Aruba',
];

export default () => (
  <Section background="light-1" pad={{ top: 'xlarge' }}>

    <Header
      level={2}
      label="Permettez vous de viser les 🦄 !"
      summary="Trotinettes électriques dans les couloirs, salaires avantageux, nourriture gratuite... Pour ça, soyez prêt à enchaîner les interviews."
    />

    <Box
      direction="row"
      wrap
      justify="center"
      align="center"
      margin={{ top: 'large', bottom: 'xlarge' }}
    >
      {COMPANIES.map(name => (
        <Box
          key={name}
          basis="small"
          direction="row"
          justify="center"
          align="center"
          margin="medium"
        >
          <Image
            alt={`${name} logo`}
            size="small"
            src={`img/logos/${name}-logo.svg`}
          />
        </Box>
      ))}
    </Box>
  </Section>
);
