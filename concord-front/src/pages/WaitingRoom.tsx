import { MDBInput } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";

const WaitingRoom = ({handleCreatingMeeting, handleJoinMeeting}) => {

  const [name, setName] = useState("")
  const [room, setRoom] = useState("")


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
                  <MDBBtn  onClick={( )=> {
                    handleCreatingMeeting(name);
                  }}
                   rounded className="btn-waiting-room" color="success">Criar uma sala</MDBBtn>
                </div>
              </div>
              <div className="row p-2 text-center">
                <div className="col-5">
                </div>
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
                  <MDBBtn rounded onClick={()=> handleJoinMeeting(room, name)} className="btn-waiting-room"  color="success">Entrar em uma sala existente</MDBBtn>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
          <div className="row">
              <p className="subtitle">
                COM CONCORD É FÁCIL BATER AQUELE PAPO <p className="waiting-stl">PRIVADO</p> 
              </p>
              <p className="subtitle">
                É FÁCIL, SIMPLES E <p className="waiting-stl">NÃO PRECISA DE CADASTRO</p></p>
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
};

export default WaitingRoom;
