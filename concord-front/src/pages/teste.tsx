// import { useEffect, useRef, useState } from "react";
// import Meeting from "../models/Meeting";
// import UserVideo from "../models/UserVideo";
// import io from "socket.io-client";
// import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
// import { set } from "react-hook-form";
// import { IOType } from "child_process";

// function MeetingHandle({ user,
//     meeting,
//     handleEndMeeting,
// }: {
//     user: UserVideo;
//     meeting: Meeting;
//     handleEndMeeting: any;
// }) {

//     const localStreamRef = useRef<HTMLVideoElement>(null);
//     const remoteStreamRef = useRef<HTMLVideoElement>(null);
//     const [socket1, setSocket] =  useState<any>();
//     const [isMicOn, setIsMicOn] = useState(true);
//     const [isCameraOn, setIsCameraOn] = useState(true);

//     const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();

   
//     useEffect(() => {
//         // const socket = new WebSocket('ws://localhost:8000/ws/meeting/' + meeting.room_code + '/');
//         const socket = io('http://localhost:8000/ws/meeting/' + meeting.room_code + '/', {transports: ['websocket']});

//         const peerConnection1 = new RTCPeerConnection({});
//         setSocket(socket);
//         setPeerConnection(peerConnection1);

//         socket.on('connect', () => {
//             console.log('connected to socket server');
//         });

//         socket.on('offer', (data: any) => {
//             handleReceiveOffer(data);
//         });

//         socket.on('answer', (data: any) => {
//             peerConnection?.setRemoteDescription(data);
//             handleReceiveAnswer(data);
//         });

//         socket.on('candidate', (candidate: RTCIceCandidate) => {
//             peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
//         });
//         socket.on('connect_error', (err: any) => {
//             console.log(err);
//         });

//         peerConnection1.ontrack = (event) => {
//             remoteStreamRef.current!.srcObject = event.streams[0];
//         }

//         peerConnection1.onicecandidate = (event) => {
//             if (event.candidate) {
//                 socket.emit('candidate', meeting.room_code, event.candidate);
//             }
//         }

//         peerConnection1.ontrack = (event) => {
//             if (remoteStreamRef.current) {
//                 remoteStreamRef.current.srcObject = event.streams[0];
//             }
//         }

//         navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//             if (localStreamRef.current) {
//                 localStreamRef.current.srcObject = stream;
//             }
//             if (peerConnection?.signalingState !== "closed") {
//                 stream.getTracks().forEach((track) => peerConnection1.addTrack(track, stream));
//             }  else {
//                 console.log("Não é possível adicionar tracks a uma conexão fechada.");
//             }
            

//         });
//         createOffer();
//         return () => {
//             peerConnection1.close();
//             socket.close();
//         }
//     }, []);


//     const handleMicBtn = () => {
//         if (localStreamRef.current) {
//             // localStreamRef.current.srcObject?.getAudioTracks().forEach((track) => {
//             //     track.enabled = !track.enabled;
//             // });
//         }
//     }

//     const handleCameraBtn = () => {
//         if (localStreamRef.current) {
//             // localStreamRef.current.srcObject?.getVideoTracks().forEach((track) => {
//             //     track.enabled = !track.enabled;
//             // });
//         }
//     }

//     const handleReceiveOffer = (offer: any) => {
//         peerConnection?.setRemoteDescription(new RTCSessionDescription(offer))
//             .then(() => navigator.mediaDevices.getUserMedia({ video: true, audio: true }))
//             .then((stream) => {
//                 stream.getTracks().forEach((track) => peerConnection!.addTrack(track, stream));
//             })
//             .then(() => peerConnection?.createAnswer())
//             .then((answer) => peerConnection?.setLocalDescription(answer))
//             .then(() => {
//                 socket1.emit('send_answer', { answer: peerConnection?.localDescription });
//             });
//     };


//     const handleReceiveAnswer = (answer: any) => {
//         peerConnection?.setRemoteDescription(new RTCSessionDescription(answer));
//     }

//     const createOffer = () => {
//         peerConnection?.createOffer()
//             .then((offer) => peerConnection?.setLocalDescription(offer))

//             .then(() => {
//                 ;
//                 socket1.emit('send_offer', { offer: peerConnection?.localDescription, room: meeting.room_code });
//             });
//     }

   

//     return (
//         <>
//             <>
//                 <section className="meeting-room container-meeting-room">
//                     <div className="row">
//                         <h1>SALA:{meeting.room_code} </h1>
//                     </div>
//                     <div className="row">
//                         <div className="col-6 video-user text-end">
//                             <video id="preview" ref={localStreamRef} autoPlay playsInline muted />
//                             <p className="name-meeting">{user.username}</p>
//                         </div>
//                         <div className="col-6 video-friend text-end">
//                             <video id="preview" ref={remoteStreamRef} autoPlay playsInline />
//                             <p className="name-meeting">{peerConnection?.getReceivers.name}</p>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-12 d-flex justify-content-center">
//                             <MDBBtn
//                                 color="success"
//                                 className={"btn-icons-meeting"}
//                                 onClick={() => {
//                                     handleCameraBtn();
//                                     setIsCameraOn(!isCameraOn);
//                                 }}
//                             >
//                                 {" "}
//                                 {isCameraOn ? (
//                                     <MDBIcon
//                                         id="video-on"
//                                         className="icons-meeting"
//                                         fas
//                                         icon="video-slash"
//                                     />
//                                 ) : (
//                                     <MDBIcon
//                                         id="video-off"
//                                         className="icons-meeting"
//                                         fas
//                                         icon="video"
//                                     />
//                                 )}
//                             </MDBBtn>
//                             <MDBBtn
//                                 color="success"
//                                 className={"btn-icons-meeting"}
//                                 onClick={() => {
//                                     handleMicBtn();
//                                     setIsMicOn(!isMicOn);
//                                 }}
//                             >
//                                 {" "}
//                                 {isMicOn ? (
//                                     <MDBIcon
//                                         id="mic"
//                                         className="icons-meeting"
//                                         fas
//                                         icon="microphone-slash"
//                                     />
//                                 ) : (
//                                     <MDBIcon
//                                         id="mic-off"
//                                         className="icons-meeting"
//                                         fas
//                                         icon="microphone"
//                                     ></MDBIcon>
//                                 )}
//                             </MDBBtn>
//                             <MDBBtn
//                                 color="success"
//                                 className={"btn-icons-meeting"}
//                                 onClick={handleEndMeeting}
//                             >
//                                 <MDBIcon className="icons-meeting" fas icon="phone-slash" />
//                             </MDBBtn>
//                         </div>
//                     </div>
//                 </section>
//             </>

//             {/* <MeetingPage
//                     user={user!}
//                     meeting={meeting!}
//                     handleMicBtn={handleMicBtn!}
//                     handleCameraBtn={handleCameraBtn!}
//                     getUserVideoStream={getUserVideoStream!}
//                     handleEndMeeting={handleEndMeeting!}
//                 /> */}
//         </>

//     );



// };

// export default MeetingHandle;