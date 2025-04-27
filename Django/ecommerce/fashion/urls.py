from django.urls import path
from . import views

urlpatterns = [

    path('', views.fashion_display,name='fashion_display'),
    path('add/', views.fashion_add, name='fashion_add'),
    path('<int:pk>/edit/', views.fashion_edit, name='fashion_edit'),
    path('<int:pk>/delete/', views.fashion_delete, name='fashion_delete'),
]