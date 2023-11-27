from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # path('ws/meeting/<str:room_name>/', consumers.VideoSignalConsumer.as_asgi()),
    re_path(r'video-chat/(?P<room_name>\w+)/$', consumers.VideoSignalConsumer.as_asgi()),
]



