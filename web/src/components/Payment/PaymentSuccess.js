import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications'

import {
  Box,
  Button,
  Paragraph,
  Heading,
  Anchor
} from 'grommet';

import { Checkmark } from 'react-checkmark'

import { config } from '../../utils/config'

const PaymentSuccessComponent = ({ sendProduct, isProductSent}) => {
    const { addToast } = useToasts()
    const { ROOT_URL } = config

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const mail = query.get('mail')
        const token = query.get('token')
        const session_id = query.get("session_id")
        const problem_id = query.get("problem_id")
        // send mail and eventually turns user to pro member
        sendProduct({mail, token, session_id, problem_id})
        // eslint-disable-next-line
    }, []) // call this call back only after the first render

    useEffect(() => {
        if (isProductSent) {
            //once the product is sent, notify user.
            addToast('Vous allez bientôt recevoir un mail ;)', { appearance: 'success' })
        }
        // eslint-disable-next-line
    }, [isProductSent])

    return (
        <Box full={true}>
            <Box align="center" pad={'xlarge'} background={"status-ok"} full={true} height="xlarge">
                <Box align={"center"}>
                    <Heading textAlign={"center"} margin="none" color="white">
                        Paiement validé !
                    </Heading>
                    <Paragraph size="xxlarge" textAlign={"center"} color="white">
                        Vous recevrez le(s) énoncé(s) et la/les solutions dans les secondes qui suivent à l'adresse
                        <Box align="center" pad={{"top": "medium"}}>
                            <Anchor label={" " + new URLSearchParams(window.location.search).get('mail')} />
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
    );
};

export default PaymentSuccessComponent