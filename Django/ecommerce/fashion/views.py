
from django.shortcuts import render, get_object_or_404 , redirect
from .models import Fashion
# Create your views here.

def fashion_display(request):
    fashion  = Fashion.objects.all()
    return render(request, 'fashion.html', {'product': fashion})


def fashion_add(request):
    if request.method == "POST":
        
        name = request.POST.get('name' )
        price = request.POST.get('price')
        description = request.POST.get('description')

        Fashion.objects.create(

            name = name,
            price = price,
            description = description
        )
        return redirect('fashion_display')
    elif request.method == "GET":
        return render(request, "fashion_add.html")
        
def fashion_edit(request,pk):
    fashion = get_object_or_404(Fashion, pk=pk)
    if request.method == "POST":
        
        fashion.name = request.POST.get('name')
        fashion.price = request.POST.get('price')
        fashion.description = request.POST.get('description')
        fashion.save()
        return redirect('fashion_display')
    elif request.method == "GET":
        return render(request, 'fashion_add.html', {'fashion': fashion})


def fashion_delete(request,pk):
    fashion = get_object_or_404(Fashion, pk=pk)
    fashion.delete()
    return redirect('fashion_display')
