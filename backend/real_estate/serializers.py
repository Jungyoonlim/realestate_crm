from rest_framework import serializers
from .models import Owner, Property, Tenant

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id', 'user', 'phone_number', 'address']

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'property_type', 'address', 'size_in_pyeong', 'price_in_won', 'description', 'created_at', 'updated_at', 'owner']

class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ['id', 'name', 'phone_number', 'email', 'interested_property', 'notes', 'created_at', 'updated_at']

class MessageSerializer():
    pass

class SubscriptionSerializer():
    pass 