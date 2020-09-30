import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner'
import {
  Box,
  Button,
  Paragraph,
  Heading,
  Anchor
} from 'grommet';

import Header from '../Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { config } from '../../utils/config'

const PaymentCancelComponent = ({verifyIdentity, identityVerified}) => {
    const { ROOT_URL } = config

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const mail = query.get('mail')
        const token = query.get('token')
        setTimeout(() => {
          verifyIdentity({mail, token}) // call saga to verify the identity and to fetch the stripePubKey. If both actions are ok, then identityVerified is true, else it's false.
        }, 1000);
    }, []) // call this call back only after the first render

    let portal = []
    if (identityVerified) {
        //the call to saga has been made but its false
        portal.push(
            <Box full={true}>
            <Box align="center" pad={'xlarge'} background={"status-warning"} full={true} height="xlarge">
                <Box align={"center"}>
                    <Heading textAlign={"center"} margin="none" color="white">
                        Paiement annulé !
                    </Heading>
                    <Paragraph size="xxlarge" textAlign={"center"} color="white">
                        En raison d'un problème avec votre banque, le paiement n'a pas pu être réalisé.
                    </Paragraph>
                </Box>
                <Box align="center" pad={'xlarge'}>
                    <FontAwesomeIcon icon={faTimesCircle} size="8x" color="white"/>
                </Box>
                <Box align={"center"} pad={'medium'}>
                    <Button href={ROOT_URL} primary label="Retour à l'accueil" />
                </Box>
            </Box>
            </Box>
        )
    } else {
        if (identityVerified == undefined) {
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
                        label="Erreur lors de l'identification !"
                        summary="Veuillez contacter le support à l'adresse : contact@1interviewparjour.com"
                        />
                        <Button href={ROOT_URL} primary label="Retour à l'accueil" />
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

export default PaymentCancelComponent