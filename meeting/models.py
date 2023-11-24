from django.db import models

# Create your models here.


class Meeting(models.Model):
    meeting_id = models.AutoField(primary_key=True)
    room_code = models.CharField(max_length=50)
    start_time = models.CharField(max_length=50)
    end_time = models.CharField(max_length=50)
    created_by  = models.ForeignKey('user_video.UserVideo', on_delete=models.CASCADE, related_name='created_by')
    guest_user = models.ForeignKey('user_video.UserVideo', on_delete=models.CASCADE, related_name='guest_user')
    
    
    def __str__(self):
        string = f"meeting_id: {self.meeting_id}, room_code: {self.room_code}, start_time: {self.start_time}, end_time: {self.end_time}, created_by: {self.created_by}, guest_user: {self.guest_user}"
        return string