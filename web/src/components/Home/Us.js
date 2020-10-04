import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Anchor,
  Box,
  Image,
  Text,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { Next } from 'grommet-icons';

import Header from '../Header';
import Section from './Section';

const Tile = ({ desc, label, link, src }) => {
  const size = useContext(ResponsiveContext);
  const imgWidth = size === 'medium' ? 365 : 482;
  return (
    <Box align="center" size="small" pad={{ horizontal: 'large' }}>
      <Anchor
        size="xlarge"
        href={link}
        label={<Text size="large">{label}</Text>}
        icon={<Next color="control" />}
        reverse
        target="_blank"
      />
      <Paragraph textAlign="center" size="xlarge" alignSelf="center">
        {desc}
      </Paragraph>
      <Box flex />
      <Image width={imgWidth} src={src} a11yTitle={label} />
    </Box>
  );
};

Tile.propTypes = {
  desc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export const Us = () => {
  return (
    <Box>
      <Section pad={{ top: 'xlarge' }} background="neutral-2">
        <Header
          label="Rencontrez l'équipe"
          summary="Ils et elles sont les humbles créateurs des problèmes de 1interviewparjour.com"
        />
        <Box
      
          justify="center"
          gap="large"
          margin={{ horizontal: 'large', top: 'large' }}
        >
          <Tile
            desc="Je suis Software Engineer Intern à Criteo. Je termine mes études à Oslo University College et aussi... j'adore le code !"
            label="Gabriel Mougard"
            link="https://www.linkedin.com/in/gabriel-mougard/"
            src="/img/gab-datacenter.png"
          />
          <Tile
            desc="Je suis Data Scientist à <ENTREPRISE>. Je suis diplomée de l'université Polytechnique Montréal et SQL n'a aucun secret pour moi !"
            label="Myriam Njoya"
            link="https://www.linkedin.com/in/myriam-njoya-7610b5161/"
            src="/img/myriam.png"
          />
          <Tile
            desc="Je suis une IA développée afin de noter vos réponses et aussi... vous faire subir l'enfer niark !"
            label="HellBot aka. H3ll-807"
            link="https://github.com/gabrielmougard/"
            src="/img/hell-bot.png"
          />
        </Box>
      </Section>
    </Box>
  );
};
