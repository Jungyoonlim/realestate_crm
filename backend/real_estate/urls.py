from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, TenantViewSet, MessageViewSet, SubscriptionViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'customers', TenantViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'subscriptions', SubscriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]