from django.shortcuts import render, get_object_or_404, redirect
from .models import Electronic
# Create your views here.

def electronic_display(request):
    electronic  = Electronic.objects.all()
    return render(request, 'electronics.html', {'electronic': electronic})

def electronic_add(request):
    if request.method == "POST":
        name = request.POST.get('name' )
        price = request.POST.get('price')
        description = request.POST.get('description')

        Electronic.objects.create(

            name = name,
            price = price,
            description = description
        )
        return redirect('electronic_display')
    elif request.method == "GET":
        return render(request, "add.html")
        
def electronic_edit(request,pk):
    electronic = get_object_or_404(Electronic, pk=pk)
    if request.method == "POST":
        electronic.name = request.POST.get('name')
        electronic.price = request.POST.get('price')
        electronic.description = request.POST.get('description')
        electronic.save()
        return redirect('electronic_display')
    elif request.method == "GET":
        return render(request, 'add.html', {'electronic': electronic})


def electronic_delete(request,pk):
    electronic = get_object_or_404(Electronic, pk=pk)
    electronic.delete()
    return redirect('electronic_display')
