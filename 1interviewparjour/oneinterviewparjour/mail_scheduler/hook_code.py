from enum import Enum

class MailingHookCode(Enum):
    AWS_SES_SENDING_ERROR = 1
    UPDATE_PROGRAM_HISTORY_ERROR = 2
    UPDATE_BUYING_HASH_ERROR = 3
    SENDING_SUCCESS = 4
