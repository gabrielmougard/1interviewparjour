import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { Box, Paragraph, Grid, Accordion, AccordionPanel } from 'grommet';
import Nav from '../../components/Nav';
import Footer from '../Footer';
import Header from '../../components/Header';
import Section from './Section';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow";

//utils
import { config } from '../../utils/config'

function ExampleComponent({fetchSupportedLanguages, supportedLanguages, finalizeSignup, signupCompleted, closeFromInside, closedFromInside}) {
    const isPhone = useMediaQuery({
        query: '(max-width: 479px)'
    })

    useEffect(() => {
        const { API_URL } = config
        fetch(API_URL + "/api/v1/tracking/landing_page/example")
        .then((result) => {
        })
    }, [])

    let exampleGrid
    if (isPhone) {
        exampleGrid =
        <Grid
        columns={['small', 'small']}
        rows={['xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall']}
        gap="xxsmall"
        areas={[
            { name: 'mass', start: [0, 0], end: [1, 0] },
            { name: 'price', start: [1, 0], end: [1, 0] },
            { name: 'm100', start: [0, 1], end: [1, 1] },
            { name: 'm200', start: [0, 2], end: [1, 2] },
            { name: 'm300', start: [0, 3], end: [1, 3] },
            { name: 'm400', start: [0, 4], end: [1, 4] },
            { name: 'm500', start: [0, 5], end: [1, 5] },
            { name: 'm600', start: [0, 6], end: [1, 6] },
            { name: 'm700', start: [0, 7], end: [1, 7] },
            { name: 'm800', start: [0, 8], end: [1, 8] },
            { name: 'p100', start: [1, 1], end: [1, 1] },
            { name: 'p200', start: [1, 2], end: [1, 2] },
            { name: 'p300', start: [1, 3], end: [1, 3] },
            { name: 'p400', start: [1, 4], end: [1, 4] },
            { name: 'p500', start: [1, 5], end: [1, 5] },
            { name: 'p600', start: [1, 6], end: [1, 6] },
            { name: 'p700', start: [1, 7], end: [1, 7] },
            { name: 'p800', start: [1, 8], end: [1, 8] },
        ]}
        >
            <Box gridArea="mass" background="brand" >Masse d'une part (en g)</Box>
            <Box gridArea="price" background="brand" >Prix (en €)</Box>
            <Box gridArea="m100" background="light-2">100</Box>
            <Box gridArea="m200" background="light-2" >200</Box>
            <Box gridArea="m300" background="light-2" >300</Box>
            <Box gridArea="m400" background="light-2" >400</Box>
            <Box gridArea="m500" background="light-2" >500</Box>
            <Box gridArea="m600" background="light-2" >600</Box>
            <Box gridArea="m700" background="light-2" >700</Box>
            <Box gridArea="m800" background="light-2" >800</Box>
            <Box gridArea="p100" background="light-2" >1</Box>
            <Box gridArea="p200" background="light-2" >5</Box>
            <Box gridArea="p300" background="light-2" >8</Box>
            <Box gridArea="p400" background="light-2" >9</Box>
            <Box gridArea="p500" background="light-2" >10</Box>
            <Box gridArea="p600" background="light-2" >17</Box>
            <Box gridArea="p700" background="light-2" >17</Box>
            <Box gridArea="p800" background="light-2" >20</Box>
        </Grid>
    } else {
        exampleGrid =
        <Grid
            rows={['xxsmall', 'xxsmall']}
            columns={['xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall']}
            gap="xxsmall"
            areas={[
                { name: 'mass', start: [0, 0], end: [3, 0] },
                { name: 'price', start: [0, 1], end: [3, 1] },
                { name: 'm100', start: [3, 0], end: [4, 0] },
                { name: 'm200', start: [4, 0], end: [5, 0] },
                { name: 'm300', start: [5, 0], end: [6, 0] },
                { name: 'm400', start: [6, 0], end: [7, 0] },
                { name: 'm500', start: [7, 0], end: [8, 0] },
                { name: 'm600', start: [8, 0], end: [9, 0] },
                { name: 'm700', start: [9, 0], end: [10, 0] },
                { name: 'm800', start: [10, 0], end: [11, 0] },
                { name: 'p100', start: [3, 1], end: [4, 1] },
                { name: 'p200', start: [4, 1], end: [5, 1] },
                { name: 'p300', start: [5, 1], end: [6, 1] },
                { name: 'p400', start: [6, 1], end: [7, 1] },
                { name: 'p500', start: [7, 1], end: [8, 1] },
                { name: 'p600', start: [8, 1], end: [9, 1] },
                { name: 'p700', start: [9, 1], end: [10, 1] },
                { name: 'p800', start: [10, 1], end: [11, 1] },
            ]}
        >
            <Box gridArea="mass" background="brand" >Masse d'une part (en g)</Box>
            <Box gridArea="price" background="brand" >Prix (en €)</Box>
            <Box gridArea="m100" background="light-2">100</Box>
            <Box gridArea="m200" background="light-2" >200</Box>
            <Box gridArea="m300" background="light-2" >300</Box>
            <Box gridArea="m400" background="light-2" >400</Box>
            <Box gridArea="m500" background="light-2" >500</Box>
            <Box gridArea="m600" background="light-2" >600</Box>
            <Box gridArea="m700" background="light-2" >700</Box>
            <Box gridArea="m800" background="light-2" >800</Box>
            <Box gridArea="p100" background="light-2" >1</Box>
            <Box gridArea="p200" background="light-2" >5</Box>
            <Box gridArea="p300" background="light-2" >8</Box>
            <Box gridArea="p400" background="light-2" >9</Box>
            <Box gridArea="p500" background="light-2" >10</Box>
            <Box gridArea="p600" background="light-2" >17</Box>
            <Box gridArea="p700" background="light-2" >17</Box>
            <Box gridArea="p800" background="light-2" >20</Box>
        </Grid>
    }

    return (
        <Box>
            <Nav />
            <Section pad={{ top: 'xlarge' }}>
                <Header
                    level={2}
                    label="Exemple d'un problème d'interview"
                    summary={
                        <Paragraph size="medium" textAlign="center">
                        <Box
                            direction="row-responsive"
                            gap="large"
                            justify="center"
                        >
                            Myriam et Gabriel ont eu l'idée de faire des gâteaux pour vendre des parts
                            lors d'un évènement associatif. Plus la part est grosse (ou pèse lourd) plus son prix est élevé.
                            Un tableau de conversion du prix des parts en fonction de sa grosseur est donné ci-dessous :
                        </Box>
                        <Box
                            margin="small"
                            direction="row-responsive"
                            gap="large"
                            justify="center"
                            align="center"
                        >
                            {exampleGrid}
                        </Box>
                        <Box
                            direction="row-responsive"
                            gap="large"
                            justify="center"
                        >
                            Chaque gâteau fait 800g (oui ils sont gros). Le but de ce problème est de
                            trouver le partage optimal du gâteau pour récolter le plus d'argent.
                            (i.e : Vais-je vendre 4 parts à 200g pour un total de 20€ par exemple, ou y a-t-il une meilleure répartition ?)
                            La fonction doit renvoyer le prix maximal atteignable pour un partage.
                        </Box>
                        </Paragraph>
                    }
                />

                <Box
                    direction="row-responsive"
                    justify="center"
                    gap="large"
                    margin="large"
                >
                    <AceEditor
                        width={ isPhone ? '90vw' : '100vw' }
                        mode="python"
                        theme="tomorrow"
                        name="example-interview"
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={
`
class Solution:
  def partage_optimal(self, liste_prix, liste_masse, masse_max):
    #
    # Remplir la fonction ici.
    #

# Tester le code ici.
liste_masse = [100, 200, 300, 400, 500, 600, 700, 800]
liste_prix = [1, 5, 8, 9, 10, 17, 17, 20]
s = Solution().partage_optimal(liste_prix, liste_masse)
print("Le prix optimal pour un partage est de : "+str(s)+" euros")
`
                        }
                        setOptions={
                            {
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }
                        }
                    />
                </Box>
            </Section>

            <Section background="brand" pad="none">
                <Box
                    alignSelf="center"
                    width="large"
                    pad="medium"
                    round={{ corner: 'bottom' }}
                    margin={{ bottom: 'xlarge' }}
                >
                </Box>

                <Header
                    level={2}
                    label="La solution..."
                    summary="Ce problème peut être résolu de deux manières (l'une étant beaucoup moins efficace que l'autre mais plus simple à trouver) : "
                />

                <Box
                    direction="row-responsive"
                    justify="center"
                    gap="large"
                    margin="medium"
                >
                    <Accordion>
                        <AccordionPanel label="Solution inefficace - O(n!) - Récursif">
                            <Box
                                direction="row-responsive"
                                justify="center"
                                gap="large"
                                margin="large"
                            >
                                <AceEditor
                                    width={ isPhone ? '90vw' : '100vw' }
                                    mode="python"
                                    theme="tomorrow"
                                    name="example-interview"
                                    fontSize={14}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={
`import sys

def max(a, b):
  if a < b:
    return b
  return a

class Solution:
  def partage_optimal(self, liste_prix, liste_masse, masse_max):
    if len(liste_prix) != len(liste_masse):
      return False
    if masse_max <= 0:
      return 0
    max_val = -sys.maxsize-1
    stop_idx = 0
    for i in range(len(liste_masse)):
      if liste_masse[i] == masse_max:
        stop_idx = i
        break

    for i in range(stop_idx+1):
      max_val = max(
        max_val,
        liste_prix[i] +
        Solution().partage_optimal(liste_prix, liste_masse, masse_max - liste_masse[i])
      )
    return max_val

# Tester le code ici.
liste_masse = [100, 200, 300, 400, 500, 600, 700, 800]
liste_prix = [1, 5, 8, 9, 10, 17, 17, 20]
s = Solution().partage_optimal(liste_prix, liste_masse, 800)
print("Le prix optimal pour un partage est de : "+str(s)+" euros")
`
                                    }
                                    setOptions={
                                        {
                                            enableBasicAutocompletion: false,
                                            enableLiveAutocompletion: false,
                                            enableSnippets: false,
                                            showLineNumbers: true,
                                            tabSize: 2,
                                        }
                                    }
                                />
                                <Paragraph alignSelf={"stretch"} responsive={true}>
                                    La solution qui vient en premier à l'esprit est de générer
                                    toutes les combinaisons de type de part et de prendre celle qui rapporte le plus d'argent.
                                    Pour générer toutes ces combinaisons, on peut utiliser l'approche <b>"diviser pour régner"</b> et
                                    ainsi appeler la fonction de manière récursive en changeant le paramètre de la masse restante à chaque fois...
                                    Nous construisons aisni l'arbre des combinaisons pour au final arriver aux cas les plus basiques et faire remonter 
                                    l'information. Nous faisons environ <b>n!</b> opérations (<b>n</b> étant le nombre de type de part différentes, 8 dans notre exemple donc) en omettant les éventuelles constantes multiplicatives et autre facteurs
                                    "asymptotiquement" négligeables (la complexité est donc en <b>O(n!)</b>). Nous pouvons faire bien mieux car, dans cette approche, plusieurs cas 
                                    sont calculés plusieurs fois inutilement... Il nous faut donc les garder en mémoire pour éviter de les recalculer. L'approche suivante utilise ce principe.
                                    <br></br>
                                    <b>Ordre de grandeur</b> : Il faudrait environ <b>5h30min</b> pour un ordinateur actuel pour résourdre ce problème si la
                                    liste n'était composée que de 16 éléments (16 types de part différentes)
                                    <br></br>
                                    <b>Preuve</b> : <b>16! = 16x15x...x2x1 = 2e+13</b>. Donc pour un processeur actuel faisant dans les <b>10e+9</b> instructions/secondes, 
                                    il faudrait attendre environ 20e+4 secondes, environ 5h30min... Pour 20 éléments il faudrait environ 750,000h à attendre... autant dire une éternité !
                                </Paragraph>
                            </Box>
                        </AccordionPanel>
                        <AccordionPanel label="Solution efficace - O(n^2) - Programmation dynamique">
                            <Box
                                direction="row-responsive"
                                justify="center"
                                gap="large"
                                margin="large"
                            >
                                <AceEditor
                                    width={ isPhone ? '90vw' : '100vw' }
                                    mode="python"
                                    theme="tomorrow"
                                    name="example-interview"
                                    fontSize={14}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={
`import sys

def max(a, b):
  if a < b:
    return b
  return a

class Solution:
  def partage_optimal(self, liste_prix, liste_masse):
    val = [0 for x in range(len(liste_masse)+1)]
    val[0] = 0

    for i in range(1, len(liste_masse)+1):
      max_val = -sys.maxsize-1
      for j in range(i):
        max_val = max(max_val, liste_prix[j] + val[i-j-1])
      val[i] = max_val
    return val[-1]

# Tester le code ici.
liste_masse = [100, 200, 300, 400, 500, 600, 700, 800]
liste_prix = [1, 5, 8, 9, 10, 17, 17, 20]
s = Solution().partage_optimal(liste_prix, liste_masse)
print("Le prix optimal pour un partage est de : "+str(s)+" euros")
`
                                    }
                                    setOptions={
                                        {
                                        enableBasicAutocompletion: false,
                                        enableLiveAutocompletion: false,
                                        enableSnippets: false,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                        }
                                    }
                                />
                                <Paragraph alignSelf={"stretch"} responsive={true}>
                                    Cette approche fait appelle à un concept appelé "Programmation dynamique" (souvent abrégé "DP" pour "Dynamic Programming"), qui consiste
                                    à sauvegarder les états d'un programme pour ne pas avoir à les recalculer plus tard. Précedemment, nous aurions recalculé plusieurs fois le cas 
                                    <b> partage_optimal(liste_prix, liste_masse, 300)</b> par exemple. Ici nous ne le calculerons qu'une fois en stockant ce résultat en mémoire. Ici, 
                                    la liste stockant les "états" du meilleur choix nous aide à calculer l'état d'après : pour trouver la meilleure combinaison à l'étape <b>k</b>, je réutilise
                                    l'état enregistré à l'étape <b>k-1</b>. Nous arrivons ainsi à une complexité en <b>O(n^2)</b> où <b>n</b> est le nombre de type de part différentes. 
                                    <br></br>
                                    <b>Ordre de grandeur</b> : Il faudrait environ <b>400ns</b> pour un ordinateur actuel pour résourdre ce problème si la
                                    liste n'était composée que de 20 éléments : autant dire que c'est instantané ! Passer d'une éternité à l'instantané... 
                                    on peut maintenant constater à quel point l'optimisation d'un algorithme est une question cruciale !
                                </Paragraph>
                            </Box>
                        </AccordionPanel>
                    </Accordion>
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
    )
}

export default ExampleComponent
