# Generated by Django 4.2.7 on 2023-11-21 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]