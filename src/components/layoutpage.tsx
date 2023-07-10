
import { useEffect, useRef, useState } from "react";
import Menu from "./menu";
import Canvas from "@/components/canvas";
import StartScreen from "./StartScreen";
import ClickE from "./clickE";
import SettingsMenu from "./SettingsMenu";
import Music from "./Music";
import Controls from "./controls";





const Main = () => {
    const [selectedProject, setSelectedProject] = useState<null | number>(-1);
    const [hoverProject, setHoverProject] = useState(0);
    const [displayE, setDisplayE] = useState<boolean>(false);
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    const [settingsOpened, setSettingsOpened] = useState<boolean>(false);
    const [musicOpened, setMusicOpened] = useState<boolean>(false);
    const [cursorLocked, setCursorLocked] = useState<boolean>(true);
    const [loaded, setLoaded] = useState<number>(0);
    const [hideControls, setHideControls] = useState<boolean>(false);
    let startButtonRef = useRef(null);
    let clickHereRef = useRef(null) 
    
    const checkCursorLock = () => {
        setCursorLocked(document.pointerLockElement !== null);

        setTimeout(checkCursorLock, 100);
    }

    if (typeof window !== "undefined") {
        window.addEventListener("keydown", () => {
            if (cursorLocked) {
                setHideControls(true);
            }
        });
    }


    useEffect(() => console.log(settingsOpened), [settingsOpened]);
    useEffect(checkCursorLock, []);

    return <>
        {
            !hideControls && 
            <Controls/>
        }
        <Music
            show={musicOpened}
            setShow={setMusicOpened}
        />
        {

            <StartScreen
                startButtonRef={startButtonRef}
                loaded={loaded}
            />
        }
        {
            displayE && <ClickE />
        }
        {
            settingsOpened ?
                <SettingsMenu
                    setSettingsOpened={setSettingsOpened}
                /> :
                <></>
        }
        
        <div
            ref={
                clickHereRef
            }
            style={{
                zIndex: 9,
                background: "#0008",
                position: "fixed",
                width: "100vw",
                height: "100vh",
                display:  cursorLocked || menuOpened || settingsOpened || musicOpened ? "none" : "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                fontWeight: "700",
                cursor: "pointer"
            }}
        >
            Click here to continue
        </div>
        
        <Menu
            setParentProject={setSelectedProject}
            setHoverProject={setHoverProject}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
        />
        <Canvas
            loaded={loaded}
            setLoaded={setLoaded}
            selectedProject={selectedProject}
            hoverProject={hoverProject}
            startRef={startButtonRef}
            clickHereRef={clickHereRef}
            setDisplayE={setDisplayE}
            setMenuOpened={setMenuOpened}
            settingsOpened={settingsOpened}
            setSettingsOpened={setSettingsOpened}
            musicOpened={musicOpened}
            setMusicOpened={setMusicOpened}
        />
    </>
}

export default Main;
