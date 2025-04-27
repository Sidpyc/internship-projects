from django.urls import path
from . import views

urlpatterns = [
    path('homepost/', views.homepost, name='homepost'),
    path('posts/', views.AddViewPost.as_view(), name='post-list-create'),
    path('myposts/', views.ListViewMyPost.as_view(), name='my-posts'),
    path('myposts/deletepost/<int:pk>/', views.DeleteViewPost.as_view(), name='delete-my-post'),
    path('newposts/<str:username>/', views.UserPostsView.as_view(), name='posts-by-user'),

    path('posts/<int:pk>/toggle-like/', views.ToggleLikeView.as_view(), name='toggle-like'),
]
 