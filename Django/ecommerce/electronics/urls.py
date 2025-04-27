from django.urls import path
from . import views

urlpatterns = [

    path('', views.electronic_display,name='electronic_display'),
    path('add/', views.electronic_add, name='electronic_add'),
    path('<int:pk>/edit/', views.electronic_edit, name='electronic_edit'),
    path('<int:pk>/delete/', views.electronic_delete, name='electronic_delete'),
]