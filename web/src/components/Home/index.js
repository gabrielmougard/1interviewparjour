import React from 'react';
import { Anchor, Box, Image, Paragraph, TextInput, Button } from 'grommet';
import { Github, Linkedin } from 'grommet-icons';
import Nav from '../../components/Nav';
import Header from '../../components/Header';
import Section from './Section';
import Hero from './Hero'
import MailInput from './MailInput';
import MailGif from './MailGif';
import Tree from './Tree';
import Solution from './Solution';
import Enonce from './Enonce';
import Companies from './Companies';
import { Us } from './Us';

export default () => (
  <Box>
    <Section>
      <Nav />

      <Hero />

      <Header
        label="Réussissez vos tests techniques à votre rythme..."
        summary={
          <Paragraph size="xxlarge" textAlign="center">
            <Box
              direction="row-responsive"
              gap="large"
              justify="center"
              margin={{ vertical: 'large' }}
            >
        <TextInput
          size="medium"
          placeholder="Votre email !"
        />
        <Button primary label="Inscription gratuite !" />
      </Box>
            Ce n'est pas un sprint.. C'est un marathon !{' '}
            <Anchor href="https://1interviewparjour.fr" a11yTitle="1interviewparjour">
              1 interview par jour
            </Anchor>
            {' '}sans prise de tête... Gratuitement.
          </Paragraph>
        }
      />

      
    </Section>

    <Section background="light-1" pad={{ top: 'xlarge' }} width="auto">
      <Header
        level={2}
        label="Comment marche notre système ?"
      />

      <Box direction="row" wrap justify="center">
        <Box direction="row-responsive" justify="center">
          <MailInput />
          <MailGif />
        </Box>

        <Box direction="row-responsive" justify="center">
          <Tree />
          <Solution />
        </Box>
      </Box>
    </Section>

    <Enonce />

    <Companies />

    <Us />

    <Section pad={{ top: 'xlarge', left: 'xlarge', right: 'xlarge' }}>
      
      <Header
        level={2}
        label="1interviewparjour.com"
        summary={
        <Paragraph size="xxlarge" textAlign="center">
          <Box
            direction="row-responsive"
            gap="large"
            justify="center"
          >
            <TextInput
              size="medium"
              placeholder="Votre email !"
            />
            <Button primary label="Inscription gratuite !" />
          </Box>
        </Paragraph>}
      />

      <Box direction="row-responsive" justify="between" align="end">
        <Box margin={{ vertical: 'xlarge' }}>
          <Box direction="row" gap="small">
            <Anchor
              target="_blank"
              a11yTitle="Share feedback on Github"
              href="https://github.com/gabrielmougard"
              icon={<Github color="brand" size="large" />}
            />
            <Anchor
              target="_blank"
              a11yTitle="Chat with us on LinkedIn"
              href="https://linkedin/in/gabriel-mougard"
              icon={<Linkedin color="brand" size="large" />}
            />
          </Box>
          <Paragraph>
          <Anchor
              target="_blank"
              href="https://1interviewparjour.com"
            >
            1interviewparjour.com
            </Anchor> est une&nbsp;
            <Anchor
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
            >
              PWA
            </Anchor>
            . Vous pouvez la sauvegarder pour la lire en mode offline.
          </Paragraph>
          <Paragraph>
            <Anchor target="_blank" href="https://1interviewparjour.com/cgu">
              Conditions d'utilisation
            </Anchor> | <br></br>
            <Anchor target="_blank" href="https://1interviewparjour.com/privacy">
              Politique de confidentialité
            </Anchor> | <br></br>
            <Anchor target="_blank" href="https://1interviewparjour.com/contact">
              Contact
            </Anchor> |
          </Paragraph>
        </Box>

        <Image src="/img/stak-hurrah.svg" a11yTitle="gremlin" />
      </Box>
    </Section>
  </Box>
);
