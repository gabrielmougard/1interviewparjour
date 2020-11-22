import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import today_problem_picture from "../../img/before_1interviewparjour.gif"
import today_problem_solution from "../../img/after_1interviewparjour.gif"

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
      <Section pad={{ top: 'xlarge' }} background="brand">
        <Header
          label="Les sprints de 1 semaine avant le test... ça peut être chaud."
          summary="Dans la vie, il y a deux type de personnes :"
        />
        <Box
          justify="center"
          gap="large"
          margin={{ horizontal: 'large', top: 'large' }}
        >
          <Box align="center" size="small" pad={{ horizontal: 'large' }}>
            <Paragraph textAlign="center" size="xlarge" alignSelf="center">
            Ceux qui se donne bonne conscience en s'entraînant un peu avant (ou pas)... ouch !"
            </Paragraph>
            <Box flex />
            <Image width={500} src={today_problem_picture} />
          </Box>
          <Box align="center" size="small" pad={{ horizontal: 'large', "bottom": 'large' }}>
            <Paragraph textAlign="center" size="xlarge" alignSelf="center">
            Ceux qui ont adopté la routine et intégré durablement les connaissances avec
            <Anchor
              size="xlarge"
              href={"https://1interviewparjour.com"}
              label={<Text size="large"> 1interviewparjour</Text>}
              reverse
              target="_blank"
            />... yay !
            </Paragraph>
            <Box flex />
            <Image width={500} src={today_problem_solution} />
          </Box>
        </Box>
      </Section>
    </Box>
  );
};
