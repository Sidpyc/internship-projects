from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# Post Serializer
class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)  # Include user details
    like_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'image', 'created_at', 'likes', 'like_count', 'is_liked']

    def get_like_count(self, obj):
        """Get the number of likes for the post."""
        return obj.like_count()

    def get_is_liked(self, obj):
        """Check if the current user has liked the post."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.is_liked_by_user(request.user)
        return False

    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("Content cannot be empty.")
        return value