import React, { useEffect } from 'react';
import { Anchor, Box, Image, Paragraph, TextInput, Button, Layer, Text } from 'grommet';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import { Github, Linkedin } from 'grommet-icons';
import Nav from '../../components/Nav';
import Header from '../../components/Header';
import Section from './Section';
import Hero from './Hero'
import MailGif from './MailGif';
import Tree from './Tree';
import Solution from './Solution';
import Enonce from './Enonce';
import PlanningFeature from './PlanningFeature';
import { Us } from './Us';
import Tile from './Tile';

//imgs
import stak from "../../img/stak-hurrah.svg"
import LanguagePicker from './LanguagePicker';

//utils
import { validateEmail } from '../../utils/formatters'

function HomeComponent({fetchSupportedLanguages, supportedLanguages, finalizeSignup, signupCompleted, closeFromInside, closedFromInside}) {
  const { addToast } = useToasts()
  const [languagePicker, setLanguagePicker] = React.useState();
  const [mail, setMail] = React.useState("")

  const handleSignupClick = () => {
    if (validateEmail(mail)) {
      setLanguagePicker(true)
    } else {
      addToast("Votre email n'est pas valide.", { appearance: 'error' })
    }
  }

  useEffect(() => {
    setLanguagePicker(false)
  }, [closedFromInside])

  return (
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
                  value={mail}
                  onChange={event => setMail(event.target.value)}
                />
                <Button primary label="Inscription gratuite !" onClick={() => handleSignupClick()}/>
                {languagePicker && (
                  <Layer
                    margin="large"
                    onEsc={() => setLanguagePicker(false)}
                    onClickOutside={() => setLanguagePicker(false)}
                  >
                    <ToastProvider>
                      <LanguagePicker
                        mail={mail}
                        fetchSupportedLanguages={fetchSupportedLanguages}
                        supportedLanguages={supportedLanguages}
                        finalizeSignup={finalizeSignup}
                        signupCompleted={signupCompleted}
                        closeFromInside={closeFromInside}
                        closedFromInside={closedFromInside}
                      />
                    </ToastProvider>
                  </Layer>
                )}
              </Box>
              Ce n'est pas un sprint.. C'est un marathon !{' '}
              <Anchor href="https://1interviewparjour.com" a11yTitle="1interviewparjour">
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
                      value={mail}
                      onChange={event => setMail(event.target.value)}
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
                        <Button primary label="Inscription gratuite !" onClick={() => handleSignupClick()} />
                      </Box>
                  </Box>
                </Box>
              </Box>
            </Tile>
            <MailGif />
          </Box>
          <Box direction="row-responsive" justify="center">
            <Tree />
            <Solution />
          </Box>
        </Box>
      </Section>

      <Enonce />

      <PlanningFeature />

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
                value={mail}
                onChange={event => setMail(event.target.value)}
              />
              <Button primary label="Inscription gratuite !" onClick={() => handleSignupClick()} />
            </Box>
          </Paragraph>
        }
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
        <Image src={stak} a11yTitle="gremlin" />
      </Box>
    </Section>
  </Box>
  );
}

export default HomeComponent
