import React from 'react';
import { Box, Diagram, Stack } from 'grommet';
import Tile from './Tile';

export default () => (
    <Tile
      name="3. Trouvez la solution"
      summary={
        <span>
          Nous envoyons l'énoncé détaillé entièrement avec des exemples concrets (voir les exemples ci-dessous)
        </span>
      }
      gap="medium"
    >
      <Stack guidingChild={1}>
        <Diagram
          connections={
            [
              {
                fromTarget: 'root',
                toTarget: 'left-1',
                thickness: 'xsmall',
                color: 'status-ok',
              },
              {
                fromTarget: 'root',
                toTarget: 'right-1',
                thickness: 'xsmall',
                color: 'light-4',
              },
              {
                fromTarget: 'left-1',
                toTarget: 'left-2',
                thickness: 'xsmall',
                color: 'status-ok',
              },
              {
                fromTarget: 'left-1',
                toTarget: 'right-2',
                thickness: 'xsmall',
                color: 'light-4',
              },
              {
                fromTarget: 'left-2',
                toTarget: 'right-3',
                thickness: 'xsmall',
                color: 'status-ok',
              },
              {
                fromTarget: 'right-1',
                toTarget: 'right-5',
                thickness: 'xsmall',
                color: 'light-4',
              }
            ]
          }
        />
        <Box>
          <Box direction="row">
            <Box id="1" margin="small" pad="medium" basis="xsmall" background="accent-1" background={{"opacity": "weak"}}/>
            <Box id="2" margin="small" pad="medium" basis="xsmall" background="status-ok" background={{"opacity": "weak"}}/>
            <Box id="root" margin="small" pad="medium" basis="xsmall" background="accent-1" round={"large"}/>
            <Box id="4" margin="small" pad="medium" basis="xsmall" background="light-4" background={{"opacity": "weak"}}/>
            <Box id="5" margin="small" pad="medium" basis="xsmall" background="light-4" background={{"opacity": "weak"}}/>
          </Box>
          <Box direction="row">
            <Box id="6" margin="small" pad="medium" background="light-4" background={{"opacity": "weak"}}/>
            <Box id="left-1" margin="small" pad="medium" background="status-ok" round={"large"}/>
            <Box id="8" margin="small" pad="medium" background="status-ok" background={{"opacity": "weak"}}/>
            <Box id="right-1" margin="small" pad="medium" background="light-4" round={"large"}/>
            <Box id="10" margin="small" pad="medium" background="light-4" background={{"opacity": "weak"}}/>
          </Box>
          <Box direction="row">
            <Box id="left-2" margin="small" pad="medium" background="status-ok" round={"large"}/>
            <Box id="12" margin="small" pad="medium" background="light-4" background={{"opacity": "weak"}}/>
            <Box id="right-2" margin="small" pad="medium" background="light-4" round={"large"}/>
            <Box id="14" margin="small" pad="medium" background="status-ok" background={{"opacity": "weak"}}/>
            <Box id="right-5" margin="small" pad="medium" background="light-4" round={"large"}/>
          </Box>
          <Box direction="row">
            <Box id="16" margin="small" pad="medium" background="light-4" background={{"opacity": "weak"}}/>
            <Box id="right-3" margin="small" pad="medium" background="accent-1" round={"large"}/>
            <Box id="18" margin="small" pad="medium" background="status-ok" background={{"opacity": "weak"}}/>
            <Box id="19" margin="small" pad="medium" background="status-ok" background={{"opacity": "weak"}}/>
            <Box id="20" margin="small" pad="medium" background="light-4" background={{"opacity": "weak"}}/>
          </Box>
        </Box>
      </Stack>
 </Tile>
)

