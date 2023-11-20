from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from .models import UserVideo
from .serializers import UserVideoSerializer

# Create your views here.



@api_view(['GET'])
def user_videos_list(request):
    data = UserVideo.objects.all()
    serializer = UserVideoSerializer(data, context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_user_video(request):
    serializer = UserVideoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_video_detail(request, pk):
    try:
        data = UserVideo.objects.get(pk=pk)
    except data.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND)
    serializer = UserVideoSerializer(data, context={'request': request})
    return Response(serializer.data)