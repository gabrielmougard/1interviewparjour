from django.contrib import admin

from .models import User, Program, Problem
from oneinterviewparjour.mail_scheduler.models import CompanyLogo

admin.site.register(User)
admin.site.register(Program)


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "company":
            kwargs["queryset"] = CompanyLogo.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
