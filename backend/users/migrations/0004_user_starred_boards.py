# Generated by Django 4.0.6 on 2022-10-13 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0006_notification_recipient_alter_board_description'),
        ('users', '0003_alter_user_profile_pic'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='starred_boards',
            field=models.ManyToManyField(blank=True, to='boards.board'),
        ),
    ]
