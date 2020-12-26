import React from 'react';
import { Box, Heading } from 'grommet';
import Nav from '../../../components/Nav';
import Section from '../../Home/Section';

export function PlanningComponent() {

    return (
        <Box>
            <Section>
                <Nav />
                <Box align="center">
                    <Heading textAlign="center" margin="none">
                        Dans une logique d'optimisation de l'expérience utilisateur,
                        nous vous demandons d'utiliser un ordinateur ou une tablette pour accéder au planning !
                    </Heading>
                </Box>
            </Section>
        </Box>
    )
}