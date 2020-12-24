import React from 'react';
import { Box, Text, Nav, Menu, Anchor, Button } from 'grommet';
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import RoutedAnchor from './RoutedAnchor';


export default () => {

  const isPhone = useMediaQuery({
    query: '(max-width: 479px)'
  })

  let navbar
  if (isPhone) {
    navbar =
    <Menu
      label={<Anchor label={<Text size="xlarge">Menu</Text>} />}
      items={[
        { label: <RoutedAnchor path="/introduction" label={<Text size="large">Introduction</Text>} /> },
        { label: <RoutedAnchor path="/method" label={<Text size="large">Méthode</Text>} /> },
        { label: <RoutedAnchor path="/example" label={<Text size="large">Exemple</Text>} /> },
        { label: <RoutedAnchor path="/pro" label={<Text size="large">Pro</Text>} /> },
      ]}
    />
  } else {
    navbar =
    <Nav direction="row" pad="medium" responsive={true}>
      <RoutedAnchor path="/introduction" label={<Button primary label="Introduction" />} />
      <RoutedAnchor path="/method" label={<Button primary label="Méthode" />} />
      <RoutedAnchor path="/example" label={<Button primary label="Exemple" />} />
      <RoutedAnchor path="/pro" label={<Button primary label="Pro" />} />
    </Nav>
  }
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
        label={!isPhone && <Text size="xlarge">1interviewparjour</Text>}
      />
      {navbar}
    </Box>
  );
};
