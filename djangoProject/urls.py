"""
URL configuration for djangoProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from user_video import views as usv
from meeting import views as mv
from meeting import server_meeting as sv
from video_signal import consumers

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user_video/', usv.user_videos_list),
    path('user_video/create/', usv.create_user_video),
    path('user_video/getById/<int:pk>', usv.user_video_detail),
    path('meeting/', mv.meeting_list),
    path('meeting/create/', mv.create_meeting),
    path('meeting/getByRoomCode/<str:room_code>', mv.get_by_room_code),
    path('meeting/update/<int:pk>', mv.update_meeting),
    # path('socket.io/', consumers.VideoSignalConsumer.as_asgi()),
    # path('ws/meeting/<str:room_name>/', consumers.VideoSignalConsumer.as_asgi()),


]


