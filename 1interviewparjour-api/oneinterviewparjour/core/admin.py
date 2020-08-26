from django.contrib import admin

from .models import User, Program, Problem

admin.site.register(User)
admin.site.register(Program)
admin.site.register(Problem)
