from django.urls import path    
from .import views
from rest_framework_simplejwt.views import (
 TokenObtainPairView,
 TokenRefreshView, TokenVerifyView,
)

from rest_framework_simplejwt.views import TokenObtainPairView;




urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('', views.home_view, name='home'),

    path('api/signup/', views.RegisterView.as_view(), name='signup'),
    # path('api/login/', views.LoginView.as_view(), name='api-login'),

    path('api/dashboard/', views.DashboardView.as_view(), name='protected_view'),

    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
# urls.py


    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),


     


    path('newusers/<str:username>', views.UserProfileView.as_view(), name='posts-by-user'),

    path('profiles/', views.UserProfileList.as_view(), name='profile-list'),
    path('profiles/update/', views.UserProfileDetail.as_view(), name='profile-detail'),
    # path('profiles/follow-unfollow/', views.FollowUnfollowUser.as_view(), name='follow-unfollow-user'),

    path('login-session/', views.LoginView.as_view(), name='login-session'),

    path('follow/', views.FollowCreateView.as_view(), name='follow-create'),
    path('follow/list/', views.FollowListView.as_view(), name='follow-list'),
    path('follow/<int:followed_id>/', views.FollowDetailView.as_view(), name='follow-detail'),
    path('follow/stats/', views.UserFollowStatsView.as_view(), name='follow-stats'),

]