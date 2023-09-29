from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser


class Vendor(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=80, null=False, blank=False)
    first_name = models.CharField(max_length=80, null=False, blank=False)
    last_name = models.CharField(max_length=80, null=False, blank=False)
    vendor_name = models.CharField(max_length=80, null=False, blank=False)
    location_lat = models.DecimalField(max_digits=20, decimal_places=16, null=False, blank=False)
    location_long = models.DecimalField(max_digits=20, decimal_places=16, null=False, blank=False)
    account_id = models.CharField(max_length=100, null=False, blank=False)
    public_key = models.CharField(max_length=512, null=False, blank=False)
    private_key = models.CharField(max_length=512, null=False, blank=False)
    balance = models.IntegerField(default=0, null=False)

    def __str__(self):
        return self.vendor_name

