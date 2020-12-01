import React, { useEffect } from 'react';
import { Box, Image, Paragraph, Button, CheckBox, Text, Grid, Heading, Anchor } from 'grommet';
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'
import python_anim from '../../../img/pythonAnim.gif'
import golang_anim from '../../../img/golangAnim.gif'
import rust_anim from '../../../img/rustAnim.gif'
import { Checkmark } from 'react-checkmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const LanguageLoader = () => (
    <Loader
        type="Grid"
        color="#7D4CDB"
        height={100}
        width={100}
    />
)

const LanguageAnimation = ({languages}) => {

    const anim_availables = {"go": golang_anim, "rust": rust_anim, "python": python_anim}
    var content
    if (languages.length === 1) {
        if (languages[0] !== "rust") {
            content = <Image width={200} src={anim_availables[languages[0]]}/>
        } else {
            content = <Image width={300} src={anim_availables[languages[0]]}/>
        }
    } else if (languages.length === 2) {
        if (languages.includes("rust")) {
            let otherIdx = languages.indexOf("rust") === 0 ? 1 : 0
            content =
                <Grid
                    rows={['xsmall', 'small']}
                    columns={['small', 'small', 'small']}
                    gap="xsmall"
                    areas={[
                        { name: 'rust', start: [1, 0], end: [2, 0] },
                        { name: 'other', start: [1, 1], end: [2, 1] },
                    ]}
                >
                    <Box gridArea="rust"><Image width={300} src={anim_availables["rust"]}/></Box>
                    <Box gridArea="other"><Image width={200} src={anim_availables[languages[otherIdx]]}/></Box>
                </Grid>
        } else {
            content =
                <Grid
                    rows={['small']}
                    columns={['small', 'small']}
                    gap="small"
                    areas={[
                        { name: 'python', start: [0, 0], end: [1, 0] },
                        { name: 'golang', start: [1, 0], end: [1, 0] },
                    ]}
                >
                    <Box gridArea="python"><Image width={200} src={anim_availables[languages[0]]}/></Box>
                    <Box gridArea="golang"><Image width={200} src={anim_availables[languages[1]]}/></Box>
                </Grid>
        }
    } else {
        let rustIdx = languages.indexOf("rust")
        let other1Idx
        let other2Idx
        if (rustIdx === 0) {
            other1Idx = 1
            other2Idx = 2
        } else if (rustIdx === 1) {
            other1Idx = 0
            other2Idx = 2
        } else {
            other1Idx = 0
            other2Idx = 1
        }
        content =
            <Grid
                rows={['xsmall', 'small']}
                columns={['small', 'small', 'small']}
                gap="small"
                areas={[
                    { name: 'rust', start: [1, 0], end: [2, 0] },
                    { name: 'other1', start: [0, 1], end: [1, 1] },
                    { name: 'other2', start: [2, 1], end: [2, 1] }
                ]}
            >
                <Box gridArea="rust"><Image width={300} src={anim_availables["rust"]}/></Box>
                <Box gridArea="other1"><Image width={200} src={anim_availables[languages[other1Idx]]}/></Box>
                <Box gridArea="other2"><Image width={200} src={anim_availables[languages[other2Idx]]}/></Box>
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
        closedFromInside
    }) => {

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

    useEffect(() => {
        setTimeout(() => {
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
                            <Text>{availableLanguages[i].description}</Text>
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
                </Box>
            </>
    }

    let finalContent
    if (mail === localStorage.getItem("oneinterviewparjour-email-signup")) {
        // we have a response from the signup
        if (Object.keys(signupResponse).length > 0) {
            if (signupResponse.created) {
                let currentHour = new Date().getHours()
                let customMessage
                if (currentHour < 17) {
                    customMessage = "Vous recevrez le(s) énoncé(s) et la/les solutions aujourd'hui à 17h !"
                } else {
                    customMessage = "Vous recevrez le(s) énoncé(s) et la/les solutions à partir de demain à 17h !"
                }
                finalContent =
                <Box align="center" pad={'large'} background={"status-ok"} full={true}>
                    <Box align={"center"}>
                        <Heading textAlign={"center"} margin="none" color="white">
                            Bienvenue <Anchor label={mail} /> !
                        </Heading>
                        <Paragraph size="xxlarge" textAlign={"center"} color="white">
                            {customMessage}
                        </Paragraph>
                    </Box>
                    <Box align="center">
                        <Checkmark size='144' color='#7D4CDB' />
                        <Paragraph size="large" textAlign={"center"} color="white">
                            Dans chaque mail, vous trouverez un lien "<Anchor label={"Planning"} />" pour customiser votre programme hebdomadaire !
                        </Paragraph>
                        <Paragraph size="large" textAlign={"center"} color="white">
                            Dans chaque mail, vous trouverez un lien "<Anchor label={"Pro"} />" pour vous permettre d'avoir les solutions à chaque fois !
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