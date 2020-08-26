from django.test import TestCase
from oneinterviewparjour.core.models import (
    User,
    Program,
    Problem
)

class MailTestCase(TestCase):
    def setUp(self):
        User.objects.create(mail="user1@gmail.com", pro=True)
        User.objects.create(mail="user2@gmail.com", pro=False)
        User.objects.create(mail="user3@gmail.com", pro=True)
        User.objects.create(mail="user4@gmail.com", pro=False)
        User.objects.create(mail="user5@gmail.com", pro=True)
        User.objects.create(mail="user6@gmail.com", pro=True)

        Problem.objects.create(exercise="Pb1", correction="Pb1 solution", difficulty="ez")
        Problem.objects.create(exercise="Pb2", correction="Pb2 solution", difficulty="mid")
        Problem.objects.create(exercise="Pb3", correction="Pb3 solution", difficulty="hard")
        Problem.objects.create(exercise="Pb4", correction="Pb4 solution", difficulty="ez")
        Problem.objects.create(exercise="Pb5", correction="Pb5 solution", difficulty="xhard")
        Problem.objects.create(exercise="Pb6", correction="Pb6 solution", difficulty="mid")

        Program.objects.create(hour=13, problem_id=2, user_id=2)
        Program.objects.create(hour=13, problem_id=3, user_id=3)
        Program.objects.create(hour=13, problem_id=4, user_id=4)
        Program.objects.create(hour=13, problem_id=5, user_id=1)
        Program.objects.create(hour=13, problem_id=1, user_id=2)
        Program.objects.create(hour=13, problem_id=2, user_id=5)
        Program.objects.create(hour=14, problem_id=3, user_id=4)
        Program.objects.create(hour=14, problem_id=4, user_id=3)
        Program.objects.create(hour=14, problem_id=1, user_id=5)
        Program.objects.create(hour=14, problem_id=5, user_id=1)
        Program.objects.create(hour=14, problem_id=3, user_id=2)
        Program.objects.create(hour=14, problem_id=4, user_id=4)
        Program.objects.create(hour=14, problem_id=5, user_id=5)


    def test_fetch_mailing_list_13h_14h(self):
        programs = Program.objects.filter(hour=13)
        res = []
        for program in programs:
            if program.user.pro:
                res.append([
                    program.user.mail,
                    program.problem.exercise,
                    program.problem.difficulty,
                    program.problem.correction
                ])
            else:
                res.append([
                    program.user.mail,
                    program.problem.exercise,
                    program.problem.difficulty
                ])

        self.assertEqual(res, [
                ['user2@gmail.com', 'Pb2', 'mid'],
                ['user3@gmail.com', 'Pb3', 'hard', 'Pb3 solution'],
                ['user4@gmail.com', 'Pb4', 'ez'],
                ['user1@gmail.com', 'Pb5', 'xhard', 'Pb5 solution'],
                ['user2@gmail.com', 'Pb1', 'ez'],
                ['user5@gmail.com', 'Pb2', 'mid', 'Pb2 solution']
            ]
        )

        programs = Program.objects.filter(hour=14)
        res = []
        for program in programs:
            if program.user.pro:
                res.append([
                    program.user.mail,
                    program.problem.exercise,
                    program.problem.difficulty,
                    program.problem.correction
                ])
            else:
                res.append([
                    program.user.mail,
                    program.problem.exercise,
                    program.problem.difficulty
                ])

        self.assertEqual(res, [
                ['user4@gmail.com', 'Pb3', 'hard'],
                ['user3@gmail.com', 'Pb4', 'ez', 'Pb4 solution'],
                ['user5@gmail.com', 'Pb1', 'ez', 'Pb1 solution'],
                ['user1@gmail.com', 'Pb5', 'xhard', 'Pb5 solution'],
                ['user2@gmail.com', 'Pb3', 'hard'],
                ['user4@gmail.com', 'Pb4', 'ez'],
                ['user5@gmail.com', 'Pb5', 'xhard', 'Pb5 solution']
            ]
        )

