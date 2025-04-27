from django.urls import path
from . import views


urlpatterns=[
    
    path("",views.post,name="post"),
    path("addpost",views.addpost,name="addpost"),
    path("add_post",views.add_post,name="add_post"),
    path("edit_post/<int:pk>/",views.edit_post,name="edit_post"),
    path("delete_post/<int:pk>/",views.delete_post,name="delete_post"),

#apis stuff
    path('api/post/', views.get_postapi, name='get_postapi'),
    path('api/post/add/', views.add_postapi, name='add_postapi'),
    path('api/post/edit/<int:pk>/', views.update_postapi, name='edit_postapi'),
    path('api/post/delete/<int:pk>/', views.delete_postapi, name='delete_postapi'),
]