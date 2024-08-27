from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OwnerViewSet, PropertyViewSet, CustomerViewSet, MessageViewSet, SubscriptionViewSet

router = DefaultRouter()
router.register(r'owners', OwnerViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'subscriptions', SubscriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]