import React, { useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import {
  Box,
  Button,
  Text
} from 'grommet';

import Header from '../Header'
import RoutedAnchor from '../RoutedAnchor'

const MailAuthComponent = ({childComponent, verifyIdentity, identityVerified, problemData}) => {
  const { addToast } = useToasts()

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const mail = query.get('mail')
    const token = query.get('token')
    setTimeout(() => {
      verifyIdentity({mail, token}) // call saga to verify the identity and to fetch the stripePubKey. If both actions are ok, then identityVerified is true, else it's false.
    }, 1000);
    // eslint-disable-next-line
  }, []) // call this call back only after the first render

  useEffect(() => {
    // if its verified load the page and raise a success toast in upper right corner
    if (identityVerified) {
      addToast('Identification réussi !', { autoDismiss: true, appearance: 'success' })
    }
    // eslint-disable-next-line
  }, [identityVerified])

  let portal = []
  if (identityVerified) {
    portal.push(childComponent)
  } else {
    if (identityVerified === undefined) {
      portal.push(
        <Box full={true}>
          <Box align="center" pad={'xlarge'} background="brand" full={true} height="xlarge">
            <Header
              label="Vérification de l'identité..."
              summary="Celà ne devrait durer que 0.00000231s"
            />
            <Loader
              type="Grid"
              color="#FFFFFF"
              height={100}
              width={100}
            />
          </Box>
        </Box>
      )
    } else {
      //the call to saga has been made but its false
      portal.push(
        <Box full={true}>
          <Box align="center" pad={'xlarge'} background={"status-error"} full={true} height="xlarge">
            <Header
              label="Erreur lors de l'identification"
              summary={<Text alignSelf="center" size="large">Veuillez contacter le support à contact@1interviewparjour.com</Text>}
            />
            <Box pad={{top: "large"}}>
              <RoutedAnchor path="/" label={<Button primary label="Retour à l'accueil" />} />
            </Box>
          </Box>
        </Box>
      )
    }
  }

  return (
    <>
      {portal}
    </>
  );
};

export default MailAuthComponent