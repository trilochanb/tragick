from .models import Product, ProductInstance, Acknowledgement, ProductBatch
from rest_framework import serializers
from utils.blockchain.endpoints import createNFT
from accounts.models import Vendor

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
                "id",
                "owner",
                "name",
                "token_id",
                "supply_key",
                "created_at"
                )


    def create(self, validated_data):
        default_data = self.context['request'].data
        owner_id = default_data.get('owner', None)
        owner = Vendor.objects.get(id=owner_id)
        private_key = owner.private_key
        account_id = owner.account_id
        nft = createNFT(validated_data['name'],
                        validated_data['name'].upper(),
                        account_id,
                        private_key
                        )
        product = Product.objects.create(
            owner=validated_data['owner'],
            name=validated_data['name'],
            token_id=nft['token_id'],
            supply_key=nft['supply_key']
        )
        product.save()
        return product

class ProductInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInstance
        fields = (
                "id",
                "owner",
                "batch",
                "price",
                "serial_no",
                "created_at"
                )

class AcknowledgementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acknowledgement
        fields = (
                "id",
                "instance",
                "owner",
                "created_at"
                )


class ProductBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductBatch
        fields = (
                "id",
                "product",
                "quantity",
                "price"
                )

    def create(self, validated_data):
        request_data = self.context['request'].data
        product_id = request_data.get('product', None)

        if product_id is None:
            raise serializers.ValidationError("Product ID is required.")

        try:
            product_inst = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product not found.")

        product_batch = ProductBatch(
            product=product_inst,
            quantity=validated_data['quantity'],
            price=validated_data['price']
        )

        product_batch.save()
        return product_batch
