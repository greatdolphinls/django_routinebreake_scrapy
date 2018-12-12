from django.shortcuts import render,render_to_response,HttpResponse
import os


def index(request):
    return render_to_response("pages/home.html")

# Create your views here.
