import React from 'react';
import { Box, Diagram, Stack } from 'grommet';
import styled from 'styled-components'


const HeroContainer = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0 auto;
`

export default () => (
    <HeroContainer>
        <Stack guidingChild={1}>
            <Diagram
                connections={
                    [
                        {
                            fromTarget: '1',
                            toTarget: '2',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '2',
                            toTarget: '3',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '3',
                            toTarget: '4',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '6',
                            toTarget: '7',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '10',
                            toTarget: '11',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '11',
                            toTarget: '12',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '15',
                            toTarget: '16',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '15',
                            toTarget: '8',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '15',
                            toTarget: '6',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '10',
                            toTarget: '2',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '13',
                            toTarget: '5',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '17',
                            toTarget: '18',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '18',
                            toTarget: '9',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '18',
                            toTarget: '10',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '19',
                            toTarget: '10',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '20',
                            toTarget: '12',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '21',
                            toTarget: '13',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '21',
                            toTarget: '14',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '21',
                            toTarget: '22',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '22',
                            toTarget: '23',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '23',
                            toTarget: '15',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '24',
                            toTarget: '16',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '25',
                            toTarget: '17',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '25',
                            toTarget: '26',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '27',
                            toTarget: '20',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '27',
                            toTarget: '28',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '28',
                            toTarget: '21',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                        {
                            fromTarget: '29',
                            toTarget: '21',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '29',
                            toTarget: '30',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '30',
                            toTarget: '31',
                            thickness: 'xsmall',
                            color: 'light-4',
                        },
                        {
                            fromTarget: '32',
                            toTarget: '24',
                            thickness: 'xsmall',
                            color: 'status-ok',
                        },
                    ]
                }
            />
            <Box>
                <Box direction="row">
                    <Box id="1" margin="small" pad="medium" background="accent-1" />
                    <Box id="2" margin="small" pad="medium" background="status-ok" />
                    <Box id="3" margin="small" pad="medium" background="light-4" />
                    <Box id="4" margin="small" pad="medium" background="light-4" />
                    <Box id="5" margin="small" pad="medium" background="light-4" />
                    <Box id="6" margin="small" pad="medium" background="light-4" />
                    <Box id="7" margin="small" pad="medium" background="light-4" />
                    <Box id="8" margin="small" pad="medium" background="light-4" />
                </Box>
                <Box direction="row">
                    <Box id="9" margin="small" pad="medium" background="light-4" />
                    <Box id="10" margin="small" pad="medium" background="status-ok" />
                    <Box id="11" margin="small" pad="medium" background="status-ok" />
                    <Box id="12" margin="small" pad="medium" background="status-ok" />
                    <Box id="13" margin="small" pad="medium" background="light-4" />
                    <Box id="14" margin="small" pad="medium" background="light-4" />
                    <Box id="15" margin="small" pad="medium" background="status-ok" />
                    <Box id="16" margin="small" pad="medium" background="status-ok" />
                </Box>
                <Box direction="row">
                    <Box id="17" margin="small" pad="medium" background="light-4" />
                    <Box id="18" margin="small" pad="medium" background="light-4" />
                    <Box id="19" margin="small" pad="medium" background="light-4" />
                    <Box id="20" margin="small" pad="medium" background="status-ok" />
                    <Box id="21" margin="small" pad="medium" background="status-ok" />
                    <Box id="22" margin="small" pad="medium" background="status-ok" />
                    <Box id="23" margin="small" pad="medium" background="status-ok" />
                    <Box id="24" margin="small" pad="medium" background="status-ok" />
                </Box>
                <Box direction="row">
                    <Box id="25" margin="small" pad="medium" background="light-4" />
                    <Box id="26" margin="small" pad="medium" background="light-4" />
                    <Box id="27" margin="small" pad="medium" background="status-ok" />
                    <Box id="28" margin="small" pad="medium" background="status-ok" />
                    <Box id="29" margin="small" pad="medium" background="light-4" />
                    <Box id="30" margin="small" pad="medium" background="light-4" />
                    <Box id="31" margin="small" pad="medium" background="light-4" />
                    <Box id="32" margin="small" pad="medium" background="accent-1" />
                </Box>
            </Box>
        </Stack>
    </HeroContainer>
);