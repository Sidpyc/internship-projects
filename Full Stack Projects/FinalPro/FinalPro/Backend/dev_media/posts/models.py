from django.db import models
from django.contrib.auth.models import User

# Create your models here.

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    image = models.ImageField(upload_to='posts_pic/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    def like_count(self):
        return self.likes.count()

    def is_liked_by_user(self, user):
        """Check if the given user has liked this post."""
        return self.likes.filter(id=user.id).exists()