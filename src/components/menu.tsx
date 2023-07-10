"use client";

// All imports
import Canvas from "@/components/canvas";
import "@/style/Menu.scss";
import { useEffect, useState } from "react";
import menuShop from "@/data/menuShop.json";
import imgCorr from "@/data/imgCorr.json";
import Image from "next/image";

// Typing menuShop
interface ShopCategory {
    title: string,
}
interface CategoryStack {
    link: string,
    img: string,
}


// Type of JSON
const menuShopTyped: ShopCategory[] = menuShop as any;
const imgCorrTyped: {[key: string]: CategoryStack} = imgCorr as any;


const Menu = ({ setParentProject, setHoverProject, menuOpened, setMenuOpened }: any) => {
    const [viewProject, setViewProject] = useState<null | number>(null);

    const checkIfMenuOpened = (up: boolean, key: string) => {
        // if (key !== 'e') {
        //     setMenuOpened(false);
        //     return;
        // } else {
        //     setMenuOpened(p => !p);
        // }
    }

    useEffect(() => {
        if (typeof window !== "undefined")
            window.addEventListener("keyup", (event: KeyboardEvent) => checkIfMenuOpened(true, event.key));
    }, []);

    useEffect(() => {
        if (menuOpened)
            setParentProject(-1);
    }, [menuOpened])

    return menuOpened && <main className="Menu">
        <button
            className="arrow-back"
            onClick={() => {
                console.log(viewProject);
                if (viewProject === null) {
                    setMenuOpened(false);
                    setParentProject(null);
                } else {
                    setParentProject(-1);
                    setViewProject(null);
                }
            }}
        >
        ↩
        </button>
    {
        viewProject === null && menuShopTyped.map(
            (e: ShopCategory, i: number) => <>
                <div
                    onMouseEnter={() => setHoverProject(i)}
                    onClick={() => {setViewProject(i); setParentProject(i)}}
                >
                    <span></span>
                </div>
            </>
        )
    }
    {
        viewProject !== null &&
        <aside>
            <h1>
                {menuShop[viewProject].title}
            </h1>
            <div className="spacer"/>
            <h5>Since {menuShop[viewProject].date}</h5>
            <p>
                {menuShop[viewProject].description}
            </p>

            <h2>Stack</h2>
            <div className="spacer small"/>
            <div className="content-lang">
            {
                typeof (menuShop[viewProject].stack ?? [""])[0] === 'string' ?
                (menuShop[viewProject].stack ?? [""])
                .map((e: any) =>
                    <a href={e.toLowerCase() in imgCorrTyped ? imgCorrTyped[e.toLowerCase()]?.link : "uwu.com"} key={e}>
                        <img
                            alt={e}
                            title={e}
                            src={`img/${e.toLowerCase() in imgCorrTyped ? imgCorrTyped[e.toLowerCase()].img : e}.svg`.toLowerCase()}
                        />
                    </a>
                ):
                (menuShop[viewProject].stack ?? [""])
                .map((e: any) =>
                    <div className="elem" key={e}>
                    {
                    e.map((categoryStack: any) => 
                        <>
                            <h3 key={categoryStack}>{categoryStack.title}</h3>
                            <div className="content-lang small">
                            {
                                categoryStack.stack.map((f: any) =>
                                    <a href={f.toLowerCase() in imgCorrTyped ? imgCorrTyped[f.toLowerCase()]?.link : "uwu.com"} key={f}>
                                        <img
                                            alt={f}
                                            title={f}
                                            src={`img/${f.toLowerCase() in imgCorrTyped ? imgCorrTyped[f.toLowerCase()].img : f}.svg`.toLowerCase()}
                                        />
                                    </a>
                                )
                            }
                            </div>
                        </>
                    )
                    }
                    </div>
                )
            }
            </div>

            <br/>
            <h2>Link</h2>
            <div className="spacer small"/>
            <a href={`https://github.com/aderepas/${menuShop[viewProject].link}`}>
                https://github.com/aderepas/{menuShop[viewProject].link}
            </a>
        </aside>
    }
    </main>
}


export default Menu;
