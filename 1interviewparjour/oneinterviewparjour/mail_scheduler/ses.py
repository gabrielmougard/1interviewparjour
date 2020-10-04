from django.conf import settings
import boto3

class AmazonSender(object):
    #https://kb.databricks.com/_static/notebooks/notebooks/send-email-aws.html
    client = None

    def __init__(self):
        self.aws_key = settings.AWS_PUBLIC_KEY
        self.aws_secret = settings.AWS_SECRET_KEY
        self.aws_region_name = settings.AWS_REGION_NAME
        self.problem_metadata = dict()

    def send_email(self, sender, to_addresses, subject, html):
        client = self.__get_client()
        return client.send_email(
            Source=sender,
            Destination={
                'ToAddresses': to_addresses
            },
            Message={
                'Subject': {
                    'Data': subject,
                    'Charset': 'UTF-8'
                },
                'Body': {
                    'Html': {
                        'Data': html,
                        'Charset': 'UTF-8'
                    }
                }
            }
        )

    def __get_client(self):
        if not self.client:
            self.client = boto3.client(
                'ses',
                aws_access_key_id=self.aws_key,
                aws_secret_access_key=self.aws_secret,
                region_name=self.aws_region_name
            )

        return self.client
