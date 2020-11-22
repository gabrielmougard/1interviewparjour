from django.contrib import admin

from .models import User, Program, Problem, Company, ProgramHistory, BuyingHash, SupportedLanguage, Topic, PlanningEvent

admin.site.register(User)
admin.site.register(Program)
admin.site.register(Company)
admin.site.register(ProgramHistory)
admin.site.register(BuyingHash)
admin.site.register(SupportedLanguage)
admin.site.register(Topic)
admin.site.register(PlanningEvent)

@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "company":
            kwargs["queryset"] = Company.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
