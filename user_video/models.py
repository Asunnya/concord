from django.db import models

# Create your models here.
class UserVideo(models.Model):
    user_video_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self):
        string = f"username: {self.username}, date_created: {self.date_created}, user_video_id: {self.user_video_id}"
        return string