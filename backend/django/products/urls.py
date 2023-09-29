from django.urls import path
from .views import ProductGenericAPIView, ProductInstanceGenericAPIView, AcknowledgementGenericAPIView

urlpatterns = [
        path("products/", ProductGenericAPIView.as_view()),
        path("products/<str:pk>", ProductGenericAPIView.as_view()),
        path("instances/", ProductInstanceGenericAPIView.as_view()),
        path("instances/<str:pk>", ProductInstanceGenericAPIView.as_view()),
        path("acknowledgements/", AcknowledgementGenericAPIView.as_view()),
        path("acknowledgements/<str:pk>", AcknowledgementGenericAPIView.as_view()),
        ]
