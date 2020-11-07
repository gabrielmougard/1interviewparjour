import React from 'react';
import Helmet from 'react-helmet';
import { Box } from 'grommet';
import Header from '../Header';
import Page from '../Page';

export default () => (
  <Page>
     <Box margin={{ bottom: 'large' }} width="xlarge" alignSelf="center">
        <Helmet>
            <title>Protections des données</title>
            <meta name="description" content={"Protection des données"} />
        </Helmet>
      </Box>
      <Box align={"center"}>
        <Header
            align={"center"}
            label={"Protection des données"}
            summary={"Nous nous engageons à ne pas divulger vos données"}
            details={
              "1interviewparjour (la 'société') respecte les préoccupations des utilisateurs de son site web, 1interviewparjour.com, " +
              "et des services qui y sont fournis (le 'site'). La société fournit donc cette déclaration de confidentialité pour expliquer " +
              "quelles informations sont recueillies lors d'une visite sur le site et comment ces informations peuvent être utilisées. " +
              "Votre utilisation des services de la société et de ce site est également régie par celle de Stripe, LLC, une société à " +
              "responsabilité limitée de Californie. Veuillez également consulter les conditions d'utilisation du site web de Stripe® à " +
              "l'adresse https://stripe.com/fr/privacy et la politique de confidentialité qui régissent également l'utilisation de ce site. " +
              "Utilisation des informations : En règle générale, aucune information personnelle identifiable, telle que votre nom, votre adresse ou " +
              "votre adresse électronique, n'est automatiquement collectée lors de votre visite sur le site. Toutefois, certaines informations non " +
              "personnelles sont enregistrées par le fonctionnement normal des serveurs Internet de la société. Des informations telles que le type " +
              "de navigateur utilisé, son système d'exploitation et votre adresse IP sont recueillies afin d'améliorer votre expérience en ligne. " +
              "Les diverses listes de diffusion, téléchargements, offres spéciales, concours, formulaires d'inscription et enquêtes du site peuvent " +
              "vous demander de nous fournir des informations de contact telles que votre nom, votre adresse postale et/ou électronique, " +
              "des informations démographiques telles que votre âge et votre sexe, et des informations sur vos préférences personnelles telles que " +
              "vos logiciels préférés et vos centres d'intérêt. Les informations soumises au moment de la soumission ne seront utilisées par la société " +
              "que dans la mesure où elles sont nécessaires à nos intérêts commerciaux légitimes, y compris, sans limitation, l'amélioration de nos produits, " +
              "de nos services et du contenu du site. La société peut également partager ces informations avec ses partenaires commerciaux et promotionnels " +
              "afin de promouvoir ces intérêts. Les informations personnelles identifiables ne sont jamais vendues ou louées à des tiers. Avec votre permission, " +
              "nous pouvons utiliser vos coordonnées pour vous envoyer des informations sur notre entreprise et nos produits. Vous pouvez toujours choisir de " +
              "ne pas recevoir de futurs envois comme indiqué ci-dessous. La société ne stocke aucune information sur les cartes de crédit qu'elle peut recevoir " +
              "dans le cadre d'une transaction spécifique et/ou d'un accord de facturation. " +
              "La société peut divulguer des informations sur les utilisateurs dans des cas particuliers lorsque nous avons des raisons de croire que la divulgation " +
              "de ces informations est nécessaire pour identifier, contacter ou intenter une action en justice contre une personne qui pourrait causer un préjudice " +
              "ou une interférence (intentionnellement ou non) avec les droits ou les biens de la société, d'autres utilisateurs du site ou toute autre personne qui " +
              "pourrait être lésée par de telles activités. " +
              "La société peut également être tenue de divulguer des informations personnelles en réponse à des demandes légitimes des autorités publiques, " +
              "notamment pour répondre à des exigences de sécurité nationale ou d'application de la loi. " +
              "Enfants âgés de 16 ans et moins : La société reconnaît l'obligation particulière de protéger les informations personnelles identifiables " +
              "obtenues auprès d'enfants âgés de 16 ans et moins. À CE TITRE, SI VOUS AVEZ 16 ANS OU MOINS, LA SOCIÉTÉ VOUS DEMANDE DE NE PAS SOUMETTRE " +
              "D'INFORMATIONS PERSONNELLES SUR LE SITE OU À LA SOCIÉTÉ. Si la société découvre qu'un enfant âgé de 16 ans ou moins s'est inscrit sur le " +
              "site ou nous a fourni des informations personnelles identifiables, nous supprimerons les informations identifiables de cet enfant de nos dossiers. " +
              "Utilisation des cookies : Les cookies sont des éléments d'information qu'un site web transfère sur le disque dur de l'ordinateur d'une personne " +
              "à des fins d'enregistrement. Les cookies facilitent l'utilisation de notre site, notamment en enregistrant vos mots de passe et vos préférences. " +
              "L'utilisation de ces cookies est limitée à notre site et ne transfère aucune information personnelle à une autre partie. La plupart des navigateurs " +
              "sont initialement configurés pour accepter les cookies. Vous pouvez toutefois réinitialiser votre navigateur pour qu'il refuse tous les cookies ou " +
              "qu'il indique quand un cookie est envoyé. Veuillez consulter les informations techniques relatives à votre navigateur pour obtenir des instructions. " +
              "Si vous choisissez de désactiver votre paramétrage des cookies ou de refuser un cookie, certaines parties du site peuvent ne pas fonctionner correctement " +
              "ou peuvent être considérablement plus lentes. " +
              "Malware/Spyware/Virus : Ni la société ni le site n'autorisent sciemment l'utilisation de logiciels malveillants, de logiciels espions, de virus et/ou " +
              "d'autres types de logiciels similaires. " +
              "Liens vers des sites externes : La société n'est pas responsable du contenu ou des pratiques des sites web de tiers qui peuvent être liés au site. " +
              "La société n'est pas non plus responsable des informations que vous pourriez partager avec ces sites web liés. Vous devez vous référer à la politique " +
              "de confidentialité et aux pratiques de chaque site web avant de divulguer toute information. " +
              "Choix/Opt-Out : Le site peut vous offrir la possibilité de choisir de recevoir des communications de notre part au moment où nous vous demandons des " +
              "informations vous concernant. Vous avez toujours la possibilité de retirer votre nom de toute liste de diffusion afin de mettre fin à ces communications " +
              "futures. Afin de garantir le retrait immédiat de toute liste, veuillez suivre les instructions spécifiques figurant dans les communications que vous recevez " +
              "de la société et que vous ne souhaitez plus recevoir. Si vous ne parvenez pas à suivre les instructions spécifiées dans ces communications, veuillez nous envoyer un courriel à " +
              "contact@1interviewparjour.com, en incluant une copie du courriel indésirable joint à la demande, et en indiquant que vous souhaitez être retiré de la liste de diffusion. " +
              "Votre accès et votre contrôle sur vos informations personnelles identifiables : À tout moment, mais seulement une fois par année civile, ou selon " +
              "les exigences de la loi en vigueur, les utilisateurs peuvent contacter la société pour examiner les informations personnelles identifiables que la " +
              "société a recueillies à votre sujet. Si vous découvrez des erreurs, veuillez en informer la société et les informations seront corrigées. " +
              "Pour consulter les informations personnelles identifiables que la société a recueillies à votre sujet, veuillez envoyer un courriel à " +
              "contact@1interviewparjour.com en indiquant l'objet du message : 'Demande de révision des informations personnelles'. Les utilisateurs peuvent également " +
              "demander à tout moment à la société de supprimer un ou plusieurs comptes d'utilisateur ou, si vous n'avez pas créé de compte d'utilisateur, votre adresse électronique " +
              "et toute donnée connexe. Si vous souhaitez supprimer votre (vos) compte(s) d'utilisateur, veuillez nous envoyer un courrier électronique à contact@1interviewparjour.com " +
              "avec la mention 'Supprimer le compte' dans la ligne d'objet. Si vous n'avez pas de compte d'utilisateur et que vous souhaitez supprimer votre adresse " +
              "électronique ou toute autre information personnelle identifiable que vous auriez pu fournir en utilisant le site, les jeux et/ou les services, veuillez " +
              "nous envoyer un courrier électronique à contact@1interviewparjour.com en indiquant 'Supprimer mes informations' dans l'objet du message." +
              "Vous pouvez également choisir de confirmer que la société n'utilise pas vos informations personnelles de certaines manières et/ou de vous " +
              "opposer à certaines utilisations de ces informations personnelles, y compris, sans limitation (i) lorsque vos informations personnelles peuvent être " +
              "divulguées à un tiers non lié à la société et/ou à des parties directement liées à la fourniture de vos services et/ou (ii) lorsque vos informations " +
              "personnelles peuvent être utilisées à une fin qui est matériellement différente de celle(s) pour laquelle (lesquelles) elles ont été initialement " +
              "collectées ou ultérieurement autorisées par vous. Si vous souhaitez limiter vos données personnelles de l'une ou l'autre de ces manières, ou si vous " +
              "avez d'autres questions sur la manière dont la société peut utiliser vos données personnelles, veuillez nous contacter à l'adresse contact@1interviewparjour.com " +
              "avec les mots 'Demande de confidentialité' dans l'objet." +
              "Coordonnées pour les plaintes ou les préoccupations : Si vous avez des plaintes ou des préoccupations concernant la société ou la présente déclaration " +
              "de confidentialité, veuillez contacter par courrier électronique : contact@1interviewparjour.com" +
              "Les informations que vous fournissez à la société par le biais de demandes générales par courrier électronique, telles que votre adresse électronique, " +
              "ne sont utilisées que pour répondre à vos demandes dans le cadre normal de l'activité et ne sont jamais communiquées à des tiers. " +
              "Sécurité/Comment vos informations personnelles identifiables sont protégées : La sécurité de toutes les informations personnellement identifiables " +
              "est extrêmement importante pour nous. Nous avons mis en place des mesures de sécurité techniques, administratives et physiques pour tenter de protéger " +
              "vos informations personnelles identifiables contre tout accès non autorisé et toute utilisation inappropriée. Nous protégeons également vos informations " +
              "personnelles identifiables hors ligne. Seuls les employés qui ont besoin de ces informations pour effectuer un travail spécifique (par exemple, le service clientèle) " +
              "ont accès aux informations personnelles identifiables. Les ordinateurs/serveurs dans lesquels nous stockons les informations personnelles identifiables " +
              "sont conservés dans un environnement sécurisé. Nous examinons en permanence toutes ces mesures et les mettons à jour le cas échéant. Malheureusement, aucune " +
              "transmission de données sur Internet ne peut être garantie sûre à 100 %. Par conséquent, bien que nous nous efforcions de protéger vos informations personnelles, " +
              "la société ne peut pas assurer ou garantir la sécurité de toute information que vous transmettez via Internet. En transmettant de telles informations à la société, " +
              "vous acceptez de le faire à vos propres risques. " +
              "Votre acceptation des présentes conditions : En utilisant le site, vous acceptez les politiques et les restrictions énoncées dans la présente politique " +
              "de confidentialité en ligne. Si vous n'acceptez pas cette politique, veuillez ne pas utiliser le site. La présente politique de confidentialité en ligne " +
              "peut être révisée de temps à autre par la mise à jour de cet affichage. Vous êtes lié par ces révisions et devez donc visiter périodiquement cette page " +
              "pour consulter la politique de confidentialité en ligne alors en vigueur à laquelle vous êtes lié. " +
              "Dernière mise à jour : 7 Novembre 2020"
            }
        />
      </Box>
  </Page>
);