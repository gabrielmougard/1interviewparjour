import React, { useEffect } from 'react';
import { Anchor, Box, Image, Paragraph, TextInput, Button, Layer, Heading, Text, Card, CardHeader, CardBody, CardFooter } from 'grommet';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import Nav from '../../components/Nav';
import Footer from '../Footer';
import Section from './Section';
import Hero from './Hero'
import RoutedAnchor from '../RoutedAnchor'
import python_logo from '../../img/python-logo-planning.ico'
import golang_logo from '../../img/golang-logo-planning.png'
import rust_logo from '../../img/rust-logo-planning.png'

import LanguagePicker from './LanguagePicker';

//utils
import { validateEmail } from '../../utils/formatters'

function ProComponent({
  fetchSupportedLanguages,
  supportedLanguages,
  finalizeSignup,
  signupCompleted,
  closeFromInside,
  closedFromInside,
  getStripePubKey,
  stripePubKey
}) {

  const { addToast } = useToasts()
  const [languagePicker, setLanguagePicker] = React.useState();
  const [mail, setMail] = React.useState("")

  const handleBecomeProClick = () => {
    if (validateEmail(mail)) {
      setLanguagePicker(true)
    } else {
      addToast("Votre email n'est pas valide.", { appearance: 'error' })
    }
  }

  useEffect(() => {
    fetch("/api/v1/tracking/landing_page/pro")
    .then((result) => {
    })
  }, [])

  useEffect(() => {
    setLanguagePicker(false)
  }, [closedFromInside])

  return (
    <Box>
        <Section background="brand">
          <Nav />

          <Box align={"center"} pad={{"top": "large", "bottom": "large"}}>
              <Heading size="large" margin="none" textAlign="center">
                <Anchor>6,99€/mois</Anchor> pour les solutions détaillées à tous vos problèmes
              </Heading>
          </Box>

          <Box direction="row-responsive">
            <Box pad={{vertical: "large", horizontal: "medium"}}>
              <Hero pro={true} />
            </Box>
            <Box align="center">
              <Box align="center">
                <Box
                  background="light-1"
                  pad="medium"
                  round="medium"
                  elevation="small"
                  gap="medium"
                  margin={{ top: 'medium' }}
                >
                  <TextInput
                    size="large"
                    placeholder="Votre email !"
                    value={mail}
                    onChange={event => setMail(event.target.value)}
                  />
                  <Button size="large" primary color="accent-1" label="Devenez PRO !" onClick={() => handleBecomeProClick()}/>
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
                          becomePRO={true}
                          getStripePubKey={getStripePubKey}
                          stripePubKey={stripePubKey}
                        />
                      </ToastProvider>
                    </Layer>
                  )}
                </Box>
              </Box>
              <Box>
                <Paragraph>
                  <Text size="large"><Anchor>@h3llb0t :</Anchor> Avec l'offre PRO, recevez une solution optimisée à tous vos problèmes avec une explication détaillée !</Text>
                </Paragraph>
                <Paragraph>
                  <Text size="large" weight="bold"><Anchor>@h3llb0t :</Anchor> Faîte une économie de 78% comparé à l'achat des solutions à l'unité (0,70€/interview x 30 jours)</Text>
                </Paragraph>
                <Paragraph>
                  <Text size="large"><Anchor>@h3llb0t :</Anchor> Devenez incollable sur les algorithmes ! C'est l'expérience <Anchor>1interviewparjour</Anchor> ultime !</Text>
                </Paragraph>
              </Box>
            </Box>
          </Box>
      </Section>

        <Section>
          <Box align={"center"} pad={{bottom: "small"}}>
            <Text size="xxlarge" weight="bold">La <RoutedAnchor path="/method" label="Méthode" /> est compatible avec les langages</Text>
          </Box>

          <Box align={"center"} justify="center" direction="row-responsive">
            <Box pad={{left: "large"}} align={"center"}>
              <Image width={100} src={python_logo}/>
              <RoutedAnchor path="https://python.org" label="Python"/>
            </Box>
            <Box pad={{left: "large"}} align={"center"}>
              <Image width={100} src={golang_logo}/>
              <RoutedAnchor path="https://golang.org" label="Golang"/>
            </Box>
            <Box pad={{left: "large"}} align={"center"}>
              <Image width={100} src={rust_logo}/>
              <RoutedAnchor path="https://rust-lang.org" label="Rust"/>
            </Box>
          </Box>
        </Section>

        <Section>
          <Box align={"center"} pad={{"bottom": "medium"}}>
            <Heading size="large" margin="none" textAlign="center">
              Que voulez-vous accomplir ?
            </Heading>
          </Box>
          <Box align="center" direction="row-responsive">
              <Card width="medium" height={{"max": "500"}} background="light-1" margin="medium">
                <CardHeader pad="medium"><Text size="xlarge" weight="bold">Maîtriser les méthodes et algorithmes courants</Text></CardHeader>
                <CardBody pad="medium">
                  <Text size="large"><RoutedAnchor path="/example" label="95% du temps" />, les entreprises puisent dans des bases de données d'exercices classiques. Sachez reconnaître ces algorithmes sous leurs formes parfois déguisées et finissez la question en <RoutedAnchor path="/example" label="3min" /> chrono là où les autres finisse en <RoutedAnchor path="/example" label="30min" />.</Text>
                </CardBody>
                <CardFooter>
                  <Box
                    background="light-1"
                    pad="medium"
                    round="medium"
                    gap="medium"
                    margin={{ top: 'medium' }}
                  >
                    <TextInput
                      size="large"
                      placeholder="Votre email !"
                    />
                    <Button size="large" primary color="accent-1" label="Devenez PRO !" onClick={() => handleBecomeProClick()}/>
                  </Box>
                </CardFooter>
              </Card>
              <Card width="medium" height={{"max": "500"}} background="light-1" margin="medium">
                <CardHeader pad="medium"><Text size="xlarge" weight="bold">Affuter vos intuitions et booster votre vitesse de raisonnement</Text></CardHeader>
                <CardBody pad="medium">
                  <Text size="large">Parfois, trouver certains ploblèmes requiert un certain degré d'intuition. <RoutedAnchor path="/method" label="L'intuition n'est pas que le propre des surdoués" />. Elle peut être développée en s'entraînant sur divers scénario particulier que nous vous proposons gratuitement.</Text>
                </CardBody>
                <CardFooter>
                  <Box
                    background="light-1"
                    pad="medium"
                    round="medium"
                    gap="medium"
                    margin={{ top: 'medium' }}
                  >
                    <TextInput
                      size="large"
                      placeholder="Votre email !"
                    />
                    <Button size="large" primary color="accent-1" label="Devenez PRO !" onClick={() => handleBecomeProClick()}/>
                  </Box>
                </CardFooter>
              </Card>
              <Card width="medium" height={{"max": "500"}} background="light-1" margin="medium">
                <CardHeader pad="medium"><Text size="xlarge" weight="bold">Concevoir des systèmes entiers et complexes</Text></CardHeader>
                <CardBody pad="medium">
                  <Text size="large">Les tests d'<RoutedAnchor path="/method" label="architecture système" /> ne sont pas rares (en fonction de votre expérience) et sont pourtant parmis les plus difficiles. Nous vous proposons de vous entraîner sur des <RoutedAnchor path="/method" label="mini-projets" /> afin de savoir répondre efficacement à ces situations réelles.</Text>
                </CardBody>
                <CardFooter>
                  <Box
                    background="light-1"
                    pad="medium"
                    round="medium"
                    gap="medium"
                    margin={{ top: 'medium' }}
                  >
                    <TextInput
                      size="large"
                      placeholder="Votre email !"
                    />
                    <Button size="large" primary color="accent-1" label="Devenez PRO !"onClick={() => handleBecomeProClick()}/>
                  </Box>
                </CardFooter>
              </Card>
          </Box>
        </Section>

        <Footer
            fetchSupportedLanguages={fetchSupportedLanguages}
            supportedLanguages={supportedLanguages}
            finalizeSignup={finalizeSignup}
            signupCompleted={signupCompleted}
            closeFromInside={closeFromInside}
            closedFromInside={closedFromInside}
        />
    </Box>
  );
}

export default ProComponent
