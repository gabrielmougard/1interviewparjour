from oneinterviewparjour.observability.metrics import model_inserts_gauge, model_updates_gauge


def ExportModelOperationsMixin(model_name):
    """
    Returns a mixin for models to export counters for lifecycle operations.

    Usage :
        class User(ExportModelOperationsMixin('user'), models.Model)
            ...
    """
    model_inserts_gauge.labels(model_name)
    model_updates_gauge.labels(model_name)

    class Mixin:
        def _do_insert(self, *args, **kwargs):
            model_inserts_gauge.labels(model_name).inc()
            return super()._do_insert(*args, **kwargs)


        def _do_update(self, *args, **kwargs):
            model_updates_gauge.labels(model_name).inc()
            return super()._do_insert(*args, **kwargs)


        def delete(self, *args, **kwargs):
            model_inserts_gauge.labels(model_name).dec()
            return super().delete(*args, **kwargs)

    return Mixin
