import { PlaySong } from "@/threejs/audio";
import { use, useEffect, useRef, useState } from "react";
import musicData from "@/data/musicData.json";
import "@/style/Music.scss";
import Image from "next/image";


interface musicType {
    title: string,
    file: string,
    by: string,
    from: string,
}

const musicDataTyped:  musicType[] = musicData;


const pathPause = "M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z";
const pathPlay = "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z";


const Music = ({show, setShow}: any) => {
    const [songManager, setSongManager] = useState<PlaySong | null>(new PlaySong());
    const [musicIndex, setMusicIndex] = useState<number>(0);
    const [songDuration, setSongDuration] = useState<number>(0);
    const [timeListening, setTimeListening] = useState<number>(0);
    const [pause, setPause] = useState<boolean>(false);
    const songDurationRef = useRef<number>(0);
    const timeListeningRef = useRef<number>(0);
    const pauseRef = useRef<boolean>(false);
    
    useEffect(() => console.log(songDuration), [songDuration]);
    
    useEffect(() => { pauseRef.current = pause }, [pause]);
    useEffect(() => { songDurationRef.current = songDuration }, [songDuration]);
    useEffect(() => { timeListeningRef.current = timeListening }, [timeListening]);

    const contentUpdate = () => {
        updateTimeListening();

        setTimeout(() => contentUpdate(), 1_000);
    }

    const updateTimeListening = () => {
        
        if (pauseRef.current) return;

        if (timeListeningRef.current > 2 && timeListeningRef.current >= songDurationRef.current) {
            setMusicIndex(p => (p + 1) % musicDataTyped.length);
            setTimeListening(0);
        } else {
            setTimeListening(p => p + 1);
        }
    }

    const convertToMMSS = (number: number) => {
        const minutes = Math.floor(number / 60);
        const seconds = number % 60;

        // Add leading zero if necessary
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        return formattedMinutes + ":" + formattedSeconds;
    }


    useEffect(() => {
        songManager?.changeSong("zenzense", setSongDuration);


        setTimeout(() => { contentUpdate() }, 1000);

        console.log(songDuration);

        return () => setSongManager(null);
    }, []);


    useEffect(() => {
        if (songManager !== null) {
            console.log("gitu");
            console.log(musicIndex)
            songManager.changeSong(musicDataTyped[musicIndex].file, setSongDuration);
            setTimeListening(0);
        }
    }, [musicIndex, songManager]);


    return show && <main className="Music">
        <button
            style={{
                backgroundColor: "#fff7 !important"
            }}
            className="arrow-back"
            onClick={() => {
                setShow(false);
            }}
        >
        ↩
        </button>
        <div className="icon-content">
            <img
                alt="photo-cover"
                src={`audio/img/${musicDataTyped[musicIndex].file}.jpg`}
            />
        </div>
        <div className="info">
            <ul>
                <li>
                    <b>Title</b>: {musicDataTyped[musicIndex].title}
                </li>
                <li>
                    <b>By</b>: {musicDataTyped[musicIndex].by}
                </li>
                <li>
                    <b>From</b>: {musicDataTyped[musicIndex].from}
                </li>
            </ul>
        </div>
        <div className="track">
            <div>
                {convertToMMSS(timeListening)}
                <div className="timer">
                    <div
                        style={{
                            width: (100 * timeListening / songDuration) + "%"
                        }}
                        className="progression"
                    />
                </div>
                {convertToMMSS(Math.max(Math.round(songDuration - timeListening), 0))}
            </div>
            <div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    onClick={() => setMusicIndex(p => p === 0 ? musicDataTyped.length - 1 : p - 1 )}
                >
                    <path d="M493.6 445c-11.2 5.3-24.5 3.6-34.1-4.4L288 297.7V416c0 12.4-7.2 23.7-18.4 29s-24.5 3.6-34.1-4.4L64 297.7V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V96C0 78.3 14.3 64 32 64s32 14.3 32 32V214.3L235.5 71.4c9.5-7.9 22.8-9.7 34.1-4.4S288 83.6 288 96V214.3L459.5 71.4c9.5-7.9 22.8-9.7 34.1-4.4S512 83.6 512 96V416c0 12.4-7.2 23.7-18.4 29z"/>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    onClick={() => {songManager?.pause(); setPause(p => !p)}}
                >
                    <path d={!pause ? pathPause : pathPlay}/>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    onClick={() => setMusicIndex(p => (p + 1) % musicDataTyped.length)}
                >
                    <path d="M18.4 445c11.2 5.3 24.5 3.6 34.1-4.4L224 297.7V416c0 12.4 7.2 23.7 18.4 29s24.5 3.6 34.1-4.4L448 297.7V416c0 17.7 14.3 32 32 32s32-14.3 32-32V96c0-17.7-14.3-32-32-32s-32 14.3-32 32V214.3L276.5 71.4c-9.5-7.9-22.8-9.7-34.1-4.4S224 83.6 224 96V214.3L52.5 71.4c-9.5-7.9-22.8-9.7-34.1-4.4S0 83.6 0 96V416c0 12.4 7.2 23.7 18.4 29z"/>
                </svg>
            </div>
        </div>
    </main>
}


export default Music;
