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

    TRANSACTION_TYPES = [
        ('SALE', '매매'),
        ('JEONSE', '전세'),
        ('MONTHLY', '월세'),
    ]

    STATUS_CHOICES = [
        ('AVAILABLE', '매물'),
        ('PENDING', '계약중'),
        ('SOLD', '거래완료'),
    ]


    title = models.CharField(max_length=200)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    address = models.CharField(max_length=255)
    dong = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    price_in_won = models.BigIntegerField()
    deposit_in_won = models.BigIntegerField(null=True, blank=True)
    monthly_rent_in_won = models.IntegerField(null=True, blank=True)
    maintenance_fee = models.IntegerField(null=True, blank=True)
    size_m2 = models.DecimalField(max_digits=10, decimal_places=2)
    size_pyeong = models.DecimalField(max_digits=10, decimal_places=2)
    rooms = models.IntegerField()
    bathrooms = models.IntegerField()
    floor = models.IntegerField()
    total_floors = models.IntegerField()
    building_name = models.CharField(max_length=100, blank=True)
    building_year = models.IntegerField()
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='AVAILABLE')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_property_type_display() or 'Unspecified'} at {self.address}"
    
class Tenant(models.Model):
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

