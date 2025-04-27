from django.shortcuts import render, redirect   ,get_object_or_404
from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import  authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .serializers import UserSerializer, UserSignupForm, UserLoginForm,RegisterSerializer
from .serializers import LoginSerializer 
from .models import UserProfile, Follow
from .serializers import UserProfileSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from .serializers import FollowSerializer
from django.contrib.auth import get_user_model



def signup_view(request):
    if request.method == 'POST':
        form = UserSignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Signup successful! Welcome, {}".format(user.username))
            return redirect('home')
        else:
            # Log the errors for debugging
            messages.error(request, "Signup failed. Please correct the errors below.")
            print(form.errors)
    else:
        form = UserSignupForm()
    return render(request, 'users/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "Login successful! Welcome back, {}".format(user.username))
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password. Please try again.")
    else:
        form = UserLoginForm()
    return render(request, 'users/login.html', {'form': form})

@login_required
def home_view(request):
    return render(request, 'users/home.html', {'username': request.user.username})

def logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out successfully.")
    return redirect('login')


#Api things
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request,*args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh=RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_serializer.data,
                 
            })
        else:
            return Response({'details': 'Invalid credentials'}, status=401)
 
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user=request.user
        user_serializer = UserSerializer(user)
        return Response({
            'message': 'Welcome, {}!'.format(user.username),
            'user': user_serializer.data,
        },200)

#User Profiles Update




class UserProfileList(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)


class UserProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)


class UserList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Exclude the logged-in user from the list
        return User.objects.exclude(id=self.request.user.id)



class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        # Fetch the user and their profile
        user_profile = get_object_or_404(UserProfile, user__username=username)
        
        # Prepare profile data including user ID
        profile_data = {
            "id": user_profile.user.id,  # Adding user ID
            "username": user_profile.user.username,
            "bio": user_profile.bio,
            "profile_picture": user_profile.profile_picture.url if user_profile.profile_picture else None,
            "followers": user_profile.followers,
        }
        return Response(profile_data)
    
# views.py

User = get_user_model()

class FollowCreateView(generics.CreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)

class FollowListView(generics.ListAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Follow.objects.filter(follower=self.request.user)

class FollowDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ensure users can only delete their own follow relationships
        return Follow.objects.filter(follower=self.request.user)

    def get_object(self):
        # Get the `followed_id` from the URL kwargs
        followed_id = self.kwargs.get('followed_id')

        # Fetch the Follow object based on `followed_id` and the logged-in user
        try:
            return Follow.objects.get(followed_id=followed_id, follower=self.request.user)
        except Follow.DoesNotExist:
            raise Http404("Follow relationship does not exist.")

    def destroy(self, request, *args, **kwargs):
        try:
            # Get the Follow object to delete
            instance = self.get_object()

            # Perform the deletion
            self.perform_destroy(instance)

            # Return a success response
            return Response(
                {"message": "Successfully unfollowed the user."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            # Handle errors and return an error response
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserFollowStatsView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        following_count = Follow.objects.filter(follower=user).count()
        followers_count = Follow.objects.filter(followed=user).count()
        return Response({
            'following_count': following_count,
            'followers_count': followers_count
        })