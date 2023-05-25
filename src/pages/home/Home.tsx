import unaLogo from'../../assets/logos/LogoUNA.svg.png';

const Home = () => {
    return (
        <div>
            <div className="div-home">
                <h2>UNA Jobs</h2>
                <div className="logo-una">
                    <img src={unaLogo} alt="Logo UNA" />
                </div>
                <h3>Programming IV</h3>
            </div>
        </div>
    )
}

export default Home