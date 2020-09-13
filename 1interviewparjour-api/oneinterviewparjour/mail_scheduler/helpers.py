import re

from secrets import token_hex

from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

from django.template.loader import get_template


def insert_line_numbers(html):
    match = re.search('(<pre[^>]*>)(.*)(</pre>)', html, re.DOTALL)
    if not match: return html

    pre_open = match.group(1)
    pre = match.group(2)
    pre_close = match.group(3)

    html = html.replace(pre_close, '</pre></td></tr></table>')
    numbers = range(1, pre.count('\n') + 1)
    format = '%' + str(len(str(numbers[-1]))) + 'i'
    lines = '\n'.join(format % i for i in numbers)
    html = html.replace(pre_open, '<table><tr><td>' + pre_open + lines + '</pre></td><td>' + pre_open)
    return html


def _to_HTML_code(code, lexer, options, style, linenos, divstyles): # in our configuration, divstyles is `padding:.2em .6em;` and style is 'default'
    lexer = lexer or 'python'
    style = style or 'default'
    defstyles = 'overflow:auto;width:auto;'

    formatter = HtmlFormatter(
        style=style,
        linenos=False,
        noclasses=True,
        cssclass='',
        cssstyles=defstyles + divstyles,
        prestyles='margin: 0'
    )
    html = highlight(code, get_lexer_by_name(lexer, **options), formatter)
    if linenos:
        html = insert_line_numbers(html)
    return html


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
    * `exercise_correction` : <The exercise solution>
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
    exercise_correction_formatted = ""
    if not pro:
        exercise_correction_formatted = "\n".join(problem_metadata['exercise_correction'].split("\n")[:12])
    else:
        exercise_correction_formatted = problem_metadata['exercise_correction']
    #
    # 3)
    exercise_bootcode_formatted = _to_HTML_code(problem_metadata['exercise_bootcode'], 'python', {}, 'default', False, 'padding:.2em .6em;')
    exercise_correction_formatted = _to_HTML_code(exercise_correction_formatted, 'python', {}, 'default', False, 'padding:.2em .6em;')
    #
    # 4)
    if pro:
        ctx_pro = {
            'company_message': problem_metadata['company_message'],
            'company_name': problem_metadata['company_name'],
            'exercise_title': problem_metadata['exercise_title'],
            'exercise_body': exercise_body_formatted,
            'exercise_bootcode': exercise_bootcode_formatted,
            'exercise_correction': exercise_correction_formatted
        }
        htmlpro = get_template('mail-pro.html')
        return htmlpro.render(ctx_pro)

    ctx = {
        'company_message': problem_metadata['company_message'],
        'company_name': problem_metadata['company_name'],
        'exercise_title': problem_metadata['exercise_title'],
        'exercise_body': exercise_body_formatted,
        'exercise_bootcode': exercise_bootcode_formatted,
        'exercise_correction': exercise_correction_formatted,
        'payment_gateway_link': problem_metadata['payment_gateway_link']
    }
    htmlnotpro = get_template('mail-not-pro.html')
    return htmlnotpro.render(ctx)


def generate_payment_token():
    return token_hex(16)


def _convert_to_strings(list_of_strs):
    if isinstance(list_of_strs, (list, tuple)):
        result = COMMASPACE.join(list_of_strs)
    else:
        result = list_of_strs
    return result


def hash_token(hash_algo, token):
    hasher = hashlib.new(hash_algo)
    hasher.update(token)
    return hasher.hexdigest()
