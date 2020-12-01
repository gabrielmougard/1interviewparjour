import React from 'react';

import {
  Box,
  Button,
  Paragraph,
  Heading
} from 'grommet';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { config } from '../../utils/config'

const PaymentCancelComponent = () => {
    const { ROOT_URL } = config

    return (
        <Box full={true}>
            <Box align="center" pad={'xlarge'} background={"status-warning"} full={true} height="xlarge">
                <Box align={"center"}>
                    <Heading textAlign={"center"} margin="none" color="white">
                        Paiement annulé !
                    </Heading>
                    <Paragraph size="xxlarge" textAlign={"center"} color="white">
                        Le paiement n'a pas pu être réalisé. Votre compte ne sera pas débité. À la prochaine !
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
    );
};

export default PaymentCancelComponent