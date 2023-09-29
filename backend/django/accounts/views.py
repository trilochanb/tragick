from rest_framework import generics, mixins, exceptions,permissions
from rest_framework.response import Response
from .serializers import VendorDetailSerializer
from .models import Vendor
from utils.pagination import CustomPagination
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import  MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import json


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = Vendor.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
class UserGenericAPIView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Vendor.objects.all()
    serializer_class = VendorDetailSerializer
    pagination_class = CustomPagination
    permission_classes=(permissions.IsAuthenticated,)

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

    def put(self, request, pk=None):
        return Response({
            'data': self.partial_update(request, pk).data
        })

    def delete(self, request, pk=None):
        return self.destroy(request, pk)

