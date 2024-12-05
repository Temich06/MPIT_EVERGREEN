from django.urls import path
import page.views

urlpatterns = [
    path('', page.views.main),
    path('index', page.views.index),
    path('library', page.views.library),
    path('olonho', page.views.olonho),
]
