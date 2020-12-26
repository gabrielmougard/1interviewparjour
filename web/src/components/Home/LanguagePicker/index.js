import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { Box, Image, Paragraph, Button, CheckBox, Text, Grid, Heading, Anchor } from 'grommet';
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'
import python_anim from '../../../img/pythonAnim.gif'
import golang_anim from '../../../img/golangAnim.gif'
import rust_anim from '../../../img/rustAnim.svg'
import { Checkmark } from 'react-checkmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { config } from '../../../utils/config'
import RoutedAnchor from '../../RoutedAnchor'

const LanguageLoader = () => (
    <Loader
        type="Grid"
        color="#7D4CDB"
        height={100}
        width={100}
    />
)

const LanguageAnimation = ({languages}) => {
    const isPhone = useMediaQuery({
        query: '(max-width: 479px)'
    })

    const anim_availables = {"go": golang_anim, "rust": rust_anim, "python": python_anim}
    var content
    if (languages.length === 1) {
        content = <Image width={isPhone ? 150 : 200} src={anim_availables[languages[0]]}/>
    } else if (languages.length === 2) {
        content =
            <Grid
                rows={['small']}
                columns={[isPhone ? 'xsmall' : 'small', isPhone ? 'xsmall' : 'small']}
                gap="small"
                areas={[
                    { name: 'l1', start: [0, 0], end: [1, 0] },
                    { name: 'l2', start: [1, 0], end: [1, 0] },
                ]}
            >
                <Box gridArea="l1"><Image width={isPhone ? 100 : 200} src={anim_availables[languages[0]]}/></Box>
                <Box gridArea="l2"><Image width={isPhone ? 100 : 200} src={anim_availables[languages[1]]}/></Box>
            </Grid>
    } else {
        content =
            <Grid
                rows={['small']}
                columns={[isPhone ? 'xsmall' : 'small', isPhone ? 'xsmall' : 'small', isPhone ? 'xsmall' : 'small']}
                gap="small"
                areas={[
                    { name: 'l1', start: [0, 0], end: [1, 0] },
                    { name: 'l2', start: [1, 0], end: [2, 0] },
                    { name: 'l3', start: [2, 0], end: [2, 0] }
                ]}
            >
                <Box gridArea="l1"><Image width={isPhone ? 80 : 150} src={anim_availables[languages[0]]}/></Box>
                <Box gridArea="l2"><Image width={isPhone ? 80 : 150} src={anim_availables[languages[1]]}/></Box>
                <Box gridArea="l3"><Image width={isPhone ? 80 : 150} src={anim_availables[languages[2]]}/></Box>
            </Grid>
    }
    return (
        <>{content}</>
    )
}

