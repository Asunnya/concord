import { MDBInput } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import Meeting from "../models/Meeting";
import UserVideo from "../models/UserVideo";
import axios from "axios";

function WaitingRoom({ handleStartMeeting }: any) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  // const {data: userCreated, mutate: registerUser, isSuccess: isSuccessUser} = useUserVideo();
  // const {data: meetingCreated, mutate: registerCreate, isSuccess: isSuccessMeeting} = useRegisterMeeting();
  

  const handleCreatingMeeting = async (name: string) => {
    const roomAutoCreated = Math.floor(Math.random() * 100000 + 1).toString();

    const guest_user: UserVideo = {
      username: "Guest",
    };
    const {data: data_user_guest} = await axios.post("http://localhost:8000/user_video/create/", guest_user);
    
    const user: UserVideo = {
      username: name,
    };
    const {data: data_user} = await axios.post("http://localhost:8000/user_video/create/", user);

    const meeting: Meeting = {
      start_time: new Date().toLocaleDateString(),
      end_time: new Date().toLocaleDateString(),
      room_code: roomAutoCreated,
      created_by: data_user.user_video_id,
      guest_user: data_user_guest.user_video_id,
    };

    const {data: data_meeting} = await axios.post("http://localhost:8000/meeting/create/", meeting);
    console.log("starting...")
    setName(user.username);
    setRoom(roomAutoCreated);
    handleStartMeeting(data_user, data_meeting);
  };

  const handleJoinMeeting = async ({ name }: FieldValues) => {
    console.log("joining...")
    console.log(room)

    const { data: data_meeting } = await axios.get(`http://localhost:8000/meeting/getByRoomCode/${room}`);
    const user: UserVideo = {
      username: name,
    };


    const {data: data_user} = await axios.post("http://localhost:8000/user_video/create/", user);
    data_meeting.guest_user = data_user.user_video_id;
    const {data: data_update_meeting} = await axios.put(`http://localhost:8000/meeting/update/${data_meeting.meeting_id}`, data_meeting);
   
    handleStartMeeting(data_user, data_update_meeting);
  };

  return (
    <>
      <section className="waiting-room container-waiting-room">
        <div className="row ">
          <div className="col-12"></div>
          <div className="col-8">
            <div className="row">
              <h1 className="title-waiting">SALA DE ESPERA</h1>
              <div className="row p-4">
                <div className="col-5">
                  <MDBInput
                    className="input-waitingroom"
                    label="Insira seu nome"
                    onChange={(e) => setName(e.target.value)}
                    id="form1"
                    type="text"
                  />
                </div>
                <div className="col-7">
                  <MDBBtn
                    disabled={name.toString().length < 3}
                    onClick={() => {
                      handleCreatingMeeting(name);
                    }}
                    rounded
                    className="btn-waiting-room"
                    color="success"
                  >
                    Criar uma sala
                  </MDBBtn>
                </div>
              </div>
              <div className="row p-2 text-center">
                <div className="col-5"></div>
                <div className="col-7">
                  <p id="ou">OU</p>
                </div>
              </div>
              <div className="row p-4">
                <div className="col-5">
                  <MDBInput
                    className="btn-waiting-room"
                    onChange={(e) => setRoom(e.target.value)}
                    label="Insira o código da sala"
                    id="form1"
                    type="text"
                  />
                </div>
                <div className="col-7">
                  <MDBBtn
                    disabled={room === "" || name === ""}
                    rounded
                    onClick={() => handleJoinMeeting({ name })}
                    className="btn-waiting-room"
                    color="success"
                  >
                    Entrar em uma sala existente
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <p className="subtitle">
                COM CONCORD É FÁCIL BATER AQUELE PAPO{" "}
                <p className="waiting-stl">PRIVADO</p>
              </p>
              <p className="subtitle">
                É FÁCIL, SIMPLES E{" "}
                <p className="waiting-stl">NÃO PRECISA DE CADASTRO</p>
              </p>
              <p className="subtitle">
                <span className="waiting-stl">CONCORDE</span> COM ESSA IDEIA
              </p>
            </div>
          </div>
        </div>
        <section className="dino">
          <iframe
            src="https://chromedino.com/"
            width="100%"
            height="100%"
            loading="lazy"
          />
        </section>
      </section>
    </>
  );
}

export default WaitingRoom;
