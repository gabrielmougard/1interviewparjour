import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet';
import { useHistory } from "react-router-dom";

const RoutedAnchor = ({ icon, label, path }) => {
  const  history = useHistory();
  return (
    <Anchor
      href={path}
      icon={icon}
      label={label}
      onClick={event => {
        // eslint-disable-next-line
        if (path.match(/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/i)) {
          window.open(path, "_blank")
          event.preventDefault();
        } else {
          // it's a local path
          event.preventDefault();
          history.push(path);
        }
      }}
    />
  );
};

RoutedAnchor.propTypes = {
  ...Anchor.propTypes,
  path: PropTypes.string.isRequired,
};

export default RoutedAnchor;