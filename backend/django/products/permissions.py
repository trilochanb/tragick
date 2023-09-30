from rest_framework import permissions
from products.models import ProductBatch, ProductInstance

class IsProductOwnerPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            print(request.user)
            return obj.owner == request.user


class IsInstanceOwnerPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        product_id = request.data.get('product', None)
        query = ProductBatch.objects.filter(product_id=product_id)
        isPermitted = False
        for batch in query:
            if ProductInstance.objects.filter(batch_id=batch.id).filter(owner_id=request.user.id).exists():
                isPermitted = True
                break
        return isPermitted

class ObjectLevelPermissionMixin:
    def get_queryset(self):
        queryset = super().get_queryset()

        return queryset


