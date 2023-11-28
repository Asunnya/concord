import json
from channels.generic.websocket import AsyncWebsocketConsumer

class VideoSignalConsumer(AsyncWebsocketConsumer):
    users = set()

    async def connect(self):
        print('connect')
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "room_%s" % self.room_name
        await (self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "disconnected",
                "data": {"from": self.user_id},
            },
        )
        user = self.find_user(self.user_id)
        self.USERS_CONNECTED.remove(user)
        await (self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    
    async def receive(self, text_data):
        data = json.loads(text_data)
      
        message_type = data['type']

        if message_type == 'join':
            self.user_id = data['from']
            self.users.add(self.user_id)

            data['users'] = list(self.users)

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "join_room",
                    "data": data,
                    'username': self.user_id,
                },
            )

            
        elif message_type == 'offer':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_offer",
                    "data": data,
                },
            )
        elif message_type == 'answer':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_answer",
                    "data": data,
                },
            )
        elif message_type == 'disconnected':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "disconnected",
                    "data": data,
                },
            )
    
    async def send_offer(self, event):
        data = event['data']
        await self.send(text_data=json.dumps({
            'type': 'offer',
            'from': data['from'],
            'to': data['to'],
            'offer': data
        }))
    
    async def send_answer(self, event):
        data = event['data']
        await self.send(text_data=json.dumps({
            'type': 'answer',
            'from': data['from'],
            'to': data['to'],
            'answer': data
        }))
    
    async def disconnected(self, event):
        data = event['data']
        await self.send(text_data=json.dumps({
            'type': 'disconnected',
            'from': data['from']
        }))
    

    async def join_room(self, event):
        print(event)
        data = event['data']


        await self.send(text_data=
        json.dumps({
            'type': 'join',
            "from": data['from'],
            'data': data, 
            'username': event['username'],
        }))