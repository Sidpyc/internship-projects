from django.urls import path
from . import views

urlpatterns = [

    path('', views.grocery_display,name='grocery_display'),
    path('add/', views.grocery_add, name='grocery_add'),
    path('<int:pk>/edit/', views.grocery_edit, name='grocery_edit'),
    path('<int:pk>/delete/', views.grocery_delete, name='grocery_delete'),
]