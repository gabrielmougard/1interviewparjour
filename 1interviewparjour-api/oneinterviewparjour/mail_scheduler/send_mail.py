import logging
import types

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import COMMASPACE

import boto3


def main(args):
    logging.info("send_mail.main function called with params : {}", args)


class AmazonSender(object):
    #https://stackoverflow.com/questions/45298069/ses-attachments-with-python
    client = None

    def __init__(self, aws_key, aws_secret):
        self.aws_key = aws_key
        self.aws_secret = aws_secret

    def send_email(self, sender,
                         to_addresses,
                         subject,
                         text,
                         html=None,
                         reply_addresses=None,
                         sender_ascii=None):
        if not sender_ascii:
            sender_ascii = sender

        client = self.get_client()

        message = MIMEMultipart('alternative')
        message.set_charset('UTF-8')

        message['Subject'] = _encode_str(subject)
        message['From'] = _encode_str(sender)

        message['To'] = _convert_to_strings(to_addresses)

        if reply_addresses:
            message['Reply-To'] = _convert_to_strings(reply_addresses)

        message.attach(MIMEText(_encode_str(text), 'plain'))

        if html:
            message.attach(MIMEText(_encode_str(html), 'html'))

        return client.send_raw_email(sender_ascii, message.as_string(),
                                                   destinations=to_addresses)

    def vertify_email(self, email):
        client = self.get_client()
        return client.verify_email_address(email)

    def get_client(self):
        if not self.client:
            self.client = boto3.client('ses')
        return self.client


