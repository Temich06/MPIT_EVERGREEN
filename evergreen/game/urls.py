from django.urls import path
import game.views


urlpatterns = [
    path('', game.views.gameIndex),
]
