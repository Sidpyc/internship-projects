from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .models import Post
from .seriallizers import PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import  ListCreateAPIView, DestroyAPIView
from rest_framework.views import APIView  
from users.models import UserProfile 
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions




def homepost(request):
    return render(request, 'home_post.html')


# OR for combining listing and creation
class AddViewPost(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        # Automatically set the author to the currently logged-in user
        serializer.save(author=self.request.user)

class ListViewMyPost(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        # Return posts authored by the currently logged-in user
        return Post.objects.filter(author=self.request.user)

class DeleteViewPost(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()  # Queryset to target the Post model
    lookup_field = 'pk'  # Use 'pk' in the URL to identify the post to delete

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            return Response(
                {'detail': 'You do not have permission to delete this post.'},
                status=status.HTTP_403_FORBIDDEN
            )
        instance.delete()  
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserPostsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        # Fetch the user profile
        user_profile = get_object_or_404(UserProfile, user__username=username)

        # Fetch all posts created by the user
        posts = Post.objects.filter(author=user_profile.user).order_by("-created_at")

        # Serialize the posts
        serializer = PostSerializer(posts, many=True)

        return Response(serializer.data, status=200)

from rest_framework.permissions import IsAuthenticated

class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        user = request.user
        is_liked = post.likes.filter(id=user.id).exists()

        if is_liked:
            post.likes.remove(user)
            message = "Post unliked"
        else:
            post.likes.add(user)
            message = "Post liked"

        return Response(
            {
                "message": message,
                "like_count": post.likes.count(),
                "is_liked": not is_liked,  # Return updated like status
            },
            status=status.HTTP_200_OK,
        )

