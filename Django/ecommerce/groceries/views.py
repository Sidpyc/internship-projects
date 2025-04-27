
from django.shortcuts import render, get_object_or_404, redirect
from .models import Groceries
# Create your views here.

def grocery_display(request):
    grocery  = Groceries.objects.all()
    return render(request, 'grocery.html', {'product': grocery})



def grocery_add(request):
    if request.method == "POST":
        name = request.POST.get('name' )
        price = request.POST.get('price')
        description = request.POST.get('description')

        Groceries.objects.create(
            name = name,
            price = price,
            description = description
        )
        return redirect('grocery_display')
    elif request.method == "GET":
        return render(request, "grocery_add.html")
        
def grocery_edit(request,pk):
    grocery = get_object_or_404(Groceries, pk=pk)
    if request.method == "POST":
        grocery.name = request.POST.get('name')
        grocery.price = request.POST.get('price')
        grocery.description = request.POST.get('description')
        grocery.save()
        return redirect('grocery_display')
    elif request.method == "GET":
        return render(request, 'grocery_add.html', {'grocery': grocery})


def grocery_delete(request,pk):
    grocery = get_object_or_404(Groceries, pk=pk)
    grocery.delete()
    return redirect('grocery_display')
