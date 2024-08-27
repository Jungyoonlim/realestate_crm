from rest_framework import serializers
from .models import Owner, Property, Customer

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id', 'user', 'phone_number', 'address']

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'owner', 'property_type', 'address', 'size_in_pyeong', 'price_in_won', 'description', 'created_at', 'updated_at']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'phone_number', 'email', 'interested_property', 'notes', 'created_at', 'updated_at']

