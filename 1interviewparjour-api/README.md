# 1interviewparjour-api

Features:
* Platform powered by high performance WSGI Gunicorn server.
* Signup API for user in frontend landing pages.
* Mail scheduler which is a mix of DjangoQ cluster for the scheduled tasks and AWS SES for sending the mail batches.
* (TODO) support for "Stripe Checkout" payment solutions.
* (TODO) support for Paypal payment solutions.

___

## How to setup ? (for Linux and MacOSX systems)

**1) clone and change directory**

`git clone https://github.com/gabrielmougard/1interviewparjour.git && cd 1interviewparjour/1interviewparjour-api`

**2) create virtualenv (requirement: Python3 installed < 3.8.x)**

`pip3 install virtualenv && virtualenv .venv && source .venv/bin/activate`

**3) install base dependencies**

`pip3 install -r requirements/base.txt`

**4) Setup your MySQL connection**

* With docker-compose(**recommended**)
    * just run the command `docker-compose up` in the `1interviewparjour-api/` folder and you have your database already setup.

* With your local MySQL server
    * Have a look at the `DATABASE` configuration in the `settings.py` file in `1interviewparjour-api/oneinterviewparjour/` folder.
    * You can configure the access here to suit your needs.

**5) Run the app**

* The development server (without the djangoQ):

    * If you want the development server, you need to migrate the data of the `migrations/` apps folders. You just need to do, `python3 manage.py migrate`.
    * Then you can do `python3 manage.py runserver`. You server is now serving at localhost:8000

* The production server (with gunicorn workers pool and djangoQ):
    * Its even simpler than above... All the starting pipeline has been bootstraped into the `launch-script.sh` file. You just need to do `./launch-script.sh` (if not executable, do `chmod +x launch-script.sh` on it)
    * It'll launch all the migrations, start the gunicorn workers, fecth all the scheduled tasks and start the djangoQ cluster. The server is available at localhost:8000 too.