# Generated by Django 3.1 on 2020-11-08 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20201001_0743'),
    ]

    operations = [
        migrations.CreateModel(
            name='SupportedLanguage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language', models.CharField(choices=[('abap', 'ABAP'), ('apl', 'APL'), ('abnf', 'ABNF'), ('as3', 'ActionScript 3'), ('as', 'ActionScript'), ('ada', 'Ada'), ('adl', 'ADL'), ('agda', 'Agda'), ('aheui', 'Aheui'), ('alloy', 'Alloy'), ('at', 'AmbientTalk'), ('ampl', 'Ampl'), ('html+ng2', 'HTML + Angular2'), ('ng2', 'Angular2'), ('antlr-as', 'ANTLR With ActionScript Target'), ('antlr-csharp', 'ANTLR With C# Target'), ('antlr-cpp', 'ANTLR With CPP Target'), ('antlr-java', 'ANTLR With Java Target'), ('antlr', 'ANTLR'), ('antlr-objc', 'ANTLR With ObjectiveC Target'), ('antlr-perl', 'ANTLR With Perl Target'), ('antlr-python', 'ANTLR With Python Target'), ('antlr-ruby', 'ANTLR With Ruby Target'), ('apacheconf', 'ApacheConf'), ('applescript', 'AppleScript'), ('arduino', 'Arduino'), ('aspectj', 'AspectJ'), ('asy', 'Asymptote'), ('augeas', 'Augeas'), ('autoit', 'AutoIt'), ('ahk', 'autohotkey'), ('awk', 'Awk'), ('bbcbasic', 'BBC Basic'), ('bbcode', 'BBCode'), ('bc', 'BC'), ('bst', 'BST'), ('basemake', 'Base Makefile'), ('bash', 'Bash'), ('console', 'Bash Session'), ('bat', 'Batchfile'), ('befunge', 'Befunge'), ('bib', 'BibTeX'), ('blitzbasic', 'BlitzBasic'), ('blitzmax', 'BlitzMax'), ('bnf', 'BNF'), ('boa', 'Boa'), ('boo', 'Boo'), ('boogie', 'Boogie'), ('brainfuck', 'Brainfuck'), ('bugs', 'BUGS'), ('camkes', 'CAmkES'), ('c', 'C'), ('cmake', 'CMake'), ('c-objdump', 'c-objdump'), ('cpsa', 'CPSA'), ('aspx-cs', 'aspx-cs'), ('csharp', 'C#'), ('ca65', 'ca65 assembler'), ('cadl', 'cADL'), ('capdl', 'CapDL'), ('capnp', "Cap'n Proto"), ('cbmbas', 'CBM BASIC V2'), ('ceylon', 'Ceylon'), ('cfengine3', 'CFEngine3'), ('chai', 'ChaiScript'), ('chapel', 'Chapel'), ('charmci', 'Charmci'), ('html+cheetah', 'HTML+Cheetah'), ('js+cheetah', 'JavaScript+Cheetah'), ('cheetah', 'Cheetah'), ('xml+cheetah', 'XML+Cheetah'), ('cirru', 'Cirru'), ('clay', 'Clay'), ('clean', 'Clean'), ('clojure', 'Clojure'), ('clojurescript', 'ClojureScript'), ('cobolfree', 'COBOLFree'), ('cobol', 'COBOL'), ('coffee-script', 'CoffeeScript'), ('cfc', 'Coldfusion CFC'), ('cfm', 'Coldfusion HTML'), ('cfs', 'cfstatement'), ('common-lisp', 'Common Lisp'), ('componentpascal', 'Component Pascal'), ('coq', 'Coq'), ('cpp', 'C++'), ('cpp-objdump', 'cpp-objdump'), ('crmsh', 'Crmsh'), ('croc', 'Croc'), ('cryptol', 'Cryptol'), ('cr', 'Crystal'), ('csound-document', 'Csound Document'), ('csound', 'Csound Orchestra'), ('csound-score', 'Csound Score'), ('css+django', 'CSS+Django/Jinja'), ('css+erb', 'CSS+Ruby'), ('css+genshitext', 'CSS+Genshi Text'), ('css', 'CSS'), ('css+php', 'CSS+PHP'), ('css+smarty', 'CSS+Smarty'), ('cuda', 'CUDA'), ('cypher', 'Cypher'), ('cython', 'Cython'), ('d', 'D'), ('d-objdump', 'd-objdump'), ('dpatch', 'Darcs Patch'), ('dart', 'Dart'), ('dasm16', 'DASM16'), ('control', 'Debian Control file'), ('delphi', 'Delphi'), ('dg', 'dg'), ('diff', 'Diff'), ('django', 'Django/Jinja'), ('docker', 'Docker'), ('dtd', 'DTD'), ('duel', 'Duel'), ('dylan-console', 'Dylan session'), ('dylan', 'Dylan'), ('dylan-lid', 'DylanLID'), ('ecl', 'ECL'), ('ec', 'eC'), ('earl-grey', 'Earl Grey'), ('easytrieve', 'Easytrieve'), ('ebnf', 'EBNF'), ('eiffel', 'Eiffel'), ('iex', 'Elixir iex session'), ('elixir', 'Elixir'), ('elm', 'Elm'), ('emacs', 'EmacsLisp'), ('email', 'E-mail'), ('erb', 'ERB'), ('erlang', 'Erlang'), ('erl', 'Erlang erl session'), ('html+evoque', 'HTML+Evoque'), ('evoque', 'Evoque'), ('xml+evoque', 'XML+Evoque'), ('ezhil', 'Ezhil'), ('fsharp', 'F#'), ('factor', 'Factor'), ('fancy', 'Fancy'), ('fan', 'Fantom'), ('felix', 'Felix'), ('fennel', 'Fennel'), ('fish', 'Fish'), ('flatline', 'Flatline'), ('floscript', 'FloScript'), ('forth', 'Forth'), ('fortranfixed', 'FortranFixed'), ('fortran', 'Fortran'), ('foxpro', 'FoxPro'), ('freefem', 'Freefem'), ('gap', 'GAP'), ('glsl', 'GLSL'), ('gas', 'GAS'), ('genshi', 'Genshi'), ('genshitext', 'Genshi Text'), ('pot', 'Gettext Catalog'), ('cucumber', 'Gherkin'), ('gnuplot', 'Gnuplot'), ('go', 'Go'), ('golo', 'Golo'), ('gooddata-cl', 'GoodData-CL'), ('gosu', 'Gosu'), ('gst', 'Gosu Template'), ('groff', 'Groff'), ('groovy', 'Groovy'), ('hlsl', 'HLSL'), ('haml', 'Haml'), ('html+handlebars', 'HTML+Handlebars'), ('handlebars', 'Handlebars'), ('haskell', 'Haskell'), ('hx', 'Haxe'), ('hexdump', 'Hexdump'), ('hsail', 'HSAIL'), ('hspec', 'Hspec'), ('html+django', 'HTML+Django/Jinja'), ('html+genshi', 'HTML+Genshi'), ('html', 'HTML'), ('html+php', 'HTML+PHP'), ('html+smarty', 'HTML+Smarty'), ('http', 'HTTP'), ('haxeml', 'Hxml'), ('hylang', 'Hy'), ('hybris', 'Hybris'), ('idl', 'IDL'), ('icon', 'Icon'), ('idris', 'Idris'), ('igor', 'Igor'), ('inform6', 'Inform 6'), ('i6t', 'Inform 6 template'), ('inform7', 'Inform 7'), ('ini', 'INI'), ('io', 'Io'), ('ioke', 'Ioke'), ('irc', 'IRC logs'), ('isabelle', 'Isabelle'), ('j', 'J'), ('jags', 'JAGS'), ('jasmin', 'Jasmin'), ('java', 'Java'), ('js+django', 'JavaScript+Django/Jinja'), ('js+erb', 'JavaScript+Ruby'), ('js+genshitext', 'JavaScript+Genshi Text'), ('js', 'JavaScript'), ('js+php', 'JavaScript+PHP'), ('js+smarty', 'JavaScript+Smarty'), ('jcl', 'JCL'), ('jsgf', 'JSGF'), ('json-object', 'JSONBareObject'), ('jsonld', 'JSON-LD'), ('json', 'JSON'), ('jsp', 'Java Server Page'), ('jlcon', 'Julia console'), ('julia', 'Julia'), ('juttle', 'Juttle'), ('kal', 'Kal'), ('kconfig', 'Kconfig'), ('kmsg', 'Kernel log'), ('koka', 'Koka'), ('kotlin', 'Kotlin'), ('lsl', 'LSL'), ('css+lasso', 'CSS+Lasso'), ('html+lasso', 'HTML+Lasso'), ('js+lasso', 'JavaScript+Lasso'), ('lasso', 'Lasso'), ('xml+lasso', 'XML+Lasso'), ('lean', 'Lean'), ('less', 'LessCss'), ('lighty', 'Lighttpd configuration file'), ('limbo', 'Limbo'), ('liquid', 'liquid'), ('lagda', 'Literate Agda'), ('lcry', 'Literate Cryptol'), ('lhs', 'Literate Haskell'), ('lidr', 'Literate Idris'), ('live-script', 'LiveScript'), ('llvm', 'LLVM'), ('llvm-mir-body', 'LLVM-MIR Body'), ('llvm-mir', 'LLVM-MIR'), ('logos', 'Logos'), ('logtalk', 'Logtalk'), ('lua', 'Lua'), ('mime', 'MIME'), ('moocode', 'MOOCode'), ('doscon', 'MSDOS Session'), ('make', 'Makefile'), ('css+mako', 'CSS+Mako'), ('html+mako', 'HTML+Mako'), ('js+mako', 'JavaScript+Mako'), ('mako', 'Mako'), ('xml+mako', 'XML+Mako'), ('maql', 'MAQL'), ('md', 'markdown'), ('mask', 'Mask'), ('mason', 'Mason'), ('mathematica', 'Mathematica'), ('matlab', 'Matlab'), ('matlabsession', 'Matlab session'), ('minid', 'MiniD'), ('ms', 'MiniScript'), ('modelica', 'Modelica'), ('modula2', 'Modula-2'), ('trac-wiki', 'MoinMoin/Trac Wiki markup'), ('monkey', 'Monkey'), ('monte', 'Monte'), ('moon', 'MoonScript'), ('mosel', 'Mosel'), ('css+mozpreproc', 'CSS+mozpreproc'), ('mozhashpreproc', 'mozhashpreproc'), ('javascript+mozpreproc', 'Javascript+mozpreproc'), ('mozpercentpreproc', 'mozpercentpreproc'), ('xul+mozpreproc', 'XUL+mozpreproc'), ('mql', 'MQL'), ('mscgen', 'Mscgen'), ('mupad', 'MuPAD'), ('mxml', 'MXML'), ('mysql', 'MySQL'), ('css+myghty', 'CSS+Myghty'), ('html+myghty', 'HTML+Myghty'), ('js+myghty', 'JavaScript+Myghty'), ('myghty', 'Myghty'), ('xml+myghty', 'XML+Myghty'), ('ncl', 'NCL'), ('nsis', 'NSIS'), ('nasm', 'NASM'), ('objdump-nasm', 'objdump-nasm'), ('nemerle', 'Nemerle'), ('nesc', 'nesC'), ('newlisp', 'NewLisp'), ('newspeak', 'Newspeak'), ('nginx', 'Nginx configuration file'), ('nim', 'Nimrod'), ('nit', 'Nit'), ('nixos', 'Nix'), ('notmuch', 'Notmuch'), ('nusmv', 'NuSMV'), ('numpy', 'NumPy'), ('objdump', 'objdump'), ('objective-c', 'Objective-C'), ('objective-c++', 'Objective-C++'), ('objective-j', 'Objective-J'), ('ocaml', 'OCaml'), ('octave', 'Octave'), ('odin', 'ODIN'), ('ooc', 'Ooc'), ('opa', 'Opa'), ('openedge', 'OpenEdge ABL'), ('pacmanconf', 'PacmanConf'), ('pan', 'Pan'), ('parasail', 'ParaSail'), ('pawn', 'Pawn'), ('peg', 'PEG'), ('perl6', 'Perl6'), ('perl', 'Perl'), ('php', 'PHP'), ('pig', 'Pig'), ('pike', 'Pike'), ('pkgconfig', 'PkgConfig'), ('plpgsql', 'PL/pgSQL'), ('pony', 'Pony'), ('postscript', 'PostScript'), ('psql', 'PostgreSQL console (psql)'), ('postgresql', 'PostgreSQL SQL dialect'), ('pov', 'POVRay'), ('powershell', 'PowerShell'), ('ps1con', 'PowerShell Session'), ('praat', 'Praat'), ('prolog', 'Prolog'), ('properties', 'Properties'), ('protobuf', 'Protocol Buffer'), ('pug', 'Pug'), ('puppet', 'Puppet'), ('pypylog', 'PyPy Log'), ('python2', 'Python 2.x'), ('py2tb', 'Python 2.x Traceback'), ('pycon', 'Python console session'), ('python', 'Python'), ('pytb', 'Python Traceback'), ('qbasic', 'QBasic'), ('qvto', 'QVTO'), ('qml', 'QML'), ('rconsole', 'RConsole'), ('rnc', 'Relax-NG Compact'), ('spec', 'RPMSpec'), ('racket', 'Racket'), ('ragel-c', 'Ragel in C Host'), ('ragel-cpp', 'Ragel in CPP Host'), ('ragel-d', 'Ragel in D Host'), ('ragel-em', 'Embedded Ragel'), ('ragel-java', 'Ragel in Java Host'), ('ragel', 'Ragel'), ('ragel-objc', 'Ragel in Objective C Host'), ('ragel-ruby', 'Ragel in Ruby Host'), ('raw', 'Raw token data'), ('rd', 'Rd'), ('reason', 'ReasonML'), ('rebol', 'REBOL'), ('red', 'Red'), ('redcode', 'Redcode'), ('registry', 'reg'), ('resource', 'ResourceBundle'), ('rexx', 'Rexx'), ('rhtml', 'RHTML'), ('ride', 'Ride'), ('roboconf-graph', 'Roboconf Graph'), ('roboconf-instances', 'Roboconf Instances'), ('robotframework', 'RobotFramework'), ('rql', 'RQL'), ('rsl', 'RSL'), ('rst', 'reStructuredText'), ('rts', 'TrafficScript'), ('rbcon', 'Ruby irb session'), ('rb', 'Ruby'), ('rust', 'Rust'), ('sas', 'SAS'), ('splus', 'S'), ('sml', 'Standard ML'), ('sarl', 'SARL'), ('sass', 'Sass'), ('scala', 'Scala'), ('scaml', 'Scaml'), ('scdoc', 'scdoc'), ('scheme', 'Scheme'), ('scilab', 'Scilab'), ('scss', 'SCSS'), ('shexc', 'ShExC'), ('shen', 'Shen'), ('sieve', 'Sieve'), ('silver', 'Silver'), ('slash', 'Slash'), ('slim', 'Slim'), ('slurm', 'Slurm'), ('smali', 'Smali'), ('smalltalk', 'Smalltalk'), ('sgf', 'SmartGameFormat'), ('smarty', 'Smarty'), ('snobol', 'Snobol'), ('snowball', 'Snowball'), ('solidity', 'Solidity'), ('sp', 'SourcePawn'), ('sourceslist', 'Debian Sourcelist'), ('sparql', 'SPARQL'), ('sql', 'SQL'), ('sqlite3', 'sqlite3con'), ('squidconf', 'SquidConf'), ('ssp', 'Scalate Server Page'), ('stan', 'Stan'), ('stata', 'Stata'), ('sc', 'SuperCollider'), ('swift', 'Swift'), ('swig', 'SWIG'), ('systemverilog', 'systemverilog'), ('tap', 'TAP'), ('toml', 'TOML'), ('tads3', 'TADS 3'), ('tasm', 'TASM'), ('tcl', 'Tcl'), ('tcsh', 'Tcsh'), ('tcshcon', 'Tcsh Session'), ('tea', 'Tea'), ('ttl', 'Tera Term macro'), ('termcap', 'Termcap'), ('terminfo', 'Terminfo'), ('terraform', 'Terraform'), ('tex', 'TeX'), ('text', 'Text only'), ('thrift', 'Thrift'), ('todotxt', 'Todotxt'), ('tsql', 'Transact-SQL'), ('treetop', 'Treetop'), ('turtle', 'Turtle'), ('html+twig', 'HTML+Twig'), ('twig', 'Twig'), ('ts', 'TypeScript'), ('typoscriptcssdata', 'TypoScriptCssData'), ('typoscripthtmldata', 'TypoScriptHtmlData'), ('typoscript', 'TypoScript'), ('ucode', 'ucode'), ('unicon', 'Unicon'), ('urbiscript', 'UrbiScript'), ('usd', 'USD'), ('vbscript', 'VBScript'), ('vcl', 'VCL'), ('vclsnippets', 'VCLSnippets'), ('vctreestatus', 'VCTreeStatus'), ('vgl', 'VGL'), ('vala', 'Vala'), ('aspx-vb', 'aspx-vb'), ('vb.net', 'VB.net'), ('html+velocity', 'HTML+Velocity'), ('velocity', 'Velocity'), ('xml+velocity', 'XML+Velocity'), ('verilog', 'verilog'), ('vhdl', 'vhdl'), ('vim', 'VimL'), ('wdiff', 'WDiff'), ('webidl', 'Web IDL'), ('whiley', 'Whiley'), ('x10', 'X10'), ('xquery', 'XQuery'), ('xml+django', 'XML+Django/Jinja'), ('xml+erb', 'XML+Ruby'), ('xml', 'XML'), ('xml+php', 'XML+PHP'), ('xml+smarty', 'XML+Smarty'), ('xorg.conf', 'Xorg'), ('xslt', 'XSLT'), ('xtend', 'Xtend'), ('extempore', 'xtlang'), ('yaml+jinja', 'YAML+Jinja'), ('yaml', 'YAML'), ('zeek', 'Zeek'), ('zephir', 'Zephir'), ('zig', 'Zig')], default='Python', max_length=100)),
                ('description', models.TextField(default='')),
            ],
        ),
    ]
