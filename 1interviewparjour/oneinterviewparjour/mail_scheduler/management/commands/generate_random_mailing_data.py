import logging
import random
import arrow

from oneinterviewparjour.core.base import BaseCommandWithLogger
from oneinterviewparjour.core.models import PlanningEvent, Topic, Problem, User, Company
from oneinterviewparjour.stripe.models import Price

class Command(BaseCommandWithLogger):
    def add_arguments(self, parser):
        parser.add_argument('number', nargs='+', type=int)

    def handle(self, *args, **kwargs):
        """
        How to launch : python3 manage.py generate_random_mailing_data <#_OF_PROBLEM_TO_CREATE> <#_OF_EVENTS_TO_CREATE>

        Here we generate data to test the mailing engine (especially the part where
        we need to solve the optimal problem for a given language, diffuculty and topics)
        The user for the PlanningEvent is still the same : gabriel.mougard@gmail.com
        Be sure that such a user mail is in DB.
        """
        user = User.objects.get(mail="gabriel.mougard@gmail.com")
        price = Price.objects.get(price_type="one_time") # get the "oneinterview" Price Model
        days = [i for i in range(7)]
        hours = [i for i in range(24)]
        minutes = [0, 30]
        languages = ["python", "rust", "go"]
        difficulties = ["easy", "medium", "advanced", "hard", "extrem"]

        lang2bootcode = {
            "python": "class Solution:\n\tdef partage_optimal(self, liste_prix, liste_masse, masse_max):\n\t\t#\n\t\t# Remplir la fonction ici.\n\t\t#",
            "rust": "pub fn rotate_matrix(m: &mut Vec<Vec<u16>>) -> bool {\n\t// votre code va ici\n}",
            "go": "func lengthOfLongestSubstring(s string) int {\n\t// le code va ici\n}"
        }
        topic_list = [t.topic for t in Topic.objects.all()]
        companies = [c for c in Company.objects.all()]
        is_active = [True, False]

        def generate_random_topics_sequence():
            l_seq = random.randrange(1, len(topic_list))
            topic_list_cpy = topic_list.copy()
            random.shuffle(topic_list_cpy)
            chosen_topics = []
            for i in range(l_seq):
                chosen_topics.append(topic_list_cpy.pop())
            return ",".join(chosen_topics)


        for i in range(kwargs["number"][0]): # It will generate this amount of random Problem models and this amount of random PlanningEvent models
            # First create the Problem then the PlanningEvent
            chosen_language = random.choice(languages)
            chosen_topics = random.sample([j for j in range(len(topic_list))], k=3)
            problem = Problem.objects.create(
                active=random.choice(is_active),
                title=f"pb test #{str(i)}",
                difficulty=random.choice(difficulties),
                company=random.choice(companies),
                topic1={chosen_topics[0]},
                topic2={chosen_topics[1]},
                topic3={chosen_topics[2]},
                keywords="test keywords",
                unit_price=price,
                exercise=f"Exercise test #{str(i)}",
                language=chosen_language,
                bootcode=lang2bootcode[chosen_language],
                correction=lang2bootcode[chosen_language], # we don't care for the content here
                explanation=f"Explanation for problem #{str(i)}",
                mail_preview="gabriel.mougard@gmail.com"
            )
            # need to deactivate the mail preview when creating a problem here...
        for i in range(kwargs["number"][1]):
            planning_event = PlanningEvent.objects.create(
                user=user,
                title=f"Test event #{str(i)}",
                day=random.choice(days),
                time=f"{str(random.choice(hours))}:{str(random.choice(minutes))}",
                language=random.choice(languages),
                difficulty=random.choice(difficulties),
                topics=generate_random_topics_sequence(),
            )
