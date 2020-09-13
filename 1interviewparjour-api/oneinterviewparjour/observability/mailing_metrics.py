def expose_sent_mail(task):
    """
    Here we expose the metrics when a mail is successfully sent to a customer
    """
    result = task.result
    print(f"Observability : {result}")