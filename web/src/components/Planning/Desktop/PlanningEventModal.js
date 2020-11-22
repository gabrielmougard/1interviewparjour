import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner'
import { Anchor, Box, Heading, Text, Button, TextInput, Image, Select, CheckBoxGroup, RadioButtonGroup } from 'grommet';
import pythonLogo from '../../../img/python-logo-planning.ico'
import golangLogo from '../../../img/golang-logo-planning.png'
import rustLogo from '../../../img/rust-logo-planning.png'

function PlanningEventModal({
    event,
    getTopics,
    getDifficulties,
    availableTopics,
    avaiblableDifficulties}) {

    const [languageSelected, setLanguageSelected] = React.useState(event.extendedProps.language !== undefined ? event.extendedProps.language : 'Python')
    const [interviewTitle, setInterviewTitle] = React.useState(event.title)
    const [difficulty, setDifficulty] = React.useState(event.extendedProps.difficulty !== undefined ? event.extendedProps.difficulty : 'medium')
    const [interviewTopics, setInterviewTopics] = React.useState(event.extendedProps.topics !== undefined ? event.extendedProps.topics : ['Aléatoire'])

    useEffect(() => {
        event.setExtendedProp("language", languageSelected)
    }, [languageSelected])

    useEffect(() => {
        event.setExtendedProp("topics", interviewTopics)
    }, [interviewTopics])

    useEffect(() => {
        event.setExtendedProp("difficulty", difficulty)
    }, [difficulty])

    useEffect(() => {
        getTopics()
        getDifficulties()
    }, [])

    const getLanguageLogo = (language, width) => {
        switch (language) {
            case "python":
                return <Image src={pythonLogo} width={width}/>
            case "golang":
                return <Image src={golangLogo} width={width}/>
            case "rust":
                return <Image src={rustLogo} width={width}/>
            default:
                break
        }
    }

    const getEventFormattedDate = (event) => {
        // Should output something like : "Le Vendredi 13/11 de 8h00 à 10h30"
        const dayMap = {"1": "Lundi", "2": "Mardi", "3": "Mercredi", "4": "Jeudi", "5": "Vendredi", "6": "Samedi", "7": "Dimanche"}
        const start = event.start
        const end = event.end
        var formattedDay = "Le " + dayMap[start.getDay()] + " " + start.getDate() + "/" + (start.getMonth() + 1)
        const sMinutes = start.getMinutes() === 0 ? '' : start.getMinutes()
        if (end !== null) {
            const eMinutes = end.getMinutes() === 0 ? '' : end.getMinutes()
            return formattedDay + " de " + start.getHours() + "h" + sMinutes + " à " + end.getHours() + "h" + eMinutes
        } else {
            return formattedDay + " à " + start.getHours() + "h" + sMinutes
        }
    }

    const handleDeleteInterview = (event) => {
        event.remove()
        //the modal should be closed in the eventRemoved callback in the parent component
    }

    // Instead of using useEffect here (very slow ui) we prefer to use a handler with a validation button
    // useEffect(() => {
    //     event.setProp("title", interviewTitle)
    // }, [interviewTitle])
    const handleSaveTitle = () => {
        event.setProp("title", interviewTitle)
    }

    return (
        <Box pad="large">
            <Box pad={{"bottom": "small"}}>
                <Anchor size="large" weight="bold">{getEventFormattedDate(event)}</Anchor>
            </Box>
            {interviewTitle !== '' && (
                <Box direction="row" align="center">
                    <Box pad={{"right": "medium"}}>
                        {getLanguageLogo(languageSelected, 60)}
                    </Box>
                    <Heading>{interviewTitle}</Heading>
                </Box>
            )}
            <Box direction="row-responsive" pad={{"bottom": "medium"}}>
                <Box pad={{"right": "medium"}} >
                    <Box pad="medium" background="brand" round="medium">
                        <Box pad={{"bottom": "small"}}>
                            <Text size="large" weight="bold">Langage :</Text>
                        </Box>
                        <Select
                            options={['python', 'golang', 'rust']}
                            value={languageSelected}
                            onChange={({ option }) => setLanguageSelected(option)}
                        />
                    </Box>
                </Box>
                <Box>
                    <Box pad="medium" background="neutral-2" round="medium">
                        <Box pad={{"bottom": "small"}}>
                            <Text size="large" weight="bold">Titre de l'interview</Text>
                        </Box>
                        <Box direction="row">
                            <TextInput
                                placeholder="Le nom de votre interview :)"
                                value={interviewTitle}
                                onChange={event => setInterviewTitle(event.target.value)}
                            />
                            <Box pad={{"left": "small"}} align="center">
                                <Button
                                    primary
                                    label="Ok"
                                    color="accent-1"
                                    onClick={() => handleSaveTitle()}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
                <Box direction="row-responsive">
                    <Box pad={{"right": "medium"}}>
                        <Box pad="medium" background="neutral-2" round="medium" height="medium" overflow="scroll">
                            <Box pad={{"bottom": "small"}}>
                                <Text size="large" weight="bold">Types de problèmes</Text>
                            </Box>
                            {availableTopics.length > 0 ? (
                                <CheckBoxGroup
                                    flex={true}
                                    value={interviewTopics}
                                    options={availableTopics}
                                    onChange={(topics) => setInterviewTopics(topics.value)}
                                />
                            ) : (
                                <Box>
                                    <Loader
                                        type="Grid"
                                        color="#FFFFFF"
                                        height={100}
                                        width={100}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box pad={{"right": "medium"}}>
                        <Box pad="medium" background="accent-1" round="medium">
                            <Box pad={{"bottom": "small"}}>
                                <Text size="large" weight="bold">Difficulté</Text>
                            </Box>
                            {avaiblableDifficulties.length > 0 ? (
                                <RadioButtonGroup
                                    name="doc"
                                    options={avaiblableDifficulties}
                                    value={difficulty}
                                    onChange={(event) => setDifficulty(event.target.value)}
                                />
                            ) : (
                                <Box>
                                    <Loader
                                        type="Grid"
                                        color="#7D4CDB"
                                        height={100}
                                        width={100}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                <Box>
                    <Box pad="medium" background="brand" round="medium">
                        <Box pad={{"bottom": "small"}}>
                            <Text size="large" weight="bold">Management</Text>
                        </Box>
                        <Button
                            primary
                            label="Effacer"
                            color="status-critical"
                            onClick={() => handleDeleteInterview(event)}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default PlanningEventModal
