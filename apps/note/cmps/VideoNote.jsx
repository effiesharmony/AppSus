export function VideoNote({ onAddInfo, note }) {

    // function getYoutubeId() {
    //     if (note.info.url) {
    //         const url = new URL(note.info.url)
    //         console.log(ur)
    //         if (url.hostname === 'www.youtube.com') {
    //             const params = new URLSearchParams(url.search)
    //             return params.get('v')
    //         }
    //     }
    // }

    return (
        <div className="vid-note">
            <input onInput={(ev) => onAddInfo(ev.target.value)} type="text" placeholder="Enter Video URL..." id="noteVid" value={note.info.url ? note.info.url : ''} />
            <meta property="og:image" content="https://www.youtube.com/watch?v=SF7KCsvcw2g&ab_channel=AsapSCIENCE" />
            {/* <iframe width="420" height="315"
                src={`https://www.youtube.com/embed/${getYoutubeId()}`}>
            </iframe> */}
        </div>
    )
}