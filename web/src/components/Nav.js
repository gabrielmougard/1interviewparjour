import React from 'react';
import { Box, Text, ResponsiveContext } from 'grommet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import RoutedAnchor from './RoutedAnchor';


export default () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction="row"
      justify="between"
      align="center"
      width="xlarge"
      alignSelf="center"
      gap="medium"
    >
      <RoutedAnchor
        path="/"
        icon={<FontAwesomeIcon icon={faProjectDiagram} size="lg" />}
        label={size !== 'small' && <Text size="xlarge">1interviewparjour</Text>}
      />
      
    </Box>
  );
};
