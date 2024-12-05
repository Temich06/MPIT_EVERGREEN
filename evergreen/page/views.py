from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'page/index.html')


def main(request):
    return render(request, 'page/main.html')

def library(request):
    return render(request, 'page/library.html')

def olonho(request):
    return render(request, 'page/olonho.html')
