from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Property, Tenant, Message, Subscription
from .serializers import PropertySerializer, TenantSerializer, MessageSerializer, SubscriptionSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    @action(detail=False, methods=['GET'])
    def my_properties(self, request):
        properties = Property.objects.filter(owner=request.user)
        serializer = self.get_serializer(properties, many=True)
        return Response(serializer.data)

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    @action(detail=False, methods=['GET'])
    def my_messages(self, request):
        messages = Message.objects.filter(sender=request.user) | Message.objects.filter(receiver=request.user)
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    @action(detail=False, methods=['POST'])
    def create_checkout_session(self, request):
        # Implement Stripe checkout session creation here
        pass