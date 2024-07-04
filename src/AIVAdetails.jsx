import React from 'react'

export default function AIVAdetails() {
    const getdocumentitle = () => {
        document.title ='AIVA'
    }
    return (
        <>
            <div className="posts" onLoad={getdocumentitle()}>
                <div className="videoplayer">
                    <video src="https://firebasestorage.googleapis.com/v0/b/wingedwordsadmin.appspot.com/o/aiva.mp4?alt=media&token=06d49060-e40e-411f-a10b-3a47ea8c2989" autoPlay muted loop></video>
                </div>
                <div className="bottomtext">
                    <h1>
                        AIVA something

                    </h1>
                </div>
                <div className="aivadetails">
                    <div className="aivasubs">
                        <div className="postbuttontext">Subscribe</div>
                    </div>
                </div>
            </div>
        </>
    )
}