const LanguagePicker = (
    {
        mail,
        fetchSupportedLanguages,
        supportedLanguages,
        finalizeSignup,
        signupCompleted,
        closeFromInside,
        closedFromInside,
        // Used for Stripe Direct Payment Funnel
        becomePRO,
        getStripePubKey,
        stripePubKey
    }) => {
    const isPhone = useMediaQuery({
        query: '(max-width: 479px)'
    })
    if (becomePRO === undefined) { // if unspecified, set it to false by default
        becomePRO = false
    }
    const { addToast } = useToasts()
    const [availableLanguages, setAvailableLanguages] = React.useState([])
    const [checkedLanguages, setCheckedLanguages] = React.useState(["python"]); // python is always checked by default
    const [signupResponse, setSignupResponse] = React.useState({})

    const handleCheckLanguage = (language, state) => {
        if (state) {
            // add ops
            setCheckedLanguages([...checkedLanguages, language])
        } else {
            // remove ops
            let array = [...checkedLanguages] // make a separate copy of the array
            let index = array.indexOf(language)
            if (index !== -1) {
                array.splice(index, 1)
                setCheckedLanguages(array)
            }
        }
    }

    const handleCloseFromInside = (count) => {
        closeFromInside(count)
    }

    const buyProduct = (userInfo) => {
        if (stripePubKey !== "") {
            /* global Stripe */
            const stripe = Stripe(stripePubKey)
            const { API_URL } = config
            let mail = userInfo.mail

            fetch(API_URL + "/api/v1/stripe/create-checkout-session-from-lp?mail="+mail)
            .then((result) => { return result.json(); })
            .then((data) => {
                // Redirect to Stripe Checkout
                console.log("la data")
                console.log(data)
                return stripe.redirectToCheckout({sessionId: data.sessionId})
            })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (becomePRO) {
                getStripePubKey() // in case of direct buying
            }
            fetchSupportedLanguages() // call saga to fetch the supported languages
        }, 500);
        // eslint-disable-next-line
    }, []) // call this call back only after the first render

    useEffect(() => {
        setAvailableLanguages(supportedLanguages)
    }, [supportedLanguages])

    useEffect(() => {
        setSignupResponse(signupCompleted)
    }, [signupCompleted])

    const handleFinalizeSignup = () => {
        if (checkedLanguages.length === 0) {
            addToast("Vous devez sélectionner au moins 1 langage !", {"appearance": "error"})
        } else {
            localStorage.setItem("oneinterviewparjour-email-signup", mail)
            finalizeSignup({"mail": mail, "languages": checkedLanguages})
        }
    }

    let languagesPicker

    if (Object.keys(availableLanguages).length === 0) {
        languagesPicker = <Box align="center" pad={{top: "large", bottom: "large"}}><LanguageLoader /></Box>
    } else {
        let checkboxes = []
        for (let i = 0; i < availableLanguages.length; i++) {
            checkboxes.push(
                <Box pad="small">
                    <Box pad={{ bottom: 'small' }}>
                        <CheckBox
                            checked={checkedLanguages.includes(availableLanguages[i].language) ? true : false}
                            label={
                                <>
                                    <Box pad={{ right: 'small' }}><Text>{availableLanguages[i].language}</Text></Box>
                                    <Box
                                        background="brand"
                                        pad={{ horizontal: 'small' }}
                                        round
                                    >
                                    <Text>{availableLanguages[i].pbs_count} problèmes</Text>
                                    </Box>
                                </>
                            }
                            onChange={(event) => handleCheckLanguage(availableLanguages[i].language, event.target.checked)}
                        />
                    </Box>
                    {checkedLanguages.includes(availableLanguages[i].language) && (
                        <Box pad="small" round border={{ color: 'brand' }}>
                            <Text size={isPhone ? "xsmall" : "medium"}>{availableLanguages[i].description}</Text>
                        </Box>)
                    }
                </Box>
            )
        }
        languagesPicker =
            <>
                {checkedLanguages.length > 0 && (
                    <Box align="center" pad={{top: "large", bottom: "large"}}>
                        <LanguageAnimation languages={checkedLanguages}/>
                    </Box>
                )}
                {checkboxes}
                <Box pad={{"top": "medium"}}>
                    <Button primary label="C'est parti !" onClick={() => handleFinalizeSignup()} />
                    {isPhone  && (
                        <Button secondary color="status-critical" margin={{top: "small"}} label="Annuler" onClick={() => handleCloseFromInside(closedFromInside)} />
                    )}
                </Box>
            </>
    }

    let finalContent
    if (mail === localStorage.getItem("oneinterviewparjour-email-signup")) {
        // we have a response from the signup
        if (Object.keys(signupResponse).length > 0) {
            if (signupResponse.created) {

                if (becomePRO) {
                    buyProduct({mail: mail})
                }

                let currentHour = new Date().getHours()
                let customMessage
                if (becomePRO) {
                    customMessage = "Complétez le formulaire de paiement pour profiter de notre expérience ultime ! Vous serez redirigez vers une page de confirmation après l'achat effectué."
                } else {
                    if (currentHour < 17) {
                        customMessage = "Vous recevrez le(s) énoncé(s) et la/les solutions aujourd'hui à 17h !"
                    } else {
                        customMessage = "Vous recevrez le(s) énoncé(s) et la/les solutions à partir de demain à 17h !"
                    }
                }

                finalContent =
                <Box align="center" pad={'large'} background={"status-ok"} full={true}>
                    <Box align={"center"}>
                        <Heading size={isPhone ? "small": "medium"} textAlign={"center"} margin="none" color="white">
                            Bienvenue <Anchor label={mail} />
                        </Heading>
                        <Paragraph size="xlarge" textAlign={"center"} color="white">
                            {customMessage}
                        </Paragraph>
                    </Box>
                    <Box align="center">
                        <Box><Checkmark size={isPhone ? '100' : '144'} color='#7D4CDB' /></Box>
                        <Paragraph size="large" textAlign={"center"} color="white">
                            Dans chaque mail, vous trouverez un lien <RoutedAnchor path="/method" label={"'Planning'"} /> pour customiser votre programme hebdomadaire !
                        </Paragraph>
                        <Paragraph size="large" textAlign={"center"} color="white">
                            Dans chaque mail, vous trouverez un lien <RoutedAnchor path="/pro" label={"'Pro'"} /> (si vous n'avez pas souscrit à l'offre PRO) pour vous permettre d'avoir les solutions à chaque fois !
                        </Paragraph>
                    </Box>
                    <Box align="center">
                        <Button primary label="Ok !" onClick={() => handleCloseFromInside(closedFromInside)} />
                    </Box>
                </Box>
            } else {
                if (becomePRO) {
                    buyProduct({mail: mail})

                    finalContent =
                    <Box align="center" pad={'large'} background={"accent-4"} full={true}>
                        <Box align={"center"}>
                            <Heading textAlign={"center"} margin="none" color="white">
                                Re-bonjour <Anchor label={mail} /> !
                            </Heading>
                            <Paragraph size="xxlarge" textAlign={"center"} color="white">
                                Complétez le formulaire de paiement pour profiter de notre expérience ultime ! Vous serez redirigez vers une page de confirmation après l'achat effectué.
                            </Paragraph>
                        </Box>
                        <Box align="center">
                            <Box><Checkmark size={isPhone ? '100' : '144'} color='#7D4CDB' /></Box>
                            <Paragraph size="large" textAlign={"center"} color="white">
                                Dans chaque mail, vous trouverez un lien <RoutedAnchor path="/method" label={"'Planning'"} /> pour customiser votre programme hebdomadaire !
                            </Paragraph>
                        </Box>
                        <Box align="center">
                            <Button primary label="Ok !" onClick={() => handleCloseFromInside(closedFromInside)} />
                        </Box>
                    </Box>

                } else {
                    finalContent =
                    <Box align="center" pad={'large'} background={"status-error"} full={true}>
                        <Box align={"center"}>
                            <Heading textAlign={"center"} margin="none" color="white">
                                L'adresse <Anchor label={mail} /> existe deja ! Veuillez en sélectionner une autre.
                            </Heading>
                        </Box>
                        <Box align="center" pad={'large'}>
                            <FontAwesomeIcon icon={faTimesCircle} size="8x" color="white"/>
                        </Box>
                        <Box align="center" pad={'large'}>
                            <Button primary label="Retour" onClick={() => handleCloseFromInside(closedFromInside)} />
                        </Box>
                    </Box>
                }
            }
        } else {
            finalContent =
            <Box pad="large">
                <Paragraph size="xxlarge" textAlign="center">
                    Choisissez le ou les langages pour vous entraîner !
                </Paragraph>
                {languagesPicker}
            </Box>
        }
    } else {
        finalContent =
        <Box pad="large">
            <Paragraph size="xxlarge" textAlign="center">
                Choisissez le ou les langages pour vous entraîner !
            </Paragraph>
            {languagesPicker}
        </Box>
    }


    return (
        <>
            {finalContent}
        </>
    );
};

export default LanguagePicker