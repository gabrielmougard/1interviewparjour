import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text, Button, TextInput, Image } from 'grommet';
import Nav from '../../../components/Nav';
import Section from '../../Home/Section';

// calendar
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'

// img
import pythonLogo from '../../../img/python-logo-planning.ico'
import golangLogo from '../../../img/golang-logo-planning.png'
import rustLogo from '../../../img/rust-logo-planning.png'

import styled from 'styled-components'


const DraggableButton = styled(Button)`
    cursor: move;
`

export function PlanningComponent() {

    const [weekendsVisible, setWeekendsVisible] = React.useState(true)
    const [currentEvents, setCurrentEvents] = React.useState([])
    const [searchInterviewCode, setSearchInterviewCode] = React.useState('')

    useEffect(() => {
        let draggableElements = document.getElementById('external-events');

        new Draggable(draggableElements, {
            itemSelector: '.external-event',
            eventData: function(eventEl) {
                return {
                    title: eventEl.innerText
                };
            }
        })
    }, [])

    const handleEventClick = (clickInfo) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    const handleEvents = (events) => {
        setCurrentEvents(events)
    }

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible)
    }

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    const renderEventContent = (eventInfo) => {
        let logo
        switch (eventInfo.event.title) {
            case "Python":
                logo = <Image src={pythonLogo} width={20}/>
                break
            case "Golang":
                logo = <Image src={golangLogo} width={20}/>
                break
            case "Rust":
                logo = <Image src={rustLogo} width={20}/>
                break
            default:
                break
        }

        return (
            <>
                <div>
                    <b>{eventInfo.timeText}</b>
                </div>
                <Box direction="row">
                    {logo}
                    <b>Test {eventInfo.event.title}</b>
                </Box>
                <div>
                    Difficulté : <b>moyenne</b><br></br>
                    Sujet : <b>mystère...</b>
                </div>
            </>
        )
    }

    return (
        <Box>
            <Section>
                <Nav />
                <Box align="center" pad={{top: "large", bottom: "large"}}>
                    <Heading textAlign="center" margin="none">
                        Composez le planning parfait !
                    </Heading>
                </Box>
            </Section>
            <Box align="center" direction="row" pad={{right: "large", left: "large"}}>
                <Box align="center" direction="column" background="brand" round="small" margin={{right: "medium"}}>
                    <Box pad="medium" direction="column" align="center" border={{"color": "white", "size": "medium","style": "dashed","side": "bottom"}}>
                        <Text size="large" weight="bold">1) Glissez et déposez</Text>
                        <Text>les interviews sur ce beau calendrier</Text>
                    </Box>
                    <Box direction="column" align="center" id="external-events">
                        <Box pad={{"top": "small"}} direction="column" align="center">
                            <DraggableButton className="external-event" icon={<Image src={pythonLogo} width={30}/>} primary label="Python" />
                        </Box>
                        <Box pad={{"top": "small"}} direction="column" align="center">
                            <DraggableButton className="external-event" icon={<Image src={golangLogo} width={30}/>} primary label="Golang" />
                        </Box>
                        <Box pad={{"top": "small", "bottom": "small"}} direction="column" align="center">
                            <DraggableButton className="external-event" icon={<Image src={rustLogo} width={30}/>} primary label="Rust" />
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
                <Box flex={true} height="large">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'timeGridWeek,timeGridDay'
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
                        droppable={true}
                        drop={(info) => (
                            console.log(info)
                        )}
                        editable={true}
                        eventColor={'#7D4CDB'}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={weekendsVisible}
                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        select={handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={handleEventClick}
                        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                    />
                </Box>
            </Box>
        </Box>
    )
}