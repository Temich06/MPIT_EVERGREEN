from django.shortcuts import render


# Create your views here.
def gameIndex(request):
    return render(request, 'game/index.html')