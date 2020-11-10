import React, { useEffect } from 'react';
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
                        Composez le planning parfait !
                    </Heading>
                </Box>
            </Section>
        </Box>
    )
}