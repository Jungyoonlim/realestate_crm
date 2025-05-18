from django.contrib import admin
from .models import Property, Owner, Tenant, Message, Subscription

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('property_type', 'address', 'size_pyeong', 'price_in_won', 'status')
    list_filter = ('property_type', 'transaction_type', 'status')
    search_fields = ('address', 'description', 'title')

@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'address')
    search_fields = ('user__username', 'phone_number', 'address')

@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number', 'email', 'interested_property')
    list_filter = ('interested_property',)
    search_fields = ('name', 'phone_number', 'email')

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'timestamp')
    list_filter = ('sender', 'receiver')
    search_fields = ('content',)

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'active', 'subscription_type', 'expiration_date')
    list_filter = ('active', 'subscription_type')
    search_fields = ('user__username', 'stripe_customer_id')