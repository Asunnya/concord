from django.db import migrations

def create_data(apps, schema_editor):
    user_video = apps.get_model('user_video', 'user_video')
    user_video(username='user1').save()
    user_video(username='user2').save()

class Migration(migrations.Migration):
    dependencies = [
        ('user_video', '0001_initial'),
    ]
    operations = [
        migrations.RunPython(create_data),
    ]