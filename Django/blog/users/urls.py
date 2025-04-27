from django.urls import path
from .import views

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('', views.home_view, name='home'),
    path('api/login/',views.LoginAPI.as_view(), name='api-login'),

    path('api/req/', views.LoginAPI.as_view(), name='login-api'),
    path('api/signup/', views.UserSignUpAPIView.as_view(), name='login-api'),
]