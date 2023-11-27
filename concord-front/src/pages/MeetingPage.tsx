// import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
// import UserVideo from "../models/UserVideo";
// import Meeting from "../models/Meeting";
// import { useState } from "react";
// import VideoComponent from "./VideoComponent";

// export function MeetingPage({
//   user,
//   meeting,
//   handleMicBtn,
//   handleCameraBtn,
//   getUserVideoStream,
//   handleEndMeeting,
// }: {
//   user: UserVideo;
//   meeting: Meeting;
//   handleMicBtn: any;
//   handleCameraBtn: any;
//   getUserVideoStream: any;
//   handleEndMeeting: any;
// }) {
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCameraOn, setIsCameraOn] = useState(true);

//   return (
//     <>
//       <section className="meeting-room container-meeting-room">
//         <div className="row">
//           <h1>SALA:{meeting.room_code} </h1>
//         </div>
//         <div className="row">
//           <div className="col-6 video-user text-end">
//             {getUserVideoStream ? (
//               <VideoComponent
//                 id="meetingAreaLocalVideo"
//                 muted={true}
//                 srcObject={getUserVideoStream}
//                 style={{
//                   padding: 0,
//                   margin: 0,
//                   width: "150px",
//                   height: "100px",
//                 }}
//               />
//             ) : (
//               <video></video>
//             )}
//             <p className="name-meeting">{user.username}</p>
//           </div>
//           <div className="col-6 video-friend text-end">
//             {getUserVideoStream ? (
//               <VideoComponent
//                 id="meetingAreaLocalVideo"
//                 muted={true}
//                 srcObject={getUserVideoStream}
//                 style={{
//                   padding: 0,
//                   margin: 0,
//                   width: "150px",
//                   height: "100px",
//                 }}
//               />
//             ) : (
//               <video></video>
//             )}
//             <p className="name-meeting">{user.username}</p>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-12 d-flex justify-content-center">
//             <MDBBtn
//               color="success"
//               className={"btn-icons-meeting"}
//               onClick={() => {
//                 handleCameraBtn();
//                 setIsCameraOn(!isCameraOn);
//               }}
//             >
//               {" "}
//               {isCameraOn ? (
//                 <MDBIcon
//                   id="video-on"
//                   className="icons-meeting"
//                   fas
//                   icon="video-slash"
//                 />
//               ) : (
//                 <MDBIcon
//                   id="video-off"
//                   className="icons-meeting"
//                   fas
//                   icon="video"
//                 />
//               )}
//             </MDBBtn>
//             <MDBBtn
//               color="success"
//               className={"btn-icons-meeting"}
//               onClick={() => {
//                 handleMicBtn();
//                 setIsMicOn(!isMicOn);
//               }}
//             >
//               {" "}
//               {isMicOn ? (
//                 <MDBIcon
//                   id="mic"
//                   className="icons-meeting"
//                   fas
//                   icon="microphone-slash"
//                 />
//               ) : (
//                 <MDBIcon
//                   id="mic-off"
//                   className="icons-meeting"
//                   fas
//                   icon="microphone"
//                 ></MDBIcon>
//               )}
//             </MDBBtn>
//             <MDBBtn
//               color="success"
//               className={"btn-icons-meeting"}
//               onClick={handleEndMeeting}
//             >
//               <MDBIcon className="icons-meeting" fas icon="phone-slash" />
//             </MDBBtn>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default MeetingPage;
