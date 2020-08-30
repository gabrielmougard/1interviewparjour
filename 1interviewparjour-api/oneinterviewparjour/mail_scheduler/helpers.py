def generate_template_mail(problem_metadata, pro):
    """
    1) Use a mardown to html generator for the `problem_metadata['exercise_body']`

    2) if pro is False, we will fill mail-not-pro.html and we will take the
    first 12 lines of code of `problem_metadata['exercise']`

    3) Reuse the hilite.me library to format the `problem_metadata['bootcode']`
    and the (shortened or not according to the state of the `pro` variable)
    `problem_metadata['solution']`

    4) According to `pro`, we fill either "mail-pro.html" or "mail-not-pro.html"
    with `problem_metadata['title']`, `problem_metadata['company']`, the converted to HTML
    `problem_metadata['exercise']` markdown syntax, the "hilited" `problem_metadata['bootcode']`,
    and `problem_metadata['solution']`.

    if the `problem_metadata['company']` is {name: "1interviewparjour", logo: "..."} change
    "Ce probleme est inspire d'une interview donnee par" by "Ce probleme est une creation originale de"

    5) return return the formatted template as a string.


    * `company_message` : "Ce probleme est inspire d'une interview donnee par"
    * `company_logo` : <The svg logo of the company>
    * `exercise_title` : <The title of the exercise>
    * `exercise_body` : <The exercise explanation>
    * `exercise_bootcode` : <The exercise starting code to bootstrap the problem>
    * `exercise_solution` : <The exercise solution>
    * `payment_gateway_link`: <secure generated URL to access the payment gateway for this exercise>

    """
    # 1)
    exercise_body_list = problem_metadata['exercise_body'].split("\n")
    exercise_body_formatted = ""
    for line in exercise_body_list:
        if len(line) == 0 or len(line.replace(" ", "")) == 0:
            exercise_body_formatted += "<p style='line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;'> </p>"
        else:
            exercise_body_formatted += "<p style='line-height: 1.2; word-break: break-word; font-size: 14px; mso-line-height-alt: 17px; margin: 0;'><span style='font-size: 14px;'>"+line+"</span></p>"
        exercise_body_formatted += "\n"
    #
    # 2)
    if not pro:
        


def _convert_to_strings(list_of_strs):
    if isinstance(list_of_strs, (list, tuple)):
        result = COMMASPACE.join(list_of_strs)
    else:
        result = list_of_strs
    return _encode_str(result)

def _encode_str(s):
    if type(s) == types.UnicodeType:
        return s.encode('utf8')
    return s