import { useEffect, useRef, useState } from "react";
import Meeting from "../models/Meeting";
import UserVideo from "../models/UserVideo";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Peer from "simple-peer";

function MeetingHandle({ user,
    meeting,
    handleEndMeeting,
}: {
    user: UserVideo;
    meeting: Meeting;
    handleEndMeeting: any;
}) {

    const localStreamRef = useRef<HTMLVideoElement>(null);
    const remoteStreamRef = useRef<HTMLVideoElement>(null);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [websocket, setWebsocket] = useState<any>();
    const [otherUser, setOtherUser] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [usersConnected, setUsersConnected] = useState<[]>([]);
    const [peers] = useState<any[]>([]);

    useEffect(() => {
        webSocketCreate();       
    }, []);

 

    const CreatePeer = ({ localUserId, remoteUserId, localUserStream = null }: { localUserId: any; remoteUserId: any; localUserStream?: any }): any => {
        const peer = new Peer(
            {
                initiator: true,
                trickle: false,
                stream: localUserStream
            }
        );


        peer.on('signal', (data: any) => {
           websocket.send(JSON.stringify({
                type: 'offer',
                from: localUserId,
                to: remoteUserId,
                offer: data,
           }));
        });
        return peer;
    };


    const addPeer = ({ localUserId, remoteUserId, receivedOffer, localUserStream = null }: { localUserId: any; remoteUserId: any; receivedOffer?: any; localUserStream?: any }): any => {
        const peer = new Peer(
            {
                initiator: false,
                trickle: false,
                stream: localUserStream
            }
        );

        peer.signal(receivedOffer);

        peer.on('signal', (data: any) => {
           websocket.send(JSON.stringify({
                type: 'answer',
                from: localUserId,
                to: remoteUserId,
                answer: data,
           }));
        });

        return peer;
    };


    const sendStreamToPeer = (stream: any) => { 
        
        usersConnected.forEach((user1) => {
            if (user1 !== user.username) {
              
                const peer = CreatePeer({ localUserId: user.username, remoteUserId: user1, localUserStream: stream });
                peers.push(peer);
                
                peer.on('stream', (stream: any) => {
                    remoteStreamRef.current!.srcObject = stream;
                });
            }
        })

    }

    

    const webSocketCreate = () => {
        const WEBSOCKETURL = 'ws://localhost:8000' + '/video-chat/';
        const socket = new WebSocket(WEBSOCKETURL + `${meeting.room_code}/`);
        setWebsocket(socket);

        socket.onopen = () => {
           
            setLoading(false);
            socket.send(JSON.stringify({
                'type': 'join',
                'from': user.username,
                'room': meeting.room_code
            }));

        }

        socket.onmessage = (e: any) => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case 'join':
                   
                    setUsersConnected(data.data.users);


                    if (data.from === user.username) {
                        navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: true
                          }).then((stream) => {
                            localStreamRef.current!.srcObject = stream;
                            sendStreamToPeer(stream);
                          }).catch((e) => {
                            console.log(e.message)
                          })
                    } else if (data.from !== user.username) {
                       const otherUser = data.username;
                        setOtherUser(otherUser);
                       console.log(`${otherUser} joined the room`);
                    }
                    break;
                case 'offer':
                    if (data.to == user.username) {
                        console.log('offer receive')
                        const peer2 = addPeer( { 
                            localUserId: user.username, 
                            remoteUserId: data.from, 
                            receivedOffer: data.offer, 
                            localUserStream: localStreamRef.current!.srcObject 
                        } );
                        peers.push(peer2)
                        console.log("teset")
                        peer2.on('stream', (stream: any) => {
                            remoteStreamRef.current!.srcObject = stream;
                        });
                    }
                    break;
                case 'answer':
                    if (data.to == user.username) {
                        console.log('answer receive')
                        const peer = peers.find((p) => p.remoteUserId === data.from);
                        peer.signal(data.answer);
                    }
                    break;
                case 'disconnected':
                    if (data.from !== user.username) {
                        handleEndMeeting();
                        console.log(`${data.from} left the room`);
                    }
                    break;
                default:
                    break;
            }

        }


    }

    const handleMicBtn = () => {
        if (localStreamRef.current) {
            // localStreamRef.current.srcObject?.getAudioTracks().forEach((track) => {
            //     track.enabled = !track.enabled;
            // });
        }
    }

    const handleCameraBtn = () => {
        if (localStreamRef.current) {
            // localStreamRef.current.srcObject?.getVideoTracks().forEach((track) => {
            //     track.enabled = !track.enabled;
            // });
        }
    }


    if (loading) return <div>Loading...</div>;

    return (
        <>
            <>
                <section className="meeting-room container-meeting-room">
                    <div className="row">
                        <h1>SALA:{meeting.room_code} </h1>
                    </div>
                    <div className="row">
                        <div className="col-6 video-user text-end">
                            <video id="preview" ref={localStreamRef} autoPlay playsInline muted />
                            <p className="name-meeting">{user.username}</p>
                        </div>
                        <div className="col-6 video-friend text-end">
                            <video id="preview" ref={remoteStreamRef} autoPlay playsInline />
                            <p className="name-meeting">{otherUser}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <MDBBtn
                                color="success"
                                className={"btn-icons-meeting"}
                                onClick={() => {
                                    handleCameraBtn();
                                    setIsCameraOn(!isCameraOn);
                                }}
                            >
                                {" "}
                                {isCameraOn ? (
                                    <MDBIcon
                                        id="video-on"
                                        className="icons-meeting"
                                        fas
                                        icon="video-slash"
                                    />
                                ) : (
                                    <MDBIcon
                                        id="video-off"
                                        className="icons-meeting"
                                        fas
                                        icon="video"
                                    />
                                )}
                            </MDBBtn>
                            <MDBBtn
                                color="success"
                                className={"btn-icons-meeting"}
                                onClick={() => {
                                    handleMicBtn();
                                    setIsMicOn(!isMicOn);
                                }}
                            >
                                {" "}
                                {isMicOn ? (
                                    <MDBIcon
                                        id="mic"
                                        className="icons-meeting"
                                        fas
                                        icon="microphone-slash"
                                    />
                                ) : (
                                    <MDBIcon
                                        id="mic-off"
                                        className="icons-meeting"
                                        fas
                                        icon="microphone"
                                    ></MDBIcon>
                                )}
                            </MDBBtn>
                            <MDBBtn
                                color="success"
                                className={"btn-icons-meeting"}
                                onClick={handleEndMeeting}
                            >
                                <MDBIcon className="icons-meeting" fas icon="phone-slash" />
                            </MDBBtn>
                        </div>
                    </div>
                </section>
            </>

            {/* <MeetingPage
                    user={user!}
                    meeting={meeting!}
                    handleMicBtn={handleMicBtn!}
                    handleCameraBtn={handleCameraBtn!}
                    getUserVideoStream={getUserVideoStream!}
                    handleEndMeeting={handleEndMeeting!}
                /> */}
        </>

    );



};




export default MeetingHandle;