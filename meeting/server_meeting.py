import socketio
from rest_framework.decorators import api_view


class ServerMeeting:
    room_code = "ROOM_CODE"
    sio = socketio.AsyncServer(cors_allowed_origins='*')
    def __init__(self, app, room_code):
        self.sio.attach(app)
        self.room_code = room_code

    @sio.event
    async def connect(sid, environ):
        print('connect ', sid)
        await self.sio.emit('my response', {'data': 'Connected', 'count': 0}, room=self.room_code, skip_sid=sid)
        self.sio.enter_room(sid, self.room_code)

    @sio.event
    async def disconnect(sid):
        sio.leave_room(sid, self.room_code)
        print('disconnect ', sid)

    @sio.event
    async def data(sid, data):
       print('message from {}: {}'.format(sid, data))
       await sio.emit('my response', data, room=self.room_code, skip_sid=sid)


@api_view(['GET'])
async def start_server(request):
    print("start_server")
    server = ServerMeeting(app, "ROOM_CODE")
    server.sio.start_background_task(server.start_server)
    return Response("start_server")