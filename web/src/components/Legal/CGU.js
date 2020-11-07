import React from 'react';
import Helmet from 'react-helmet';
import { Box } from 'grommet';
import Header from '../Header';
import Page from '../Page';

export default () => (
  <Page>
     <Box margin={{ bottom: 'large' }} width="xlarge" alignSelf="center">
        <Helmet>
            <title>Conditions générales d'utilisation</title>
            <meta name="description" content={"Conditions générales d'utilisation"} />
        </Helmet>
      </Box>
      <Box align={"center"}>
        <Header
            align={"center"}
            label={"Conditions générales d'utilisation"}
            summary={"Comment utiliser le site 1interviewparjour.com ?"}
            details={
              "VEUILLEZ LIRE ATTENTIVEMENT CES CONDITIONS D'UTILISATION AVANT D'UTILISER CE SITE WEB. En utilisant ce site web, vous signifiez votre consentement à ces conditions d'utilisation. Si vous n'acceptez pas ces conditions d'utilisation, veuillez ne pas utiliser le site web. " +
              "Votre accès et votre utilisation sur ce site web, ainsi que de tous les sites web connexes exploités par 1interviewparjour.com (collectivement le 'site') sont soumis aux conditions générales suivantes ('conditions générales d'utilisation') et à toutes les lois applicables. " +
              "En accédant et en naviguant sur le site, vous acceptez, sans limitation ni réserve, les conditions d'utilisation et reconnaissez que tout autre accord entre vous et le site est remplacé et n'a aucune force ou effet : " +
              "1. Vous acceptez que le site lui-même, ainsi que tout le contenu, les vidéos, le matériel de formation, les produits, les services et/ou autres matériels, mis à disposition sur le site par nous ou par d'autres tiers, " +
              "ainsi que l'aspect et la convivialité de tout ce qui précède, (collectivement appelés le 'contenu') sont maintenus pour votre usage personnel et vos informations par 1interviewparjour, (la 'société') et sont la propriété " +
              "de la société et/ou de ses fournisseurs tiers. Vous acceptez que ce contenu de la société inclue toutes les vidéos propriétaires, HTML/CSS, Javascript, graphiques, voix et enregistrements sonores, illustrations, photos, " +
              "documents et textes ainsi que tout autre matériel inclus dans le site, à l'exclusion du matériel que vous fournissez. Sous réserve de votre respect des présentes conditions d'utilisation, la société vous accorde par les " +
              "présentes une licence limitée, non exclusive, non transférable et non susceptible de sous-licence, pour accéder, visualiser et utiliser le site uniquement à des fins personnelles. Aucun contenu de la société ne peut être " +
              "copié, reproduit, republié, téléchargé, affiché, transmis, distribué, utilisé à des fins publiques ou commerciales, ou téléchargé de quelque manière que ce soit, sauf autorisation écrite expresse de la société. La modification " +
              "du contenu ou l'utilisation du contenu à toute autre fin constitue une violation des droits d'auteur et des autres droits de propriété de la société, ainsi que des autres auteurs qui ont créé les documents, et peut faire l'objet " +
              "de dommages-intérêts et de pénalités. Vous ne pouvez pas distribuer, modifier, transmettre ou utiliser le contenu du site ou tout autre contenu, y compris tout logiciel, outil, graphique et/ou fichier sonore, à des fins publiques ou " +
              "commerciales sans l'autorisation écrite expresse de la société. " +
              "2. Tout le Contenu, tel que les textes, données, fichiers graphiques, vidéos et fichiers sonores, et tout autre matériel contenu dans le Site, sont protégés par des droits d'auteur, sauf indication contraire, et sont la propriété de " +
              "la Société et/ou d'un fournisseur de la Société. Aucun matériel de ce type ne peut être utilisé sauf dans les conditions d'utilisation. " +
              "3. Tous les noms commerciaux, marques déposées, images et informations biographiques des personnes utilisés dans le contenu de la société et contenus dans le site, y compris, sans limitation, le nom et la marque déposée '1interviewparjour', " +
              "sont soit la propriété de la société, soit utilisés avec sa permission. L'utilisation du contenu par vous est strictement interdite, sauf si elle est spécifiquement autorisée par les présentes conditions d'utilisation. Toute utilisation non " +
              "autorisée du contenu peut violer les droits d'auteur, les marques de commerce et autres droits de propriété de la société et/ou de tiers, ainsi que les lois sur la vie privée et la publicité, et d'autres règlements et statuts. Rien de ce qui " +
              "est contenu dans le présent accord ou dans le site ne doit être interprété comme accordant, implicitement ou autrement, une licence ou un droit d'utilisation d'une marque de commerce ou d'autres informations propriétaires sans le consentement " +
              "écrit explicite de la société ou du tiers propriétaire. La société respecte les droits d'auteur, les marques de commerce et tous les autres droits de propriété intellectuelle des tiers. La société a le droit, mais n'a aucune obligation, de supprimer " +
              "le contenu et les comptes contenant des éléments qu'elle juge, à sa seule discrétion, illégaux, offensants, menaçants, diffamatoires, pornographiques, obscènes ou autrement répréhensibles ou qui violent la propriété intellectuelle d'une partie ou les " +
              "présentes conditions d'utilisation. Si vous pensez que vos droits de propriété intellectuelle sont violés et/ou qu'une œuvre vous appartenant a été reproduite sur le site ou dans tout contenu de quelque manière que ce soit, vous pouvez en informer la société " +
              "à l'adresse contact@1interviewparjour.com. Veuillez indiquer votre nom et vos coordonnées, la nature de votre travail et la manière dont il est violé, toutes les informations pertinentes concernant le droit d'auteur et/ou l'enregistrement de la marque, le " +
              "lieu/URL de la violation et toute autre information que vous jugez pertinente. " +
              "4. Bien que la société fasse des efforts raisonnables pour inclure des informations précises et à jour sur le site, elle ne donne aucune garantie ou représentation quant à leur exactitude. La société n'assume aucune responsabilité pour toute erreur ou omission dans le contenu du site." +
              "5. Lorsque vous vous inscrivez à la société et/ou sur ce site, vous acceptez expressément de recevoir des avis, annonces, accords, divulgations, rapports, documents, communications concernant de nouveaux produits ou services, ou d'autres dossiers ou " +
              "correspondances de la société. Vous consentez à recevoir des avis par voie électronique en vous transmettant l'avis par courrier électronique. " +
              "6. Si vous envoyez des commentaires ou des suggestions sur le site à la société, y compris, mais sans s'y limiter, des notes, du texte, des dessins, des images, des conceptions ou des programmes informatiques, ces envois deviennent et restent la propriété " +
              "exclusive de la société. Aucune soumission ne sera soumise à une quelconque obligation de confidentialité de la part de la société. La société est la seule propriétaire de tous les droits (y compris les droits de propriété intellectuelle) et a le droit d'utiliser, " +
              "de publier et de diffuser sans restriction toutes ces soumissions à toutes fins, commerciales ou autres, sans que vous en soyez remercié ou indemnisé." +
              "7. La société fera des efforts commercialement raisonnables pour restreindre l'accès non autorisé à nos données et fichiers. Toutefois, aucun système, qu'il soit ou non protégé par un mot de passe, ne peut être entièrement impénétrable. Vous reconnaissez qu'il peut " +
              "être possible pour un tiers non autorisé d'accéder, de visualiser, de copier, de modifier ou de distribuer les données et les fichiers que vous stockez en utilisant le site. L'utilisation du site est entièrement à vos propres risques. " +
              "8. La société ne divulguera pas intentionnellement à des tiers des informations d'identification personnelle vous concernant, sauf si la société, en toute bonne foi, estime qu'une telle divulgation est nécessaire pour se conformer à la " +
              "loi ou faire respecter les présentes conditions d'utilisation. En utilisant le site, vous signifiez votre acceptation de la politique de confidentialité de la société. Si vous n'êtes pas d'accord avec cette politique de confidentialité, " +
              "en tout ou en partie, veuillez ne pas utiliser ce site. " +
              "9. NI LA SOCIÉTÉ NI AUCUNE AUTRE PARTIE IMPLIQUÉE DANS LA CRÉATION, LA PRODUCTION OU LA MAINTENANCE DU SITE ET/OU DE TOUT CONTENU DU SITE NE PEUT EN AUCUN CAS ÊTRE TENUE RESPONSABLE DE TOUT DOMMAGE DIRECT, ACCESSOIRE, CONSÉCUTIF, INDIRECT " +
              "OU PUNITIF DÉCOULANT DE VOTRE ACCÈS AU SITE OU DE VOTRE UTILISATION DE CELUI-CI. SANS LIMITER CE QUI PRÉCÈDE, TOUT LE CONTENU DU SITE EST FOURNI 'TEL QUEL' SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS, MAIS SANS S'Y LIMITER, " +
              "LES GARANTIES IMPLICITES DE QUALITÉ MARCHANDE OU D'ADÉQUATION À UN USAGE PARTICULIER. LA SOCIÉTÉ NE GARANTIT NI NE FAIT AUCUNE DÉCLARATION CONCERNANT L'UTILISATION DES MATÉRIAUX DU SITE, LES RÉSULTATS DE L'UTILISATION DE CES MATÉRIAUX, " +
              "L'ADÉQUATION DE CES MATÉRIAUX AUX BESOINS DE TOUT UTILISATEUR OU LA PROBABILITÉ QUE LEUR UTILISATION RÉPONDE AUX ATTENTES DE TOUT UTILISATEUR, OU LEUR EXACTITUDE, PRÉCISION, FIABILITÉ OU CORRECTION. DE MÊME, LA SOCIÉTÉ NE GARANTIT PAS QUE " +
              "VOUS GAGNEREZ DE L'ARGENT EN UTILISANT LE SITE OU LA TECHNOLOGIE OU LES SERVICES DE LA SOCIÉTÉ, ET NE FAIT AUCUNE DÉCLARATION OU GARANTIE À CET ÉGARD. VOUS ACCEPTEZ L'ENTIÈRE RESPONSABILITÉ DE L'ÉVALUATION DE VOTRE PROPRE POTENTIEL DE GAIN " +
              "AINSI QUE DE L'EXÉCUTION DE VOS PROPRES ACTIVITÉS ET SERVICES. VOTRE POTENTIEL DE GAIN DÉPEND ENTIÈREMENT DE VOS PROPRES PRODUITS, IDÉES ET TECHNIQUES, DE L'EXÉCUTION DE VOTRE PLAN D'AFFAIRES, DU TEMPS QUE VOUS CONSACREZ AU PROGRAMME, DES " +
              "IDÉES ET TECHNIQUES OFFERTES ET UTILISÉES, AINSI QUE DE VOS FINANCES, DE VOS CONNAISSANCES ET DE VOS COMPÉTENCES. ÉTANT DONNÉ QUE CES FACTEURS DIFFÈRENT D'UNE PERSONNE À L'AUTRE, L'ENTREPRISE NE PEUT PAS ET NE FAIT AUCUNE DÉCLARATION OU GARANTIE " +
              "CONCERNANT VOTRE RÉUSSITE OU VOTRE NIVEAU DE REVENU. LA SOCIÉTÉ NE GARANTIT PAS QUE L'UTILISATION DU MATÉRIEL SERA ININTERROMPUE OU SANS ERREUR, QUE LES DÉFAUTS SERONT CORRIGÉS OU QUE CE SITE, LE CONTENU ET/OU LE MATÉRIEL DISPONIBLE SUR CE SITE SONT " +
              "EXEMPTS DE BOGUES OU DE VIRUS OU D'AUTRES ÉLÉMENTS NUISIBLES. VOUS ASSUMEZ L'ENTIÈRE RESPONSABILITÉ DU COÛT DE TOUTES LES RÉPARATIONS OU CORRECTIONS NÉCESSAIRES. LA SOCIÉTÉ N'EST PAS RESPONSABLE DES PROBLÈMES DE PERFORMANCE OU DE SERVICE CAUSÉS PAR UN " +
              "SITE WEB TIERS OU UN FOURNISSEUR DE SERVICES TIERS. TOUT PROBLÈME DE CE TYPE SERA RÉGI UNIQUEMENT PAR L'ACCORD ENTRE VOUS ET CE FOURNISSEUR. Veuillez noter que la juridiction applicable peut ne pas autoriser l'exclusion des garanties implicites. " +
              "Certaines des exclusions ci-dessus peuvent donc ne pas s'appliquer à vous. " +
              "10. LA SOCIÉTÉ NE SERA PAS RESPONSABLE DES PROBLÈMES DE PERFORMANCE OU DE SERVICE CAUSÉS PAR UN SITE WEB OU UN FOURNISSEUR DE SERVICES TIERS (y compris, par exemple, le service de votre fournisseur de services web, les services de paiement à bande, " +
              "votre logiciel et/ou toute mise à jour ou mise à niveau de ce logiciel). " +
              "11. EN AUCUN CAS, LA SOCIÉTÉ NE PEUT ÊTRE TENUE RESPONSABLE DE DOMMAGES SPÉCIAUX, ACCESSOIRES, INDIRECTS, PUNITIFS, DE CONFIANCE OU CONSÉCUTIFS, PRÉVISIBLES OU NON, Y COMPRIS, MAIS SANS S'Y LIMITER, LES DOMMAGES OU PERTES DE BIENS, D'ÉQUIPEMENTS, " +
              "D'INFORMATIONS OU DE DONNÉES, LES PERTES DE PROFITS, DE REVENUS OU DE CLIENTÈLE, LE COÛT DU CAPITAL, LE COÛT DES SERVICES DE REMPLACEMENT OU LES RÉCLAMATIONS POUR INTERRUPTION DE SERVICE OU PROBLÈMES DE TRANSMISSION, OCCASIONNÉS PAR UN DÉFAUT DU SITE, " +
              "DU CONTENU ET/OU DES ÉLÉMENTS CONNEXES, L'INCAPACITÉ D'UTILISER LES SERVICES FOURNIS EN VERTU DES PRÉSENTES OU TOUTE AUTRE CAUSE À CET ÉGARD, QUELLE QUE SOIT LA THÉORIE DE LA RESPONSABILITÉ. CETTE LIMITATION S'APPLIQUERA MÊME SI LA SOCIÉTÉ A ÉTÉ INFORMÉE " +
              "OU EST CONSCIENTE DE LA POSSIBILITÉ DE TELS DOMMAGES. " +
              "12. Vous acceptez d'indemniser et de tenir la société et chacun de ses administrateurs, dirigeants, employés et agents, à l'écart de toute responsabilité, réclamation, dommage et dépense, y compris les honoraires raisonnables d'avocat, découlant de ou liés " +
              "à (i) votre violation du présent accord, (ii) toute violation par vous de la loi ou des droits d'un tiers, (iii) tout matériel, information, travaux et/ou autre contenu de quelque nature ou média que vous publiez ou partagez sur ou via le Site, (iv) votre " +
              "utilisation du Site ou de tout service que la Société peut fournir via le Site, et (v) votre conduite en relation avec le Site ou les services ou avec d'autres utilisateurs du Site ou des services. La société se réserve le droit d'assumer la défense exclusive " +
              "de toute réclamation pour laquelle nous avons droit à une indemnisation en vertu de la présente section. Dans ce cas, vous devrez fournir à la société la coopération raisonnablement demandée par la société. " +
              "13. Les dispositions des présentes conditions d'utilisation sont au bénéfice de la société, de ses filiales, de ses sociétés affiliées et de ses fournisseurs de contenu et concédants de licence tiers, et chacun d'entre eux aura le droit de faire valoir et " +
              "d'appliquer ces dispositions directement ou en son propre nom. " +
              "14. Le présent accord sera régi et interprété conformément aux lois de l'État de Français, sans donner effet à aucun principe de conflit de lois. Vous vous soumettez en outre à la juridiction exclusive des tribunaux de l'état Français. Si une disposition du " +
              "présent accord est illégale, nulle ou inapplicable pour quelque raison que ce soit, cette disposition sera considérée comme séparable du présent accord et n'affectera pas la validité et l'applicabilité des autres dispositions. " +
              "15. Ces conditions génrales d'utilisation peuvent être révisées de temps en temps par la mise à jour de cet affichage. Vous êtes lié par ces révisions et devez donc visiter périodiquement cette page pour revoir les conditions génrales d'utilisation alors en vigueur auxquelles vous êtes lié. " +
              "Dernière mise à jour : 7 novembre 2020"
            }
        />
      </Box>
  </Page>
);
