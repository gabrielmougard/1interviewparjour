import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import Loader from 'react-loader-spinner'
import {
  Anchor,
  Box,
  Image,
  Paragraph,
  Button
} from 'grommet';

import Header from '../Header';
import Section from '../Home/Section';
import Nav from '../Nav';

const buyProduct = (problem_data) => {
  const stripe = problem_data.stripeClient
  fetch("/api/v1/stripe/create-checkout-session?problem_id="+problem_data.problem_id+"&subscription_type="+problem_data.subscriptionType+"&mail="+problem_data.mail+"&token="+problem_data.token)
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
  const isPhone = useMediaQuery({
    query: '(max-width: 479px)'
  })
  const imgWidth = isPhone ? 300 : 482;
  return (
    <Box align="center" size="small" pad={{ horizontal: 'large', vertical: 'medium' }}>
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

const PaymentPortalComponent = ({problemData, getStripePubKey, stripePubKey}) => {

  const [stripeClient, setStripeClient] = React.useState({})

  useEffect(() => {
    getStripePubKey()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (stripePubKey !== "") {
      /* global Stripe */
      const stripe = Stripe(stripePubKey)
      setStripeClient(stripe)
    }
  }, [stripePubKey])

  let unitSubscription
  let monthlySubscription

  if (stripePubKey === "") {
    unitSubscription =
      <Box align="center" size="small" pad={{ horizontal: 'large' }}>
        <Loader
          type="Grid"
          color="#7D4CDB"
          height={100}
          width={100}
        />
      </Box>

    monthlySubscription =
      <Box align="center" size="small" pad={{ horizontal: 'large' }}>
        <Loader
          type="Grid"
          color="#7D4CDB"
          height={100}
          width={100}
        />
      </Box>
  } else {
    unitSubscription =
      <Subscription
        desc={
          <span>Recevez la solution du problème <Anchor href="https://1interviewparjour.fr" a11yTitle="1interviewparjour">{problemData.problem_title} </Anchor>
          avec les explications détaillées ! C'est moins cher qu'un café !
          </span>
        }
        price="0,70€"
        src="https://1interviewparjour.s3.eu-central-1.amazonaws.com/landing+pages/payment/unit-solution-logo.png"
        problem={problemData}
        subscriptionType={"unit"}
        stripeClient={stripeClient}
      />

    monthlySubscription =
      <Subscription
        desc="Incroyable ! Vous recevez toutes les solutions des problèmes avec les explications détaillées ! C'est notre expérience ultime !"
        price="6,99€/mois"
        src="https://1interviewparjour.s3.eu-central-1.amazonaws.com/landing+pages/payment/monthly-solution-logo.png"
        problem={problemData}
        subscriptionType={"monthly"}
        stripeClient={stripeClient}
      />
  }

  return (
    <Box>
      <Section>
        <Nav />
      </Section>
      <Section pad={{ top: 'medium', horizontal: 'medium' }}>
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
          {monthlySubscription}
          {unitSubscription}
        </Box>
      </Section>
    </Box>
  );
};

export default PaymentPortalComponent