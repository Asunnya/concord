from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from .models import Meeting
from .serializers import MeetingSerializer
from user_video.models import UserVideo
from user_video.serializers import UserVideoSerializer
# Create your views here.


@api_view(['GET'])
def meeting_list(request):
    data = Meeting.objects.all()
    serializer = MeetingSerializer(data, context={'request': request}, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_meeting(request):
    serializer = MeetingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_by_room_code(request, room_code):
    try:
        data = Meeting.objects.get(room_code=room_code)
    except data.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND)
    serializer = MeetingSerializer(data, context={'request': request})
    return Response(serializer.data)

@api_view(['PUT'])
def update_meeting(request, pk):
    try:
        data = Meeting.objects.get(pk=pk)
    except data.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND)
    serializer = MeetingSerializer(data, data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def join_meeting(request, pkMeeting, pkUser):
#     try:
#         data = Meeting.objects.get(pk=pkMeeting)
#     except data.DoesNotExist:
#         return Response(status=HTTP_404_NOT_FOUND)
#     serializerMeeting = MeetingSerializer(data, context={'request': request})
#     try:
#         data = UserVideo.objects.get(pk=pkUser)
#     except Exception as e:
#         return Response(status=HTTP_404_NOT_FOUND)
#     serializerUser = UserVideoSerializer(data, context={'request': request})
#     if serializerMeeting.is_valid() and serializerUser.is_valid():
#         server = ServerMeeting(app, data['room_code'])
#         server.run()
    
    
#     return Response(serializer.data, status=HTTP_201_CREATED)