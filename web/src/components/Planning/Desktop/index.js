import React, { useEffect } from 'react';
import { Box, Heading, Text, Button, Image, Layer } from 'grommet';
import Nav from '../../../components/Nav';
import Section from '../../Home/Section';

// calendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { createEventId } from './event-utils'

// Toast
import { useToasts } from 'react-toast-notifications'

//Loader
import Loader from 'react-loader-spinner'

// img
import pythonLogo from '../../../img/python-logo-planning.ico'
import golangLogo from '../../../img/golang-logo-planning.png'
import rustLogo from '../../../img/rust-logo-planning.png'
import Sky from 'react-sky';

import styled from 'styled-components'
import PlanningEventModal from './PlanningEventModal';


const DraggableButton = styled(Button)`
    cursor: move;
`

export function PlanningComponent({
    savePlanning,
    getTopics,
    getDifficulties,
    availableTopics,
    avaiblableDifficulties,
    fetchInitialPlanning,
    initialPlanningData
}) {

    const [initialCalendarStates, setInitialCalendarStates] = React.useState([])
    const [calendarStates, setCalendarStates] = React.useState([])
    //modal
    const [openInterviewModal, setOpenInterviewModal] = React.useState([false, {}])
    const { addToast, removeToast } = useToasts()

    useEffect(() => {

        //fetch initial planning
        const query = new URLSearchParams(window.location.search)
        const mail = query.get('mail')
        fetchInitialPlanning({mail})

        let draggableElements = document.getElementById('external-events');

        new Draggable(draggableElements, {
            itemSelector: '.external-event',
            eventData: function(eventEl) {
                return {
                    id: createEventId(),
                    title: "Interview " + eventEl.innerText.toLowerCase(),
                    extendedProps: {
                        difficulty: "medium",
                        topics: ["Aléatoire"],
                        language: eventEl.innerText
                    }
                };
            }
        })

        setInterval(function() { //network state polling

            const onlineCallback = () => {
                removeToast(localStorage.getItem('offlineToastId'))
                localStorage.removeItem('offlineToastId')
            }

            const offlineCallback = id => {
                localStorage.setItem('offlineToastId', id)
            }

            if (!window.navigator.onLine) {
                if (!localStorage.getItem("offlineToastId")) {
                    addToast(
                        <div>
                            <strong>Hors ligne</strong>
                            <div>Les futurs changements ne seront pas enregistrés.</div>
                        </div>,
                        {
                            appearance: 'info',
                            autoDismiss: false,
                        },
                        offlineCallback
                    )
                }
            } else {
                if (localStorage.getItem("offlineToastId")) {
                    addToast(
                        <div>
                            <strong>En ligne</strong>
                            <div>Le mode édition est de nouveau disponible.</div>
                        </div>,
                        {
                            appearance: 'success',
                            autoDismiss: true,
                        },
                        onlineCallback
                    )
                }
            }
        }, 2000)

        setInterval(function() { //regularly save the data to backend using calendarSavingBuffer
            const storedPlanning = sessionStorage.getItem('1interviewparjour-planning')
            if (storedPlanning !== undefined && storedPlanning.length > 0) {
                addToast(
                    "Sauvegarde automatique...",
                    {
                        appearance: 'info',
                        autoDismiss: true,
                    }
                )
                savePlanning({planning: JSON.parse(storedPlanning), mail: mail})
                sessionStorage.setItem('1interviewparjour-planning', [])
            }
        }, 2000)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (calendarStates.length > 0) {
            sessionStorage.setItem('1interviewparjour-planning', JSON.stringify(calendarStates))
        }
    }, [calendarStates])

    useEffect(() => {
        //pre-populate calendar states with the existing data
        let formattedExistingData = []
        for (let i = 0; i < initialPlanningData.length; i++) {
            formattedExistingData.push(
                {
                    id: createEventId(),
                    title: initialPlanningData[i].title,
                    start: initialPlanningData[i].startStr,
                    extendedProps: {
                        difficulty: initialPlanningData[i].difficulty,
                        topics: initialPlanningData[i].topics,
                        language: initialPlanningData[i].language
                    }
                }
            )
        }
        //set the inital data for the fullcalendar
        setInitialCalendarStates(formattedExistingData)

        let calendar = []
        for (let i = 0; i < formattedExistingData.length; i++) {
            calendar.push(
                {
                    id: formattedExistingData[i].id,
                    title: formattedExistingData[i].title,
                    start: formattedExistingData[i].start,
                    end: formattedExistingData[i].start,
                    language: formattedExistingData[i].extendedProps.language,
                    difficulty: formattedExistingData[i].extendedProps.difficulty,
                    topics: formattedExistingData[i].extendedProps.topics
                }
            )
        }
        //set the calendar for later (we don't want it to be empty since the existing events maybe be edited)
        setCalendarStates(calendar)
    }, [initialPlanningData])

    const handleEventClick = (info) => {
        let event = info.event
        // open the PlanningEventModal and pass the `event` variable in props
        setOpenInterviewModal([true, event])
    }

    const handleEventChange = (info) => {
        let id = info.event.id
        let updated = []
        for (let i = 0; i < calendarStates.length; i++) {
            let event = calendarStates[i]
            if (event.id === id) {
                let updatedEvent = {
                    id: id,
                    title: info.event.title,
                    start: info.event.startStr,
                    end: info.event.endStr,
                    language: info.event.extendedProps.language,
                    difficulty: info.event.extendedProps.difficulty,
                    topics: info.event.extendedProps.topics
                }
                updated.push(updatedEvent)
            } else {
                updated.push(event)
            }
        }
        setCalendarStates(updated)
    }

    const handleEventAdd = (info) => {
        let event = info.event
        let newEvent = {
            id: event.id,
            title: event.title,
            start: event.startStr,
            end: event.endStr,
            language: event.extendedProps.language,
            difficulty: event.extendedProps.difficulty,
            topics: event.extendedProps.topics
        }
        setCalendarStates([...calendarStates, newEvent])
    }

    const handleEventRemove = (info) => {
        let id = info.event.id
        let filtered = calendarStates.filter((value) => { return value.id !== id})
        setCalendarStates(filtered)
        setOpenInterviewModal([false, info.event]) // close the modal when the 'remove' button is clicked inside the modal.
    }

    const handleEventReceive = (info) => {
        let event = info.event
        let newEvent = {
            id: event.id,
            title: event.title,
            start: event.startStr,
            end: event.endStr,
            language: event.extendedProps.language,
            difficulty: event.extendedProps.difficulty,
            topics: event.extendedProps.topics
        }
        setCalendarStates([...calendarStates, newEvent])
    }

    const handleDateSelect = (selectInfo) => {

        let event = {
            id: createEventId(),
            title: "Interview", // this is temporary. Should be modified once the PlanningEventModal component call changeEvent to set the language.
            start: selectInfo.start,
            end: selectInfo.end,
            extendedProps: {
                difficulty: "medium",
                topics: ["Aléatoire"]
            }
        }
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection
        calendarApi.addEvent(event)
        // open the PlanningEventModal and pass the `event` variable in props
        setOpenInterviewModal([true, calendarApi.getEventById(event.id)])
    }

    const renderEventContent = (info) => {
        let logo
        switch (info.event.extendedProps.language) {
            case "python":
                logo = <Image src={pythonLogo} width={20}/>
                break
            case "golang":
                logo = <Image src={golangLogo} width={20}/>
                break
            case "rust":
                logo = <Image src={rustLogo} width={20}/>
                break
            default:
                break
        }

        // TODO : implement a tooltip here for difficulty and the topics of the problem

        return (
            <>
                <div>
                    <b>{info.timeText}</b>
                </div>
                <Box direction="row">
                    {logo}
                    <b>{info.event.title}</b>
                </Box>
            </>
        )
    }
    //

    let calendarContent
    if (initialCalendarStates.length > 0) {
        calendarContent =
        <Box flex={true} height="large">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: '',
                    center: 'title',
                    right: ''
                }}
                initialView='timeGridWeek'
                locale='fr'
                contentHeight={'60vh'}
                buttonText={{
                    today: "Aujourd'hui",
                    month: "mois",
                    week: "semaine",
                    day: "jour",
                    list: "liste"
                }}
                scrollTime={'12:00:00'}
                firstDay={1}
                eventColor={'#7D4CDB'}
                allDaySlot={false}
                droppable={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                initialEvents={initialCalendarStates} // alternatively, use the `events` setting to fetch from a feed
                eventContent={renderEventContent} // custom render function
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventAdd={handleEventAdd}
                eventChange={handleEventChange}
                eventRemove={handleEventRemove}
                eventReceive={handleEventReceive}
            />
        </Box>
    } else {
        calendarContent =
            <Box flex={true} align="center">
                <Loader
                    type="Grid"
                    color="#7D4CDB"
                    height={100}
                    width={100}
                />
            </Box>
    }


    return (
        <Box>
            {openInterviewModal[0] && (
                <Layer
                    margin="large"
                    onEsc={() => setOpenInterviewModal([false, openInterviewModal[1]])}
                    onClickOutside={() => setOpenInterviewModal([false, openInterviewModal[1]])}
                >
                    <PlanningEventModal
                        getTopics={getTopics}
                        getDifficulties={getDifficulties}
                        availableTopics={availableTopics}
                        avaiblableDifficulties={avaiblableDifficulties}
                        event={openInterviewModal[1]}
                    />
                </Layer>
            )}
            <Section>
                <Nav />
                <Box align="center" pad={{top: "large", bottom: "large"}}>
                    <Heading textAlign="center" margin="none">
                        Composez le planning parfait !
                    </Heading>
                </Box>
                <Sky
                images={{
                    0: pythonLogo,
                    1: golangLogo,
                    2: rustLogo
                }}
                how={130} /* Pass the number of images Sky will render chosing randomly */
                time={40} /* time of animation */
                size={'50px'} /* size of the rendered images */
                background={'palettedvioletred'} /* color of background */
                />
            </Section>
            <Box align="center" direction="row" pad={{right: "large", left: "large"}}>
                <Box align="center" direction="column" background="brand" round="small" margin={{right: "medium"}}>
                    <Box pad="medium" direction="column" align="center" border={{"color": "white", "size": "medium","style": "dashed","side": "bottom"}}>
                        <Text size="large" weight="bold">1) Glissez et déposez</Text>
                        <Text>les interviews sur ce beau calendrier</Text>
                    </Box>
                    <Box direction="column" align="center" id="external-events">
                        <Box pad={{"top": "small"}} direction="column" align="center">
                            <DraggableButton className="external-event" icon={<Image src={pythonLogo} width={30}/>} primary label="python" />
                        </Box>
                        <Box pad={{"top": "small"}} direction="column" align="center">
                            <DraggableButton className="external-event" icon={<Image src={golangLogo} width={30}/>} primary label="golang" />
                        </Box>
                        <Box pad={{"top": "small", "bottom": "small"}} direction="column" align="center">
                            <DraggableButton className="external-event" icon={<Image src={rustLogo} width={30}/>} primary label="rust" />
                        </Box>
                    </Box>
                    <Box pad="medium" direction="column" align="center" border={{"color": "white", "size": "medium","style": "dashed","side": "top"}}>
                        <Text>ensuite,</Text>
                        <Text size="large" weight="bold">2) Clickez sur l'évènement...</Text>
                        <Text>afin de déterminer :</Text>
                        <Text size="large" weight="bold">- la difficulté</Text>
                        <Text size="large" weight="bold">- le type du problème</Text>
                        <Text>... et d'autres paramètres !</Text>
                    </Box>
                </Box>
                {calendarContent}
            </Box>
        </Box>
    )
}
