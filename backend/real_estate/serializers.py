from rest_framework import serializers
from .models import Owner, Property, Tenant

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id', 'user', 'phone_number', 'address']

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            'id',
            'title',
            'property_type',
            'transaction_type',
            'address',
            'dong',
            'district',
            'city',
            'price_in_won',
            'deposit_in_won',
            'monthly_rent_in_won',
            'maintenance_fee',
            'size_m2',
            'size_pyeong',
            'rooms',
            'bathrooms',
            'floor',
            'total_floors',
            'building_name',
            'building_year',
            'description',
            'status',
            'created_at',
            'updated_at'
        ]

class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ['id', 'name', 'phone_number', 'email', 'interested_property', 'notes', 'created_at', 'updated_at']

class MessageSerializer():
    pass

class SubscriptionSerializer():
    pass 