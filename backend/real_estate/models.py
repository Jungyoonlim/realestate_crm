from django.db import models
from django.contrib.auth.models import User 

class Owner(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()

    def __str__(self):
        return self.user.username 

class Property(models.Model):
    PROPERTY_TYPES = (
        ('HOUSE', 'House'),
        ('APARTMENT', 'Apartment'),
        ('OFFICE', 'Office Building'),
        ('RETAIL', 'Retail Space'),
    )
    owner = models.ForeignKey(Owner, on_delete=models.SET_NULL, related_name='properties', null=True, blank=True)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES, null=True, blank=True)  # Changed this line
    address = models.TextField()
    size_in_pyeong = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_in_won = models.DecimalField(max_digits=15, decimal_places=0, null=True, blank=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_property_type_display() or 'Unspecified'} at {self.address}"
    
class Customer(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    interested_property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True, related_name='interested_customers')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name 

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True) 

    def __str__(self): 
        return f"Message from {self.receiver} to {self.sender}"

class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    active = models.BooleanField(default=False)
    subscription_type = models.CharField(max_length=20, default='free')
    expiration_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s subscription"

