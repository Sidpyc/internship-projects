from django.db import models
from django.contrib.auth.models import User
# Create your models here.

from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    followers = models.JSONField(default=list)

    def __str__(self):
        return f"{self.user.username}'s profile"

    def add_follower(self, username):
        if username not in self.followers:
            self.followers.append(username)
            self.save()

    def remove_follower(self, username):
        if username in self.followers:
            self.followers.remove(username)
            self.save()
    
class Follow(models.Model):
    follower = models.ForeignKey(User, related_name="user_followers", on_delete=models.CASCADE)  
    followed = models.ForeignKey(User, related_name="user_following", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        unique_together = ('follower', 'followed')
        
    def _str_(self):
        return f'{self.follower.username} follows {self.followed.username}'