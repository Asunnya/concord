import { MDBIcon } from "mdb-react-ui-kit";

const MeetingPage = () => {
  return (
    <>
      <section className="meeting-room container-meeting-room">
        <div className="row">
          <h1>SALA: </h1>
        </div>
        <div className="row">
          <div className="col-6 video-user text-end">
            <video></video>
            <p className="name-meeting">Nome do usuário</p>
          </div>
          <div className="col-6 video-friend text-end">
            <video></video>
            <p className="name-meeting">Nome do amigo</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <MDBIcon className="icons-meeting" fas icon="video" />
            <MDBIcon className="icons-meeting" fas icon="microphone" />
            <MDBIcon className="icons-meeting" fas icon="phone-slash" />
          </div>
        </div>
      </section>
    </>
  );
};

export default MeetingPage;
