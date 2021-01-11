import React, { useEffect } from 'react';
import { Anchor, Box, Image, Paragraph, Heading, Text } from 'grommet';
import { useMediaQuery } from 'react-responsive'
import Nav from '../../components/Nav';
import Footer from '../Footer';
import Section from './Section';
import RoutedAnchor from '../RoutedAnchor'
import today_problem_picture from "../../img/before_1interviewparjour.gif"
import today_problem_solution from "../../img/after_1interviewparjour.gif"


function IntroductionComponent({fetchSupportedLanguages, supportedLanguages, finalizeSignup, signupCompleted, closeFromInside, closedFromInside}) {
  const isPhone = useMediaQuery({
    query: '(max-width: 479px)'
  })

  useEffect(() => {
    fetch("/api/v1/tracking/landing_page/introduction")
    .then((result) => {
    })
  }, [])

  return (
    <Box>
        <Section background="brand">
          <Nav />

          <Box align={"center"} pad={{"top": "large", "bottom": "large"}}>
              <Heading size={isPhone ? "medium": "large"} margin="none" textAlign="center">
              1interviewparjour vous apprend comment réussir toutes vos interviews techniques !
              </Heading>
          </Box>

          <Box align="center" justify="center">
            <Paragraph size="xlarge">
                Soyons sérieux deux minutes : des experts en algorithmes avec des titres prestigieux,
                qui vous expliquent “comment être embauché dans une <Anchor>FAMANGULTAD </Anchor>
                (Facebook, Amazon, Microsoft, Apple, Netflix, Google, Uber, Lyft, Two Sigma, AirBnb, Dropbox) en deux semaines”
                et “gagner votre indépendance financière”, il commence à y en avoir beacoup.
            </Paragraph>
            <Paragraph size="xlarge">
                <Text size="xlarge" weight="bold">
                    Mais avez vous déjà remarqué que si vous apprenez ce contenu condensé,
                    vous arrivez moins préparé qu'avant avoir suivi la formation ?
                </Text>
            </Paragraph>
            <Paragraph size="xlarge">C’est normal. </Paragraph>
            <Paragraph size="xlarge">
                La raison, c’est que la majorité des formations sont très superficielles
                ou trop rapides pour que nos cerveaux retiennent durablement les connaissances.
                Par conséquent, tout se mélange et il n'est pas rare d'être complètement
                paralysé le jour J... J'ai vécu ces moments et croyez moi, ils ne sont pas agréables.
            </Paragraph>
            <Image width={isPhone ? 300 : 500} src={today_problem_picture} />
            <Paragraph size="xlarge">Par exemple :</Paragraph>
            <Paragraph size="xlarge">
                <Text size="xlarge" weight="bold"> “20 exercices pour tout savoir sur les structures de données.</Text>
                <br />
                <br />
                <Text size="xlarge" weight="bold"> “Devenez software engineer en 2 semaines !”</Text>
                <br />
                <br />
                <Text size="xlarge" weight="bold"> “Comment j'ai réussi à rentrer chez Facebook en travaillant juste 1h par jour.”</Text>
            </Paragraph>
            <Paragraph size="xlarge">
                En vérité, toutes ces petites tactiques sont cool - et parfois elles sont même utiles ! - mais il faut arrêter de se voiler la face :
            </Paragraph>
            <Paragraph size="xlarge">
                Comme dirait les Casseurs Flowters : “si c’était aussi facile, tout le monde le ferait”.
            </Paragraph>
            <Paragraph size="xlarge">Ils ont raison.</Paragraph>
            <Paragraph size="xlarge">
                Si vous voulez avoir un résultat <Text size="xlarge" weight="bold">rare </Text>
                (gagner votre vie en créant des systèmes informatiques qui changent nos quotidiens),
                vous devez développer des compétences rares et précieuses.
            </Paragraph>
            <Paragraph size="xlarge">
                Ces compétences profondes, prennent du temps avant d'être complètement
                intégrées dans votre future ADN d'ingénieur. Elles sont néanmoins à votre porté.
            </Paragraph>
            <Paragraph size="xlarge">Par exemple : </Paragraph>

            <Paragraph size="xlarge">
                <Text size="xlarge" weight="bold">Implémenter votre propre système de déploiement de code hautement disponible dans 10 régions du monde.</Text>
                <br />
                <br />
                <Text size="xlarge" weight="bold">Développer une queue asynchrone permettant d'identifier le nom d'un objet dans un flux vidéo.</Text>
                <br />
                <br />
                <Text size="xlarge" weight="bold">
                    Ecrire votre propre <RoutedAnchor path="https://analytics.google.com/" label={"Google Analytic"} /> pour
                    étudier le traffic de votre plateforme (comme celui actuellement en production sur
                    1interviewparjour.com par exemple)
                </Text>
                <br />
                <br />
            </Paragraph>

            <Paragraph size="xlarge">Ces compétences sont rares - et c’est une bonne chose. </Paragraph>

            <Paragraph size="xlarge">Ça veut dire que l'immense majorité de vos concurrents ne vont pas faire l'effort de les développer.</Paragraph>

            <Paragraph size="xlarge">
                Encore mieux : notre monde ultra technologique aura toujours besoin de ces compétences.
                Il n'existe pas de "framework" général pour créer la prochaine entreprise technologique
                révolutionnaire ou bien réussir un exercice original sur les isomorphismes de graphes.
                Il est possible qu'un jour la <RoutedAnchor path="https://en.wikipedia.org/wiki/Technological_singularity" label={"Singularité"} /> le
                permette, mais nous en sommes encore loin...
            </Paragraph>

            <Paragraph size="xlarge">
                Bref, contrairement à toutes ces formations superficielles qui porteront leurs
                fruits quelques mois jusqu'au moment où une nouvelle technologie émergera à nouveau, la science servant de
                socle à l'ingénierie informatique ne change pas.
            </Paragraph>

            <Paragraph size="xlarge">
                C’est une très bonne nouvelle - car si vous voulez exceller dans la programmation, c’est extrêmement dangereux
                de tout construire sur des "bootcodes" et autres "tutos" déjà prémâchés qui ne renforcent pas vos connaissances profondes...
            </Paragraph>

            <Paragraph size="xlarge">
                Imaginez qu'une partie critique de votre code de production soit basé là-dessus et devient alors dysfonctionnel.
                Tout pourrait s’écrouler du jour au lendemain !
            </Paragraph>

            <Paragraph size="xlarge">
                Voilà pourquoi nous vous proposons de prendre le temps d'aller travailler efficacement
                toutes ces notions qui vous rendrons plus productif, plus créatif et vous permettant de fournir du code se rapprochant
                des standards dans l'industrie. Nous basons notre méthode sur l'optimisation de planning et la répétition des exercices
                dans le temps pour que vous soyez prêt le jour J de votre interview.
            </Paragraph>

            <Image width={isPhone ? 300 : 500} src={today_problem_solution} />

            <Paragraph size="xlarge">
                Il y a donc deux points importants à retenir :
            </Paragraph>
            <Paragraph>
                <Text size="xlarge" weight="bold">
                    1) Développez ces compétences rares et parfois étrangement précises. Elles sont rares donc elles vous donnent un avantage
                    sur vos concurrents lors des interviews. Nous vous aiderons à les développer sur 1interviewparjour.com
                </Text>
                <br />
                <br />
                <Text size="xlarge" weight="bold">
                    2) Ces compétences ne changent pas et seront toujours en forte demande car elles dénotent un grand intérêt
                    pour la science de l'informatique. Ainsi, peut importe à quelle vitesse les technologies évoluent autour de nous,
                    vous pourez vous adapter rapidement et avoir toujours une avance sur les autres n'ayant pas intégré ces concepts.
                </Text>
            </Paragraph>
          </Box>
        </Section>

        <Footer
            fetchSupportedLanguages={fetchSupportedLanguages}
            supportedLanguages={supportedLanguages}
            finalizeSignup={finalizeSignup}
            signupCompleted={signupCompleted}
            closeFromInside={closeFromInside}
            closedFromInside={closedFromInside}
        />
    </Box>
  );
}

export default IntroductionComponent
