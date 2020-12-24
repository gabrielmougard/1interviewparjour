import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Diagram, Stack } from 'grommet';
import styled from 'styled-components'


const HeroContainer = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0 auto;
`
function Hero({cellPading, linkThickness, pro}) {
    //generate unique Box IDs
    let boxIDsequence = []
    for (let i = 0; i < 32; i++) {
        boxIDsequence.push(uuidv4())
    }

    if (cellPading === undefined) {
        cellPading = 'medium'
    }

    if (linkThickness === undefined) {
        linkThickness = 'xsmall'
    }

    if (pro === undefined) {
        pro = false
    }

    return (
        <HeroContainer>
            <Stack guidingChild={1}>
                <Diagram
                    connections={
                        [
                            {
                                fromTarget: boxIDsequence[0],
                                toTarget: boxIDsequence[1],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[1],
                                toTarget: boxIDsequence[2],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[2],
                                toTarget: boxIDsequence[3],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[5],
                                toTarget: boxIDsequence[6],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[9],
                                toTarget: boxIDsequence[10],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[10],
                                toTarget: boxIDsequence[11],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[14],
                                toTarget: boxIDsequence[15],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[14],
                                toTarget: boxIDsequence[7],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[14],
                                toTarget: boxIDsequence[5],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[9],
                                toTarget: boxIDsequence[1],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[12],
                                toTarget: boxIDsequence[4],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[16],
                                toTarget: boxIDsequence[17],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[17],
                                toTarget: boxIDsequence[8],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[17],
                                toTarget: boxIDsequence[9],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[18],
                                toTarget: boxIDsequence[9],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[19],
                                toTarget: boxIDsequence[11],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[20],
                                toTarget: boxIDsequence[12],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[20],
                                toTarget: boxIDsequence[13],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[20],
                                toTarget: boxIDsequence[21],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[21],
                                toTarget: boxIDsequence[22],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[22],
                                toTarget: boxIDsequence[14],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[23],
                                toTarget: boxIDsequence[15],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[24],
                                toTarget: boxIDsequence[16],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[24],
                                toTarget: boxIDsequence[25],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[26],
                                toTarget: boxIDsequence[19],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[26],
                                toTarget: boxIDsequence[27],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[27],
                                toTarget: boxIDsequence[20],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                            {
                                fromTarget: boxIDsequence[28],
                                toTarget: boxIDsequence[20],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[28],
                                toTarget: boxIDsequence[29],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[29],
                                toTarget: boxIDsequence[30],
                                thickness: linkThickness,
                                color: 'light-4',
                            },
                            {
                                fromTarget: boxIDsequence[31],
                                toTarget: boxIDsequence[23],
                                thickness: linkThickness,
                                color: pro ? 'accent-4' : 'status-ok',
                            },
                        ]
                    }
                />
                <Box>
                    <Box direction="row">
                        <Box id={boxIDsequence[0]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'accent-1'} />
                        <Box id={boxIDsequence[1]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[2]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[3]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[4]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[5]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[6]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[7]} margin="small" pad={cellPading} background="light-4" />
                    </Box>
                    <Box direction="row">
                        <Box id={boxIDsequence[8]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[9]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[10]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[11]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[12]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[13]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[14]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[15]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                    </Box>
                    <Box direction="row">
                        <Box id={boxIDsequence[16]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[17]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[18]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[19]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[20]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[21]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[22]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[23]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                    </Box>
                    <Box direction="row">
                        <Box id={boxIDsequence[24]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[25]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[26]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[27]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'status-ok'} />
                        <Box id={boxIDsequence[28]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[29]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[30]} margin="small" pad={cellPading} background="light-4" />
                        <Box id={boxIDsequence[31]} margin="small" pad={cellPading} background={pro ? 'accent-4' : 'accent-1'} />
                    </Box>
                </Box>
            </Stack>
        </HeroContainer>
    )
}

export default Hero
