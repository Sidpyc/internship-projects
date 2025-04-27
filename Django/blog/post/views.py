from django.shortcuts import render,redirect,get_object_or_404,get_list_or_404
from .models import Post
from django.core.paginator import Paginator
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post
from .serializers import PostSerializer


# Create your views here.


def post(request):
    if request.user.is_authenticated:
        return render(request,"home.html")

def addpost(request):
    if request.user.is_authenticated:
        post =Post.objects.all()
        paginator = Paginator(post, 3)  
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        return render(request,"post.html",{"post_data":post})

def add_post(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            title = request.POST.get('title')
            content = request.POST.get('content')
            author = request.POST.get('author')
            Post.objects.create(
            title=title,
            content=content,
            author =author
            )
            return redirect('post')
        return render(request, 'add.html')

def edit_post(request, pk):
    if request.user.is_authenticated:
        post = get_object_or_404(Post,pk=pk)
        if request.method == 'POST':
            title = request.POST.get('title')
            content = request.POST.get('content')
            author = request.POST.get('author')
            post.title = title
            post.content = content
            post.author = author
            post.save() 
            return redirect('addpost')
        return render(request, 'add.html', {"post":post})

def delete_post(request, pk):
    if request.user.is_authenticated:
        post = get_object_or_404(Post, pk=pk)
        if request.method == 'POST':
            post.delete() 
            return redirect('addpost')

        return render(request, 'delete.html', {'post': post})




@api_view(['GET'])
def get_postapi(request):
    post = Post.objects.all()
    serializer = PostSerializer(post, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_postapi(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
 
 

@api_view(['PUT'])
def update_postapi(request, pk):
    post = get_object_or_404(Post, pk=pk)
    serializer = PostSerializer(post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view( ['DELETE'])
def delete_postapi(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.delete()
    return Response(status=204)