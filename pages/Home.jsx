
export function Home() {
    return (
        <React.Fragment>
            <section className="home">
                <img className="logo-img-white" src="logo.imgs/logo-white.png" alt="AppSus logo" />
                <p>the place to <span className="home-keep">keep</span> and <span className="home-share">share</span> your life<span>.</span></p>
            </section>
            <div className="background-img">
                {/* <img src="assets/img/background-img.avif" /> */}
            </div>
            <img src="../assets/img/background.jpg" alt="" />
        </React.Fragment>
    )
}