import uuid

from rest_framework import generics, mixins, exceptions, permissions, status
from rest_framework.response import Response
from .serializers import (ProductSerializer, ProductInstanceSerializer, AcknowledgementSerializer,
                          ProductBatchSerializer)
from .models import Product, ProductInstance, Acknowledgement, ProductBatch
from utils.pagination import CustomPagination
from accounts.models import Vendor
from utils.blockchain.endpoints import mintNFT, associateNFT, transferNFT, transferBalance, getBalance
from .permissions import IsProductOwnerPermission, IsInstanceOwnerPermission, ObjectLevelPermissionMixin


class ProductGenericAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                            mixins.CreateModelMixin,
                            mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    permission_classes = (IsProductOwnerPermission, IsInstanceOwnerPermission)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomPagination

    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request, pk)

        queryset = self.queryset
        user = request.user
        queryset = queryset.filter(owner=user)
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        if serializer:
            return Response({'data': serializer.data})

    def post(self, request):
        return Response({
            'data': self.create(request).data
        })

    def put(self, request, pk=None):
        return Response({
            'data': self.partial_update(request, pk).data
        })

    def delete(self, request, pk=None):
        return self.destroy(request, pk)


class ProductInstanceGenericAPIView(ObjectLevelPermissionMixin, generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                                    mixins.CreateModelMixin,
                                    mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    permission_classes = (permissions.IsAuthenticated, IsProductOwnerPermission)
    queryset = ProductInstance.objects.all()
    serializer_class = ProductInstanceSerializer
    pagination_class = CustomPagination

    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request, pk)

        queryset = self.queryset
        user = request.user
        queryset = queryset.filter(owner=user)
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        if serializer:
            return Response({'data': serializer.data})

    def post(self, request):
        return Response({
            'data': self.create(request).data
        })

    def put(self, request, pk=None):
        return Response({
            'data': self.partial_update(request, pk).data
        })

    def delete(self, request, pk=None):
        return self.destroy(request, pk)


class AcknowledgementGenericAPIView(ObjectLevelPermissionMixin, generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                                    mixins.CreateModelMixin,
                                    mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = Acknowledgement.objects.all()
    serializer_class = AcknowledgementSerializer
    pagination_class = CustomPagination
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request, pk)

        queryset = self.queryset
        user = request.user
        queryset = queryset.filter(owner=user)
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        if serializer:
            return Response({'data': serializer.data})

    def post(self, request):
        vendor_id = request.data.get('owner', None)
        vendor = Vendor.objects.get(id=vendor_id)
        instance_id = request.data.get('instance', None)
        print(instance_id)
        print(vendor_id)
        instance = ProductInstance.objects.get(id=instance_id)
        owner = Vendor.objects.get(id=instance.owner_id)
        batch = ProductBatch.objects.get(id=instance.batch_id)
        product = Product.objects.get(id=batch.product_id)

        if ((getBalance(vendor.account_id) >= instance.price) and (vendor.id != owner.id)) :
            associateNFT(product.token_id, vendor.account_id, vendor.private_key)
            transferNFT(owner.account_id, owner.private_key, product.token_id, instance.serial_no, vendor.account_id)
            transferBalance(vendor.account_id, vendor.private_key, owner.account_id, instance.price)

            vendor.balance = getBalance(vendor.account_id)
            owner.balance = getBalance(owner.account_id)
            instance.owner = vendor
            instance.save()
            vendor.save()
            owner.save()

            return Response({
                'data': self.create(request).data
            })

        return Response({
            'data': "Transfer failed"
        })

    def put(self, request, pk=None):
        return Response({
            'data': self.partial_update(request, pk).data
        })

    def delete(self, request, pk=None):
        return self.destroy(request, pk)


class ProductBatchGenericAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                                 mixins.CreateModelMixin,
                                 mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = ProductBatch.objects.all()
    serializer_class = ProductBatchSerializer
    pagination_class = CustomPagination
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request, pk)

        queryset = self.queryset
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        if serializer:
            return Response({'data': serializer.data})

    def post(self, request):
        batch = self.create(request).data
        response = create_instances(batch)
        return Response({
            'data': response
        })

    def put(self, request, pk=None):
        return Response({
            'data': self.partial_update(request, pk).data
        })

    def delete(self, request, pk=None):
        return self.destroy(request, pk)

def create_instances(batch):
    product_id = batch['product']
    quantity = int(batch['quantity'])
    instances = []

    for i in range(quantity):
        product = Product.objects.get(id=product_id)
        token_id = product.token_id
        supply_key = product.supply_key
        instance_id = str(uuid.uuid4())
        mint = mintNFT(token_id, supply_key, instance_id)
        instance = {
            'id': instance_id,
            'owner' : product.owner_id,
            'batch': batch['id'],
            'serial_no': mint['serial_no'],
            'price': batch['price'],
        }
        serializer = ProductInstanceSerializer(data=instance)

        if serializer.is_valid():
            serializer.save()
            instances.append(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return {'instances': instances}

