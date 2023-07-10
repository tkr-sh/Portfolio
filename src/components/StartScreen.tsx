"use client";

import "@/style/StartScreen.scss"
import { useEffect, useState } from "react";

interface param {
    startButtonRef: any,
    loaded: number,
}


const StartScreen = ({startButtonRef, loaded}: param) => {
    const [startScreenVisible, setStartScreenVisible] = useState<boolean>(true);
    
    useEffect( () => console.error(startButtonRef), [startButtonRef]);

    return startScreenVisible ? <div className="StartScreen">
        <div
            className="loading-bar"
            style={{
                background: loaded === 100 ? "#7c8" : "#fff",
                width: loaded.toFixed(2) + "vw"
            }}
            
        />

        <span className="loading-bar-text" style={{ color: loaded > 50 && loaded !== 100 ? "#000" : "#fff" }}>
            {
                loaded === 100 ? "READY" : loaded.toFixed(2) + "%"
            }
        </span>

        <span>
            Portfolio
        </span>
        <span className="japan">
            ポートフォリオ
        </span>
        <button
            ref={startButtonRef}
            onClick={() => setStartScreenVisible(loaded !== 100)}
            style={{cursor: loaded === 100 ? "pointer": "not-allowed"}}
        >
            {
                loaded !== 100 ?
                    "Loading..." :
                    "Start"
            }
        </button>

        <span className="note">
            The 3D scene can take several seconds to load because of the 3D models.<br/>
            If your computer is not powerful enough, the experience can be slow and unpleasant.<br/>
            If it&apos;s the case, I suggest that you look at the traditionnal <a href="/document" style={{color: "#8f8", textDecoration: "underline"}}>Portfolio</a>.
        </span>
    </div> : <></>;
}

export default StartScreen;
