import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { Anchor, Box, Paragraph, TextInput, Button, Layer, Video, Text } from 'grommet';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import Nav from '../../components/Nav';
import Footer from '../Footer';
import Header from '../../components/Header';
import Section from './Section';
import MailGif from './MailGif';
import Tree from './Tree';
import Solution from './Solution';
import Tile from './Tile';

import presentationPlanning from '../../img/presentationPlanning.mp4'

import LanguagePicker from './LanguagePicker';

//utils
import { validateEmail } from '../../utils/formatters'
import { config } from '../../utils/config'

function MethodComponent({fetchSupportedLanguages, supportedLanguages, finalizeSignup, signupCompleted, closeFromInside, closedFromInside}) {
    const isPhone = useMediaQuery({
        query: '(max-width: 479px)'
    })

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
        const { API_URL } = config
        fetch(API_URL + "/api/v1/tracking/landing_page/method")
        .then((result) => {
        })
    }, [])

    useEffect(() => {
        setLanguagePicker(false)
    }, [closedFromInside])

    return (
        <Box>
            <Section width="auto">
                <Nav />

                <Box direction="row" wrap justify="center" margin={{top: "xlarge"}}>
                    <Header
                        level={2}
                        label="Comment marche notre méthode ?"
                        pad={{top: "xlarge"}}
                    />
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
                                    <Button
                                        primary
                                        label="Inscription gratuite !"
                                        onClick={() => handleSignupClick()}
                                    />
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

            <Section width="auto" background="brand">
                <Box align={"center"} pad={{"top": "large", "bottom": "large"}}>
                <Header
                    level={1}
      label="Une manière unique de créer vos planning personnalisés !"
      summary="Adaptez les difficultés, les sujets que vous voulez traiter, les langages... Tant de combinaisons sont possibles !"
    />
                </Box>

                <Box direction="row-responsive">
                    <Box pad={{horizontal: "xxlarge"}}>
                        <Video controls="over" fit="contain">
                            <source key="video" src={presentationPlanning} type="video/mp4" />
                            <track default />
                        </Video>
                    </Box>
                    <Box align="center" margin={isPhone ? null : {left: "xlarge"}}>
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
                                />
                                <Button size="large" primary color="accent-1" label="Inscription gratuite !"/>
                            </Box>
                        </Box>
                        <Box>
                            <Paragraph>
                            <Text size="large"><Anchor>@h3llb0t :</Anchor> Personnalisez votre planning en fonction de vos besoins. Vous recevrez gratuitement les problèmes les plus optimisés.</Text>
                            </Paragraph>
                            <Paragraph>
                            <Text size="large" weight="bold"><Anchor>@h3llb0t :</Anchor> Plus besoins de services de "mock interviews", vous avons les énoncés qu'il vous faut.</Text>
                            </Paragraph>
                            <Paragraph>
                            <Text size="large"><Anchor>@h3llb0t :</Anchor> Finalement : avec un planning complet, vous viendrez à bout des tests les plus redoutables.</Text>
                            </Paragraph>
                        </Box>
                    </Box>
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
    )
}

export default MethodComponent