from django.urls import path
import page.views

urlpatterns = [
    path('', page.views.index),
]
