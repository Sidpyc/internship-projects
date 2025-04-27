from rest_framework import serializers
from django.contrib.auth.models import User
from django import forms
from .models import UserProfile, Follow
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django import forms
from django.contrib.auth.models import User

class UserSignupForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class UserLoginForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)

    def get_user(self):
        username = self.cleaned_data.get('username')
        return User.objects.filter(username=username).first()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
 # Hash the password before saving the user
        user = User.objects.create_user(
        username=validated_data['username'],
        email=validated_data['email'],
        password=validated_data['password']
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True,write_only=True)

User = get_user_model()
class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=False)  # Make username writable
    email = serializers.EmailField(source='user.email', read_only=True)
    followers = serializers.ListField(
        child=serializers.CharField(),
        allow_empty=True,
        required=False
    )

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'bio', 'profile_picture', 'followers']
        read_only_fields = ['id', 'email']  # Remove 'username' from read_only_fields

    def validate_username(self, value):
        # Check if the username is already taken by another user
        if User.objects.exclude(pk=self.instance.user.pk).filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def update(self, instance, validated_data):
        # Extract the username from the validated data
        user_data = validated_data.pop('user', {})
        username = user_data.get('username', None)

        # Update the username if it's provided
        if username is not None:
            instance.user.username = username
            instance.user.save()

        # Update other fields
        followers = validated_data.pop('followers', None)
        if followers is not None:
            instance.followers = followers
        instance.bio = validated_data.get('bio', instance.bio)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.save()
        return instance

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Add your authentication logic here (e.g., using Django's authenticate)
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            return {'username': username}
        raise serializers.ValidationError("Invalid credentials")
    
User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']



User = get_user_model()

class FollowSerializer(serializers.ModelSerializer):
    follower = serializers.PrimaryKeyRelatedField(read_only=True)
    followed = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Follow
        fields = ['id', 'follower', 'followed', 'created_at']

    def create(self, validated_data):
        validated_data['follower'] = self.context['request'].user
        return super().create(validated_data)