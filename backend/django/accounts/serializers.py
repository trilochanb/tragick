from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Vendor
from utils.blockchain.endpoints import createAccount, getBalance
import uuid
import requests


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['vendor_name'] = user.vendor_name
        token['balance'] = user.balance
        print(token)

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Vendor
        fields = ('id', 'username', 'email', 'password', 'password2', 'first_name', 'last_name', 'vendor_name', 'location_lat', 'location_long')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        account = createAccount()
        balance = getBalance(account['account_id'])
        user = Vendor.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            vendor_name=validated_data['vendor_name'],
            location_lat=validated_data['location_lat'],
            location_long=validated_data['location_long'],
            account_id=account['account_id'],
            public_key=account['public_key'],
            private_key=account['private_key'],
            balance=balance
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ('id', 'first_name', 'email', 'last_name', 'vendor_name', 'location_lat', 'location_long', 'balance')
