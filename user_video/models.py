from django.db import models

# Create your models here.
class UserVideo(models.Model):
    username = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username