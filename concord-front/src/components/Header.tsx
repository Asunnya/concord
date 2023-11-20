const Header = () => {
  return (
    <>

      <header>
        <nav className="navbar-concord">
          <div className="row">
            <div className="col-9">
              <div className="row">
                <div className="col-2">
                  <img
                    className="img-icon"
                    src="../../img/concord-icon.png"
                    alt="logo"
                  />
                </div>
                <div className="col-10">
                  <h1 className="title">
                    Bem vindo ao <p className="concord-stl">Concord!</p></h1>
                </div>
              </div>
            </div>
            <div className="col-3">
                <p className="subtitle">CONCORD É O LUGAR <span className="ideal-stl">IDEAL</span> PARA CONVERSAR COM<p>SEU
                  AMIGO</p> 
                </p>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
