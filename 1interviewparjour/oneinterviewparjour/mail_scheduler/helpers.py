import re
import hashlib

from secrets import token_hex

from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter


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


def generate_gateway_token():
    return token_hex(16)


def _convert_to_strings(list_of_strs):
    if isinstance(list_of_strs, (list, tuple)):
        result = COMMASPACE.join(list_of_strs)
    else:
        result = list_of_strs
    return result


def hash_token(hash_algo, token):
    hasher = hashlib.new(hash_algo)
    hasher.update(token.encode('utf-8'))
    return hasher.hexdigest()
