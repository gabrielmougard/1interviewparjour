import logging


def start_django_queue_cluster(q_cluster):
    """
    Start Django Q cluster.
    """
    logging.debug("starting Django Q cluster")
    q_cluster.start()


def stop_django_queue_cluster(q_cluster):
    """
    Stop Django Q cluster.
    """
    logging.debug("stopping Django Q cluster")
    q_cluster.stop()
