import React, { useEffect } from 'react';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import { useMediaQuery } from 'react-responsive'
import { Anchor, Box, Image, Paragraph, TextInput, Button, Layer } from 'grommet';
import { Github, Linkedin } from 'grommet-icons';
import Section from './Home/Section';
import RoutedAnchor from './RoutedAnchor'
import Header from './Header';
import LanguagePicker from './Home/LanguagePicker';

//imgs
import stak from "../img/stak-hurrah.svg"

//utils
import { validateEmail } from '../utils/formatters'

function Footer({fetchSupportedLanguages, supportedLanguages, finalizeSignup, signupCompleted, closeFromInside, closedFromInside}) {
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
        setLanguagePicker(false)
    }, [closedFromInside])

    return (
        <Section pad={{ top: 'xlarge', left: 'xlarge', right: 'xlarge' }} background="accent-1">
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
                            href="https://linkedin/in/gabriel-mougard" // TODO : change this broken link
                            icon={<Linkedin color="brand" size="large" />}
                        />
                    </Box>
                    <Paragraph>
                        <RoutedAnchor
                            target="_blank"
                            path="/"
                            label="1interviewparjour.com"
                        /> est une&nbsp;
                        <Anchor
                            target="_blank"
                            href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
                        >
                        PWA
                        </Anchor>
                        . Vous pouvez la sauvegarder pour la lire en mode offline.
                    </Paragraph>
                    <Paragraph>
                        <RoutedAnchor path="/cgu" label="Conditions d'utilisation " />
                        | <br></br>
                        <RoutedAnchor path="/privacy" label="Politique de confidentialité " />
                        | <br></br>
                        <RoutedAnchor path="/contact" label="Contact " />
                        |
                    </Paragraph>
                </Box>
                <Image src={stak} height={isPhone ? 200 : 550} a11yTitle="gremlin" />
            </Box>
        </Section>
    )
}

export default Footer
