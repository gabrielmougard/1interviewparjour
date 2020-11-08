import React, { useContext, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import {
  Anchor,
  Box,
  Image,
  Text,
  Paragraph,
  ResponsiveContext,
  Button
} from 'grommet';

import Header from '../Header';
import Section from '../Home/Section';
import Nav from '../Nav';
import { config } from '../../utils/config'

const buyProduct = (problem_data) => {
  const stripe = problem_data.stripeClient
  const { API_URL } = config
  fetch(API_URL + "/stripe/create-checkout-session?problem_id="+problem_data.problem_id+"&subscription_type="+problem_data.subscriptionType+"&mail="+problem_data.mail+"&token="+problem_data.token)
  .then((result) => { return result.json(); })
  .then((data) => {
    // Redirect to Stripe Checkout
    return stripe.redirectToCheckout({sessionId: data.sessionId})
  })
  .then((res) => {
      console.log(res);
  });
}

const Subscription = ({ desc, price, src, problem, subscriptionType, stripeClient }) => {
  const size = useContext(ResponsiveContext);
  const imgWidth = size === 'medium' ? 365 : 482;
  return (
    <Box align="center" size="small" pad={{ horizontal: 'large' }}>
      <Image width={imgWidth} src={src} a11yTitle={price} />
      <Header
        label={price}
        size={"medium"}
      />
      <Paragraph textAlign="center" size="xlarge" alignSelf="center">
        {desc}
      </Paragraph>
      <Button
        primary
        label="Acheter"
        onClick={() => buyProduct(
          {
            problem_id : problem.problem_id,
            subscriptionType: subscriptionType,
            stripeClient: stripeClient,
            mail: problem.mail,
            token: problem.token
          }
        )}
      />
      <Box flex />
    </Box>
  );
};

const PaymentPortalComponent = ({verifyIdentity, identityVerified, problemData, stripePubKey}) => {
  const { addToast } = useToasts()
  const [stripeClient, setStripeClient] = React.useState({})

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const mail = query.get('mail')
    const token = query.get('token')
    setTimeout(() => {
      verifyIdentity({mail, token}) // call saga to verify the identity and to fetch the stripePubKey. If both actions are ok, then identityVerified is true, else it's false.
    }, 1000);
  }, []) // call this call back only after the first render

  useEffect(() => {
    // if its verified load the page and raise a success toast in upper right corner
    if (identityVerified) {
      addToast('Identification réussi pour le problème "'+problemData.problem_title+'"', { appearance: 'success' })
    }
  }, [identityVerified])

  useEffect(() => {
    if (stripePubKey != "") {
      /* global Stripe */
      const stripe = Stripe(stripePubKey)
      setStripeClient(stripe)
    }
  }, [stripePubKey])

  let portal = []
  if (identityVerified) {
    portal.push(
      <Box>
        <Section>
          <Nav />
        </Section>
        <Section pad={{ top: 'medium' }}>
          <Header
            label="Choisissez votre offre !"
            summary="Passez au niveau supérieur en analysant nos solutions optimisées aux petits oignon 😉"
          />
          <Box
            direction="row-responsive"
            justify="center"
            gap="large"
            margin={{ horizontal: 'large'}}
          >
            <Subscription
              desc="Incroyable ! Vous recevez toutes les solutions des problèmes avec les explications détaillées ! C'est notre expérience ultime !"
              price="11,99€/mois"
              link="https://designer.grommet.io/"
              src="https://1interviewparjour.s3.eu-central-1.amazonaws.com/landing+pages/payment/monthly-solution-logo.png"
              problem={problemData}
              subscriptionType={"monthly"}
              stripeClient={stripeClient}
            />
            <Subscription
              desc={
                <span>Recevez la solution du problème <Anchor href="https://1interviewparjour.fr" a11yTitle="1interviewparjour">{problemData.problem_title} </Anchor>
                avec les explications détaillées ! C'est moins cher qu'un café !
                </span>
              }
              price="0,80€"
              link="https://theme-designer.grommet.io/"
              src="https://1interviewparjour.s3.eu-central-1.amazonaws.com/landing+pages/payment/unit-solution-logo.png"
              problem={problemData}
              subscriptionType={"unit"}
              stripeClient={stripeClient}
            />
          </Box>
      </Section>
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
              summary="<message d'erreur>"
            />
            <Button primary label="Retour à l'accueil" />
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

export default PaymentPortalComponent