import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Anchor,
  Box,
  Image,
  Text,
  Paragraph,
  ResponsiveContext,
  Button
} from 'grommet';

import { Next } from 'grommet-icons';

import Header from '../Header';
import Section from '../Home/Section';
import Nav from '../Nav';

const Subscription = ({ desc, price, link, src }) => {
  const size = useContext(ResponsiveContext);
  const imgWidth = size === 'medium' ? 365 : 482;
  return (
    <Box align="center" size="small" pad={{ horizontal: 'large' }}>
      <Image width={imgWidth} src={src} a11yTitle={price} />
      <Header
        label={price}
        size={"medium"}
      />
      <Paragraph textAlign="center" size="xlarge" alignSelf="center">
        {desc}
      </Paragraph>
      <Button primary label="Acheter" />
      <Box flex />
    </Box>
  );
};

export const PaymentPortal = () => {
  return (
    <Box>
      <Section>
        <Nav />
      </Section>
      <Section pad={{ top: 'medium' }}s>
        <Header
          label="Choisissez votre offre !"
          summary="Passez au niveau supérieur en analysant nos solutions optimisées aux petits oignon 😉"
        />
        <Box
          direction="row-responsive"
          justify="center"
          gap="large"
          margin={{ horizontal: 'large'}}
        >
          <Subscription
            desc="Incroyable ! Vous recevez toutes les solutions des problèmes avec les explications détaillées ! C'est notre expérience ultime !"
            price="11,99€/mois"
            link="https://designer.grommet.io/"
            src="https://1interviewparjour.s3.eu-central-1.amazonaws.com/landing+pages/payment/premium-logo.png"
          />
          <Subscription
            desc="Recevez la solution de ce problème uniquement avec les explications détaillées ! C'est moins cher qu'un café !"
            price="0,80€"
            link="https://theme-designer.grommet.io/"
            src="https://1interviewparjour.s3.eu-central-1.amazonaws.com/landing+pages/payment/premium-logo.png"
          />
        </Box>
      </Section>
    </Box>
  );
};