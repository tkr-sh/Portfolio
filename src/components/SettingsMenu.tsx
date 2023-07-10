"use client";

import "@/style/settings.scss";
import { useEffect, useState } from "react";
import keys from "@/data/keys.json";
import { useRouter } from "next/router";


interface SettingsData {
    icon: string,
    name: string,
    japan: string,
    func?: string,
}


const settingsArray: SettingsData[] = [
    {
        icon: "resume",
        name: "Resume",
        japan: "ゲームを再開する",
        func: "setSettingsOpened(false)"
    },
    {
        icon: "keyboard",
        name: "Keys",
        japan: "キー",
        func: "setChangeKeys(true)",
    },
    {
        icon: "exit",
        name: "Exit",
        japan: "出口",
        func: "window.location.href = '/document'"
    }
];


interface param {
    setSettingsOpened: (arg: boolean) => void,
}


const SettingsMenu = ({setSettingsOpened}: param) => {
    const [keysMut, setKeysMut] = useState<{[key: string]: string}>(keys);
    const [changeKeys, setChangeKeys] = useState<boolean>(false);


    const listenForKey = (name: string) => {
        const getKey = (e: KeyboardEvent) => {
            setKeysMut(p => {
                const updatedKeyMut = {...p};
                updatedKeyMut[name ?? ""] = e.key;
                console.log(updatedKeyMut);
                return updatedKeyMut;
            });


            let newLocalStorage = JSON.parse(localStorage.getItem("keys") ?? "{}");
            newLocalStorage[name ?? ""] = e.key;

            localStorage.setItem("keys", JSON.stringify(newLocalStorage))

            if (typeof window !== 'undefined')
                window.removeEventListener("keydown", getKey);

            // setChangeKeys(false);
            // setTimeout(() => setChangeKeys(true), 1000);
        }

        if (typeof window !== 'undefined')
            window.addEventListener("keydown", getKey);
    }


    useEffect(() => {
        const localStorageKeys: {[key: string]: string} = JSON.parse(localStorage.getItem("keys") ?? "{}");
        console.log("changed keymut")

        for (const data of Object.keys(localStorageKeys)) {
            if (keysMut[data] !== localStorageKeys[data])
                setKeysMut(p => {
                    p[data] = localStorageKeys[data];
                    return p;
                });
        }
    }, [keysMut]);


    return <main className="settings">
        <button
            className="arrow-back"
            onClick={() => {
                if (changeKeys) {
                    setChangeKeys(false);
                } else {
                    setSettingsOpened(false);
                }
            }}
        >
        ↩
        </button>
    {
        !changeKeys && 
        settingsArray.map(
            (e: any) => 
                <button
                    key={e}
                    onClick={() => eval(e?.func ?? "() => {}")}
                >
                    <img src={`icons/${e.icon}.svg`} alt={e}/>
                    <h1> {e.name} </h1>
                    <h2> {e.japan} </h2>
                </button>
        )
    }
    {
        changeKeys && 
        <div className="keys">
        {
            Object.keys(keysMut).map(
                k => 
                <div className="key" key={k}>
                    <div className="title"> {k} </div>
                    <div className="value">
                        <button onClick={() => listenForKey(k)}>
                            {(keysMut as {[key: string]: string})[k]?.toUpperCase()}
                        </button>
                    </div>
                </div>
            )
        }
        </div>
    }
    </main>
}


export default SettingsMenu;
