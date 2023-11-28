import { Component, useEffect, useRef, useState } from "react";
import Meeting from "../models/Meeting";
import UserVideo from "../models/UserVideo";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Peer from "simple-peer";
import { all } from "axios";
import { set } from "react-hook-form";
import VideoComponent from "./VideoComponent";

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
    const [allPeersCreated, setAllPeersCreated] = useState<any>([]);

    const [stream] = useState<any>();
    const [peersOks, setPeersOk] = useState<any>([]);


    useEffect(() => {
        webSocketCreate();
    }, []);

    

    console.log("peersOks", peersOks)
    console.log("allPeersCreated", allPeersCreated)
    console.log("usersConnected", usersConnected)
    console.log("stream", stream)
    console.log("otherUser", otherUser)
    console.log("websocket", websocket)

    console.log("localStreamRef", localStreamRef)
    console.log("remoteStreamRef", remoteStreamRef)

    const CreatePeer = ({ localUserId, remoteUserId, localUserStream = null }: { localUserId: any; remoteUserId: any; localUserStream?: any }): any => {

        console.log("create peer")
        const peer = new Peer(
            {
                initiator: true,
                trickle: false,
                stream: localUserStream,
            }
        );



        peer.on('signal', (data: any) => {
            websocket.send(
                JSON.stringify({
                    type: 'offer',
                    from: localUserId,
                    to: remoteUserId,
                    offer: data,
                }));
        });
     

        allPeersCreated.push(peer);


        return peer;
    };


    const addPeer = ({ localUserId, remoteUserId, receivedOffer, localUserStream = null }: { localUserId: any; remoteUserId: any; receivedOffer?: any; localUserStream?: any }): any => {

        console.log("add peer")
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

      

        allPeersCreated.push(peer);
        return peer;
    };


    const sendStreamToPeer = (userCurrent: any, stream: any) => {
        const ppeers: any = [];
        console.log("send stream to peer")
        usersConnected.forEach((otherUser1: any) => {
            if (otherUser1 !== userCurrent) {
                const peer = CreatePeer({
                    localUserId: userCurrent,
                    remoteUserId: otherUser1,
                    localUserStream: stream,
                });

                console.log("send stream to peer")
                ppeers.push(
                    {
                        peerId: otherUser1,
                        peer: peer,
                    }
                );


                peer.on('stream', function (remoteStream: any) {
                    remoteStreamRef!.current!.srcObject = remoteStream;
                });
            }

            setPeersOk(ppeers);
        });
        
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
                            sendStreamToPeer(user.username, stream);
                        }).catch((e) => {
                            console.log(e.message)
                        })
                    }
                    if (data.from !== user.username) {
                        const otherUser = data.from;
                        setOtherUser(otherUser);
                        console.log(`${otherUser} joined the room`);
                    }
                    break;
                case 'offer':
                    if (data.to === user.username) {
                        console.log('offer receive')
                        const peer2 = addPeer({
                            localUserId: user.username,
                            remoteUserId: data.from,
                            receivedOffer: data.offer,
                            localUserStream: localStreamRef.current!.srcObject
                        });

                        setPeersOk((peersOks: any) => [...peersOks, {
                            peerId: data.from,
                            peer: peer2
                        }]);


                    }
                    break;
                case 'answer':
                    if (data.to === user.username) {
                        console.log('answer receive')
                        const peer = peersOks.find((p: any) => p.peerId === data.from);
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

    Component.prototype.componentWillUnmount = () => {
        websocket.send(JSON.stringify({
            'type': 'disconnected',
            'from': user.username,
            'room': meeting.room_code
        }));

        peersOks.forEach((element: any) => {
            element.destroy();
        });
        if (websocket) {
            setWebsocket(null);
        }
        if (stream) {
            stream.getTracks().forEach((track: any) => {
                track.stop();
            });
        }

        setUsersConnected([]);
        setPeersOk([]);



        websocket.close();
    }

    const handleMicBtn = () => {
        const stream = localStreamRef.current!.srcObject as MediaStream;
        if (!stream.getAudioTracks()[0]) return
        stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
        setIsMicOn(false);
    }

    const handleCameraBtn = () => {
        const stream = localStreamRef.current!.srcObject as MediaStream;
        if (!stream.getVideoTracks()[0]) return
        stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
        setIsCameraOn(false);

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
                        <div className="col-6 video-user text-left">
                            <video id="preview" ref={localStreamRef} autoPlay playsInline muted style={{width: "50%", height: "50%"}}/>
                            <p className="name-meeting">{user.username}</p>
                        </div>
                        <div className="col-6 video-friend text-end">
                            <div className={"video-grid"}>
                            <video id="preview" ref={remoteStreamRef} autoPlay playsInline muted style={{width: "50%", height: "50%"}}/>
                            <p className="name-meeting">{otherUser}</p>
                            </div>
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