# Generated by Django 4.2.7 on 2023-11-21 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_video', '0003_rename_last_login_uservideo_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uservideo',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
