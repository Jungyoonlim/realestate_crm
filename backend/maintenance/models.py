from django.db import models
from real_estate.models import Property, User

class MaintenanceRequest(models.Model):
    REQUEST_TYPES = (
        ('ONGOING', 'ongoing'),
        ('PENDING', 'pending'),
        ('COMPLETED', 'completed'),
    )
    property = models.ForeignKey()
    tenant = models.



    def __str__(self): pass

    class Meta: pass 



