import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import {
  Box,
  Button,
  Paragraph,
  Heading,
  Anchor
} from 'grommet';

import Header from '../Header';
import { Checkmark } from 'react-checkmark'

import { config } from '../../utils/config'

const PaymentSuccessComponent = ({verifyIdentity, identityVerified, sendProduct, isProductSent}) => {
    const { addToast } = useToasts()
    const [mailstate, setMail] = React.useState("")
    const { ROOT_URL } = config

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const mail = query.get('mail')
        if (mailstate == "") {
            setMail(mail)
        }
        const token = query.get('token')
        setTimeout(() => {
          verifyIdentity({mail, token}) // call saga to verify the identity and to fetch the stripePubKey. If both actions are ok, then identityVerified is true, else it's false.
        }, 1000);
    }, []) // call this call back only after the first render

    useEffect(() => {
        // if its verified load the page and raise a success toast in upper right corner
        if (identityVerified) {
            // send mail and eventually turns user to pro member
            const query = new URLSearchParams(window.location.search)
            const mail = query.get('mail')
            const token = query.get('token')
            const session_id = query.get("session_id")
            const problem_id = query.get("problem_id")
            sendProduct({mail, token, session_id, problem_id})
        }
    }, [identityVerified])

    useEffect(() => {
        if (isProductSent) {
            addToast('Vous allez bientôt recevoir un mail ;)', { appearance: 'success' })
        }
    }, [isProductSent])

    let portal = []
    if (identityVerified) {
        //the call to saga has been made but its false
        portal.push(
            <Box full={true}>
            <Box align="center" pad={'xlarge'} background={"status-ok"} full={true} height="xlarge">
                <Box align={"center"}>
                    <Heading textAlign={"center"} margin="none" color="white">
                        Paiement validé !
                    </Heading>
                    <Paragraph size="xxlarge" textAlign={"center"} color="white">
                        Vous recevrez le(s) énoncé(s) et la/les solutions dans les secondes qui suivent à l'adresse
                        <Box align="center" pad={{"top": "medium"}}>
                            <Anchor label={" "+mailstate} />
                        </Box>
                    </Paragraph>
                </Box>
                <Box align="center" pad={'xlarge'}>
                    <Checkmark size='144' color='#7D4CDB' />
                </Box>
                <Box align="center" pad={'medium'}>
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

export default PaymentSuccessComponent