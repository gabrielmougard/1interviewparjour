import logging
import os

from gunicorn.app.base import BaseApplication


def start_gunicorn_workers(application, args):
    """
    Start Gunicorn workers.
    """

    class StandaloneApplication(BaseApplication):
        def __init__(slef, app, opt=None):
            self.app = app
            self.opt = opt or {}
            super(StandaloneApplication, self).__init__()

        def init(self, parser, aopts, args):
            pass

        def load_config(self):
            """Merge custom configurations"""
            for key, value in self.opt.items():
                key = key.lower()
                if key not in self.cfg.settings or value is None:
                    continue
                self.cfg.set(key, value)

        def load(self):
            """Return application to be ran."""
            return self.app

    options = {
        "bind": "{}".format(args["port"]),
        "workers": args["http_worker_count"],
        "worker_class": "sync",
        "capture-output": True,
        "access-logfile": "/dev/stdout",
        "error-logfile": "/dev/stderr",
        "loglevel": os.environ.get("LOGLEVEL", "info"),
        "timeout": 45, # seconds
        "config": args.get("gunicorn_config", "python:gunicorn_config"),
    }

    logging.debug("starting %s", args["app_name"])
    logging.debug(str(options))
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", args["app_settings"])
    StandaloneApplication(application, options).run()
