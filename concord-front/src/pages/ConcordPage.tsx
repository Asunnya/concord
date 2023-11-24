import { useState } from "react";
import UserVideo from "../models/UserVideo";
import Meeting from "../models/Meeting";
import WaitingRoom from "./WaitingRoom";
import MeetingPage from "./MeetingPage";
import { io } from "socket.io-client";

const ConcordPage = () => {
    const [meetingStart, setMeetingStart] = useState(false);
    const [userEntity, setUserEntity] = useState<UserVideo>();
    const [meetingEntity, setMeetingEntity] = useState<Meeting>();

    const SERVER_URL = "http://localhost:8000";
    const socket = io(SERVER_URL, { autoConnect: false });
    const [localStream, setLocalStream] = useState<MediaStream>();
    var peerConnectingRtc: RTCPeerConnection;
    const remoteStream: any = document.querySelector("#video-component");


    socket.on('connect', () => {
        socket.emit('started_connection', { data: 'New client!' });
    });

    socket.on('disconnect', () => {
      alert('disconnected');
    });

    socket.on('data', (data) => {
        handleSocketData(data);
    });

    socket.on('ready', (data) => {
        console.log('Ready');
        createPeer();
        receiveResponse(data);
    });



    const sendData = (data: any) => {
        socket.emit('data', data);
    };

    async function handleStartMeeting(user: UserVideo, meeting: Meeting) {
        console.log(user.username + meeting.room_code);

        setUserEntity(user);
        setMeetingEntity(meeting);
        await getUserVideoStream(); //backend django create socket connection webrtc and send to frontend
        setMeetingStart(true);
    }

    async function handleMicBtn() {

    }


    async function handleCameraBtn() {

    }

    async function getUserVideoStream() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setLocalStream(stream);
                socket.connect();
                socket.emit('join-room', meetingEntity?.room_code);
            }).catch((err) => {
                console.log(err);
            });
    }

    const createPeer = () => {
        try {
            peerConnectingRtc = new RTCPeerConnection();
            peerConnectingRtc.onicecandidate = onIceCandidate;
            peerConnectingRtc.ontrack = onAddStream;
            localStream?.getTracks().forEach((track) => {
                peerConnectingRtc.addTrack(track, localStream!);
            });
            console.log('PeerConnection created');
        } catch (err) {
            console.log(err);
        }
    }

    const onIceCandidate = (event: any) => {
        if (event.candidate) {
          
          sendRequest({
            type: 'candidate',
            candidate: event.candidate
          });
        }
      };
      
      const onAddStream = (event:any) => {
        remoteStream!.srcObject = event.stream;
      };

    const handleSocketData = (data: any) => {
        switch (data.type) {
            case 'offer':
                peerConnectingRtc.setRemoteDescription(new RTCSessionDescription(data.data));
                receiveResponse(data);
                break;
            case 'answer':
                peerConnectingRtc.setRemoteDescription(new RTCSessionDescription(data.data));
                break;
            case 'candidate':
                peerConnectingRtc.addIceCandidate(new RTCIceCandidate(data.data));
                break;

        }
    }

    const sendRequest = (data: any) => {
        peerConnectingRtc.createOffer().then((sdp) => {
            peerConnectingRtc.setLocalDescription(sdp);
            sendData({
                type: 'sdp',
                data: data,
            });
        });
    };
    const receiveResponse = (data: any) => {
        data = data || {};
        peerConnectingRtc.createAnswer().then((sdp) => {
            peerConnectingRtc.setLocalDescription(sdp);
            sendData({
                type: 'sdp',
                data: data,
            });
        });
    }

    return (
        <>
            {meetingStart ? (
                <MeetingPage
                    user={userEntity!}
                    meeting={meetingEntity!}
                    handleMicBtn={handleMicBtn!}
                    handleCameraBtn={handleCameraBtn!}
                    getUserVideoStream={getUserVideoStream!}
                    handleEndMeeting={handleStartMeeting!}
                />
            ) : (
                <WaitingRoom handleStartMeeting={handleStartMeeting} />
            )}
        </>
    );
};


export default ConcordPage;
