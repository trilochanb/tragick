from django.urls import path
from accounts.views import UserGenericAPIView, MyTokenObtainPairView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView
from products.views import ProductGenericAPIView, ProductInstanceGenericAPIView, AcknowledgementGenericAPIView, \
    ProductBatchGenericAPIView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path("products/", ProductGenericAPIView.as_view()),
    path("products/<str:pk>", ProductGenericAPIView.as_view()),
    path("instances/", ProductInstanceGenericAPIView.as_view()),
    path("instances/<str:pk>", ProductInstanceGenericAPIView.as_view()),
    path("batches/", ProductBatchGenericAPIView.as_view()),
    path("batches/<str:pk>", ProductBatchGenericAPIView.as_view()),
    path("acknowledgements/", AcknowledgementGenericAPIView.as_view()),
    path("acknowledgements/<str:pk>", AcknowledgementGenericAPIView.as_view()),
    path("users/", UserGenericAPIView.as_view()),
    path("users/<str:pk>", UserGenericAPIView.as_view()),
]
