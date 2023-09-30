import uuid
from django.db import models
from accounts.models import Vendor

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(Vendor, max_length=100, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    token_id = models.CharField(max_length=512, null=True)
    supply_key = models.CharField(max_length=512, null=True)


class ProductBatch(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.IntegerField(default=0)

class ProductInstance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    batch = models.ForeignKey(ProductBatch, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    serial_no = models.CharField(default=-1, max_length=100)
    price = models.IntegerField(default=0)

class Acknowledgement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    instance = models.ForeignKey(ProductInstance, on_delete=models.CASCADE)
    owner = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

