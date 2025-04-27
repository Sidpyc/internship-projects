from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages  # For flash messages
from .forms import UserSignupForm, UserLoginForm
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from  .serializers import LoginSerializer
from django.contrib.auth import authenticate
from django .contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated


from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework.exceptions import AuthenticationFailed

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

# API Views

class LoginAPI(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid username or password.')

        # Generate token
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'status': True,
            'data': {
                'token': token.key
            },
        })


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import UntypedToken
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

class LoginAPI(APIView):
    def post(self, request):
        # Parse data from request
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid username or password.')

        # Generate token
        token, _ = Token.objects.get_or_create(user=user)

        # Return the token to the client
        return Response({'token': token.key})
    
    from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

class UserSignUpAPIView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        if User.objects.filter(username=username).exists():
            return Response({"message": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password)
        user.save()
        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
