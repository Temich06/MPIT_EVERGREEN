from django.urls import path, include
import game.views


urlpatterns = [
    path('', game.views.gameIndex),
]
