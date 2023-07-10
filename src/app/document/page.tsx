"use client";

import ShowObject from "@/components/ShowObject";
import SmallImage from "@/components/SmallImage";
import "@/style/Document.scss";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import menuShop from "@/data/menuShop.json";
import imgCorr from "@/data/imgCorr.json";
import Project from "@/components/Project";



// --- TYPES --- //
interface contentStackType {
    title?: string,
    stack: string[],
}

interface dataProjectType {
    title: string,
    date: string,
    description?: string,
    link: string,
    stack?: string[] | contentStackType[][],
}

interface imgCorrType {
    img: string,
    link: string
}
////////////////////

// Data types
const dataProject: dataProjectType[] = menuShop;
const imageCorrespondance: {[key: string]: imgCorrType} = imgCorr;

// Header options
const headerSections = [
    <span key="Home"> Home </span>,
    <span key="About"> About </span>,
    <span key="Projects"> Projects </span>,
    <span key="Contact"> Contact </span>,
]






/*
 * Component
 */
const Document = () => {
    // States
    const [indexSection, setIndexSection] = useState<number>(0);
    const [selectedLeft, setSelectedLeft] = useState<number>(0);
    const [selectedWidth, setSelectedWidth] = useState<number>(90);
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
    const [windowInnerWidth, setWindowInnerWidth] = useState<number>(typeof window === "undefined" ? 0 : window.innerWidth);
    const [windowInnerHeight, setWindowInnerHeight] = useState<number>(typeof window === "undefined" ? 0 : window.innerHeight);
    const [aboutIcon, setAboutIcon] = useState<string>("python");
    
    // References
    const sectionsRef = useRef<Array<HTMLLIElement | null>>([]);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const contentImageRef = useRef<HTMLDivElement | null>(null);
    const trianglesRef = useRef<(HTMLDivElement | null)[]>([]);
    const barRef = useRef<HTMLDivElement | null>(null);
    const projectRef = useRef<{[key: string]: HTMLDivElement | null}>({});
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const contactRef = useRef<HTMLDivElement | null>(null);




    useEffect(() => {
        setTimeout(updateSelected, 500);
    },  []);


    // When the mouse move
    if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e: MouseEvent) => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
        
        const tempMouseX = e.clientX;
        const tempMouseY = e.clientY

        if (contentImageRef.current !== null) {
            contentImageRef.current.style.transform = `translate(${
                50 * (( tempMouseX - windowInnerWidth / 2) / windowInnerWidth)}px, ${
                50 * (( tempMouseY - windowInnerHeight / 2) / windowInnerHeight) + 50}px)`

        }

        if (imgRef.current !== null) {
            imgRef.current.style.transform = `translate(${
                100 * (( tempMouseX - windowInnerWidth / 2) / windowInnerWidth)}px, ${
                100 * (( tempMouseY - windowInnerHeight / 2) / windowInnerHeight) + 50}px)`
        }

        if (trianglesRef.current !== null && trianglesRef.current.length > 0) {
            trianglesRef.current.map(
                t => t !== null && ( 
                    t.style.transform = `translate(${
                    100 * (( tempMouseX - windowInnerWidth / 2) / windowInnerWidth)}px, ${
                    100 * (( tempMouseY - windowInnerHeight / 2) / windowInnerHeight) + 50}px)`
                )
            )
        }

        if (barRef.current !== null) {
            barRef.current.style.top = tempMouseY + "px";
        }
    });



    // When the user resize the page
    window.addEventListener("resize", (e: Event) => {
        updateSelected()
        setWindowInnerWidth(window.innerWidth);
        setWindowInnerHeight(window.innerHeight);
    });


    // When the user scroll
    window.addEventListener("scroll", (e: Event) => {
        const scroll: number = window.scrollY;

        if (aboutRef.current === null || contactRef.current === null) return;
        
        if (scroll + 100 < aboutRef.current.offsetTop) {
            setIndexSection(0);
        } else if (scroll + 100 < aboutRef.current.offsetTop + aboutRef.current.clientHeight) {
            setIndexSection(1);
        } else if (scroll + 100 < contactRef.current.offsetTop){
            setIndexSection(2);
        } else {
            setIndexSection(3);
        }
    });
    }

    /*
     * Update the scroll when clicking on the button
     */
    const updateScroll = (index: number) => {

        if (typeof window === "undefined") return;

        switch (index) {
            case 0:
                window.scrollTo(0, 0);
                break;
            case 1:
                window.scrollTo(0, aboutRef.current?.offsetTop ?? 0);
                break;
            case 2:
                window.scrollTo(0, (aboutRef.current?.offsetTop ?? 0) + (aboutRef.current?.clientHeight ?? 0) - 100);
                break;
            case 3:
                window.scrollTo(0, contactRef.current?.offsetTop ?? 0);
                break;
        }
    }


    const updateSelected = () => {
        if (sectionsRef !== null && sectionsRef.current !== null && sectionsRef.current?.length > 0) {
            console.log(sectionsRef.current)

            const element = sectionsRef.current[indexSection]?.getBoundingClientRect();
            console.log(element)
            
            if ((element?.width ?? 90) > 150) {
                setTimeout(() => updateSelected(), 100);
            } else {
                setSelectedWidth(element?.width ?? 90);
                setSelectedLeft(element?.left ?? 0);
            }
        } else {
            setTimeout(() => updateSelected(), 100);
        }
    }


    useEffect(() => {
        updateSelected()
    }, [indexSection]);



    return <main className="Document">
        {/* MAIN HEADER */}
        <header>
            <span className="title">
                Porfolio
            </span>
            <ul>
            {
                headerSections.map(
                    (e,i) => 
                    <li
                        key={i}
                        ref={el => sectionsRef.current[i] = el}
                        onClick={
                            (event: any) => { setIndexSection(i); updateScroll(i) }
                        }
                        className={i === indexSection ? "current" : "nothing"}
                    >
                    {
                        e
                    }
                    </li>
                )
            }
            </ul>

            <div
                style={{
                    left: selectedLeft,
                    width: selectedWidth
                }}
                className="selected"
            />
        </header>


        {/* HOME SECTION */}
        <section className="home">
            {
                mouseY  + (typeof window === "undefined" ? 0 : window.scrollY) < windowInnerHeight &&
                <div
                    className="cursor"
                    style={{
                        top: mouseY,
                        left: mouseX
                    }}
                />
            }
            <div className="bg-content">
                <div className="bg">
                {
                    Array(Math.floor(windowInnerHeight * windowInnerWidth / 102 / 100 )).fill(1).map((x, y) => x + y).map(
                        i => <div key={i}/>
                    )
                }
                </div>
            </div>
            <div className="description"> 
                <h1>
                    Hi,<br/>
                    <div style={{display: "flex"}}>
                            I&apos;m
                            <div className="name">
                                {
                                    "Axel DEREPAS".split('').map((c,i) =>
                                        <span key={i} className="outer-char">
                                            <span className="char">
                                                {c}
                                            </span>
                                        </span>
                                    )
                                }
                            </div>
                    </div>
                </h1>
                <p>
                    Or your might also know me as &quot;TKirishima&quot;.<br/> 
                    I&apos;m determined to evolve as a professional full-stack web developer and to acquire the necessary skills in all aspects of web application development.<br/>
                    This page is the web version of my portfolio. You can consult the 3D version by clicking on the button.<br/>
                </p>
                <a href="/">
                    <button>
                        3D Portfolio
                    </button>
                </a>
            </div>
            <div>
                <div
                    className="content-image"
                    ref={contentImageRef}
                >
                    <img
                        src="img/tkai-person.png"
                        alt="tkirishima"
                        ref={imgRef}
                    />
                </div>
            </div>
        </section>


        {/* ABOUT ME */}
        <section className="about" ref={aboutRef}>
            <div className="hover-line" ref={barRef}/>
            {
                [[80, 90]]
                .map((e,i) =>
                    <div
                        key={i}
                        ref={el => trianglesRef.current[i] = el}
                        className="triangle"
                        style={
                            {
                                top: e[0] + "%",
                                left: e[1] + "%"
                            }
                        }
                    />
                )
            }
            <div>
                <h1>About me</h1>
                <p>
                    Greetings! I&apos;m Axel, and my passion lies in the world of computer science. I embarked on my coding journey at the age of 15, with  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("python")}><span className="hover-word">Python</span></span> being my first language. As I delved deeper, I explored the fundamentals of web development, including  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("html")}><span className="hover-word">HTML</span></span>,  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("css")}><span className="hover-word">CSS</span></span>, and  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("javascript")}><span className="hover-word">JavaScript</span></span>.
                </p>

                <p>
                    My path led me to  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("esilv")}><span className="hover-word">ESILV</span></span>, where my genuine interest in computer science took root.
                    The program primarily focused on C#, and during the holidays of my first year, I further expanded my knowledge by doing the S5 and S6 of ESILV which was about C and C++ .<br/>
                    It was during this time that I discovered the captivating realm of code golf, a competitive programming practice that challenges participants to create the most concise code possible.<br/>
                    Through this pursuit, I encountered languages like  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("ruby")}><span className="hover-word">Ruby</span></span>, which broadened my programming horizons.<br/>
                    Inspired by my passion, I went on to create  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("weekgolf")}><span className="hover-word">WeekGolf</span></span>, an innovative code golf platform with weekly golfing problem.<br/>
                    Initially developed using  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("php")}><span className="hover-word">PHP</span></span> and  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("mysql")}><span className="hover-word">MySQL</span></span>, WeekGolf demanded extensive expertise and taught me valuable lessons in Linux, server management, and Docker utilization.<br/>
                </p>


                <p>
                    By doing WeekGolf and other projects in Vanilla Javascript and CSS, I understood the utility of JavaScript Framework, <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("ts")}><span className="hover-word">TypeScript</span></span>, <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("sass")}><span className="hover-word">Sass</span></span> and testing code, which I always use/do now.<br/>
                </p><p>
                    Over time, I&apos;ve also really started to develop a love for open source and GNU/Linux.<br/>
                    Today, my <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("rice")}><span className="hover-word">setup</span></span> primarily revolves around <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("arch")}><span className="hover-word">Arch</span></span>-based and  <span className="outer-hover-word" onMouseEnter={() => setAboutIcon("debian")}><span className="hover-word">Debian</span></span>-based distributions.
                        </p><p>
                    To learn more about these various projects, keep scrolling!
                </p>
            </div>
            <div>
                <ShowObject
                    objectName={aboutIcon}
                />
            </div>
        </section>




        {/* WeekGolf */}
        <Project
            formatName="WeekGolf"
            sectionName="weekgolf"
            forwardRef={projectRef}
            smallImages={
                [
                    {
                        type:"square",
                        color:"#77ff77",
                        style:{top: "5%", left: "3%"}

                    },
                    {
                        type:"circle",
                        color:"#77ff77",
                        style:{bottom: "10%", right: "15%"}

                    },
                    {
                        type:"zigzag",
                        color:"#77ff77",
                        style:{top: "10%", right: "25%"}
                    },
                    {
                        type:"zigzag",
                        color:"#77ff77",
                        style:{bottom: "10%", left: "25%"}
                    }
                ]
            }
            images={
                [
                    {
                        imagePath: "_weekgolf1.png",
                        description: "Home page of WeekGolf",
                    },
                    {
                        imagePath: "_weekgolf2.png",
                        description: "Profile of a user",
                    },
                    {
                        imagePath: "_weekgolf3.png",
                        description: "A weekly problem",
                    },
                ]
            }
            p={
                <p>
                    WeekGolf (<a href="https://www.weekgolf.net">https://www.weekgolf.net</a>), is a Web-Site about <b>code golf</b> with weekly problem that is running since July <b>2022</b>.<br/>
                    There are currently over <b>50</b> problems and <b>30</b> languages available.<br/>
                    Code golf is a programming practice where participants solve problems by writing code that is as <b>short</b> as possible while still maintaining functionality, often employing language tricks and <b>creative</b> approaches.<br />
                    At first, the front was without Framework, and the back was done with PHP, but then I switched to <b>Express</b> and <b>Solid.JS</b> (a framework close to React with more speed)<br/>
                    So that each person can run programs in weekgolf, I used <b>Docker</b> to ensure that each program is run in a reproducible environment.<br/>

                </p>
            }
            stack={
                dataProject[0].stack !== undefined && 
                (typeof dataProject[0].stack[1] !== 'string') &&
                dataProject[0]
                    ?.stack[1]
                    ?.map(e => e.stack)
                    ?.flat(1) ||
                []
            }
            imageCorrespondance={imageCorrespondance}
            index={1}
            link={"https://github.com/aderepas/WeekGolf"}
        />


        {/* Custom CodinGame Client */}
        <Project
            formatName="Custom Client"
            sectionName="customclient"
            forwardRef={projectRef}
            smallImages={
                [
                    {
                        type: "circle",
                        color: "#ffff77",
                        style: {top: "6%", left: "2%"},
                    },
                    {
                        type: "circle",
                        color: "#ffff77",
                        style: {bottom: "14%", right: "16%"},
                    },
                    {
                        type: "zigzag",
                        color: "#ffff77",
                        style: {top: "5%", right: "35%"},
                    },
                    {
                        type: "square",
                        color: "#ffff77",
                        style: {bottom: "15%", left: "20%"},
                    }
                ]
            }
            images={
                [
                    {
                        imagePath: "_CustomClient1.png",
                        description: "How this client work",
                    },
                    {
                        imagePath: "_CustomClient2.png",
                        description: "#1 World wide using this cilent",
                    },
                    {
                        imagePath: "_CustomClient3.png",
                        description: "Set up example with Visual Studio Code",
                    },
                ]
            }
            p={
                <p>
                    This custom client for codingame (<a href="https://codingame.com">https://codingame.com</a>) was created to code faster in clash of code.<br/>
                    It set&apos;s up a <b>proxy</b>, that get all trafic going through the browser to get all the data of the problem (title, statement, test cases).<br/>
                    After that, I also created an <b>extension</b> of Python, so that you can do <b>more</b> things by typing <b>less</b><br/>.
                    This is made possible by modifying the <b>AST</b> and creating custom <b>classes</b>, and exporting everything in one file.<br/>
                    When the user want to test the validity of the code, he can press a key, and a <b>docker</b> container will launch to execute the program with all different test cases<br/>
                    If the program is valid, it will send it to CodinGame.<br/>
                    This client is actually very good, since I got the <b>#1</b> place in the world using it.<br/>
                </p>
            }
            stack={
                dataProject[4].stack !== undefined && 
                (typeof dataProject[4].stack[0] === 'string') &&
                (dataProject[4]
                    ?.stack as (any[]))
                    ?.filter((e: contentStackType[] | string) => (typeof e) === 'string') ||
                []
            }
            imageCorrespondance={imageCorrespondance}
            index={2}
            link={"https://github.com/aderepas/CustomCodinGameClient"}
        />



        {/* Flag Fight */}
        <Project
            formatName="Flag Fight"
            sectionName="flagfight"
            forwardRef={projectRef}
            smallImages={
                [
                    {
                        type: "zigzag",
                        color: "#77eedd",
                        style: {top: "4%", left: "2%"},
                    },
                    {
                        type: "circle",
                        color: "#77eedd",
                        style: {bottom: "14%", right: "16%"},
                    },
                    {
                        type: "square",
                        color: "#77eedd",
                        style: {top: "5%", right: "35%"},
                    },
                    {
                        type: "square",
                        color: "#77eedd",
                        style: {bottom: "15%", left: "20%"},
                    }
                ]
            }
            images={
                [
                    {
                        imagePath: "_FlagFight1.png",
                        description: "Default page of Flag Fight",
                    },
                    {
                        imagePath: "_FlagFight2.png",
                        description: "Home page for a user that logged in",
                    },
                    {
                        imagePath: "_FlagFight3.png",
                        description: "Example of two players playing together with socket",
                    },
                ]
            }
            p={
                <p>
                    FlagFight (<a href="https://www.flagfight.world">https://www.flagfight.world</a>), is a Web-Site about <b>Flags & Quiz</b>.<br/>
                    There are over <b>300</b> flags, and the goal of this website is for people to learn all the flags in the world.<br/>
                    There are different ways to play:
                    <ul>
                        <li>
                            Online, with some random people
                        </li>
                        <li>
                            Online, by inviting your friends to play with you
                        </li>
                        <li>
                            Offline, by training on some specific flags
                        </li>
                    </ul>
                    FlagFight also has a <b>shop</b> where you can buy flags or messages to <b>customize</b> your experience.<br/>
                    Players can interact in real time using web <b>socket</b>.
                </p>
            }
            stack={
                dataProject[1].stack !== undefined && 
                (typeof dataProject[1].stack[0] !== 'string') &&
                dataProject[1]
                    ?.stack[0]
                    ?.map(e => e.stack)
                    ?.flat(1) ||
                []
            }
            imageCorrespondance={imageCorrespondance}
            index={3}
            link={"https://github.com/aderepas/FlagFightWorld"}
        />


        {/* Lang Fetch */}
        <Project
            formatName="Lang Fetch"
            sectionName="langfetch"
            forwardRef={projectRef}
            smallImages={
                [
                    {
                        type: "circle",
                        color: "#44EE33",
                        style: {top: "6%", left: "2%"},
                    },
                    {
                        type: "circle",
                        color: "#44EE33",
                        style: {bottom: "14%", right: "16%"},
                    },
                    {
                        type: "zigzag",
                        color: "#44EE33",
                        style: {top: "5%", right: "35%"},
                    },
                    {
                        type: "square",
                        color: "#44EE33",
                        style: {bottom: "15%", left: "20%"},
                    }
                ]
            }
            images={
                [
                    {
                        imagePath: "_langfetch1.png",
                        description: "Example of usage with flag and default configuratin",
                    },
                    {
                        imagePath: "_langfetch2.png",
                        description: "Example of config file",
                    },
                    {
                        imagePath: "_langfetch3.png",
                        description: "langfetch in the AUR (Arch User Repository)",
                    },
                ]
            }
            p={
                <p>
                    Langfetch is a tool for <b>UNIX</b> system to display the version of <b>programming languages</b> in their system.<br/>
                    The tool support wide variety of customization and was inspired by <b>neofetch</b>.<br/>
                    To display the ASCII art, a Python program analyses and <b>SVG</b> which correspond to the logo of the programming language and converts it to a set of <b>characters</b>.<br/>
                    The tool is mostly written in Python and is available in the <b>AUR</b> (the Arch User repository).<br/>
                    Therefore, you can install it with `yay -S langfetch` for example<br/>
                </p>
            }
            stack={
                dataProject[3].stack !== undefined && 
                (typeof dataProject[3].stack[0] === 'string') &&
                (dataProject[3]
                    ?.stack as (any[]))
                    ?.filter((e: contentStackType[] | string) => (typeof e) === 'string') ||
                []
            }
            imageCorrespondance={imageCorrespondance}
            index={4}
            link={"https://github.com/aderepas/LangFetch"}
        />


        {/* Portfolio */}
        <Project
            formatName="Portfolio"
            sectionName="portfolio"
            forwardRef={projectRef}
            smallImages={
                [
                    {
                        type:"square",
                        color:"#a7c",
                        style:{top: "5%", left: "3%"}

                    },
                    {
                        type:"circle",
                        color:"#a7c",
                        style:{bottom: "10%", right: "15%"}

                    },
                    {
                        type:"zigzag",
                        color:"#a7c",
                        style:{top: "10%", right: "25%"}
                    },
                    {
                        type:"zigzag",
                        color:"#a7c",
                        style:{bottom: "10%", left: "25%"}
                    }
                ]
                
            }
            images={
                [
                    {
                        imagePath: "_portfolio1.png",
                        description: "Loading screen",
                    },
                    {
                        imagePath: "_portfolio2.png",
                        description: "View under the torii",
                    },
                    {
                        imagePath: "_portfolio3.png",
                        description: "View from the sky",
                    },
                ]
            }
            p={
                <p>
                    This portfolio has <b>2</b> parts. The one that you&apos;re looking at, and the 3D part (<a href="https://tkirishima.com/">https://tkirishima.com/</a>).<br/>
                    The 3D part of this portfolio was made by modeling in <b>Blender</b> and importing the models in the web browser using <b>Three.JS</b><br/>
                    This 3D world demonstrate that it&apos;s possible to create a <b>first person view</b> world in a web browser.<br/>
                    The only inconvenience for now, is that, it requires a lot of <b>ressources</b> and even if some chromium based browser can now use the GPU not every computer has a GPU.<br/>
                    The reason why this page exists is because I know that not every person can run a 3D world like the one that I made.<br/>
                    To create this 3D environment I was inspired by some traditional types of architectures in <b>Japan</b>.<br/>
                </p>
            }
            stack={
                dataProject[2].stack !== undefined && 
                (typeof dataProject[2].stack[0] === 'string') &&
                (dataProject[2]
                    ?.stack as (any[]))
                    ?.filter((e: contentStackType[] | string) => (typeof e) === 'string') ||
                []
            }
            imageCorrespondance={imageCorrespondance}
            index={5}
            link={"https://github.com/aderepas/Portfolio"}
        />


        <section className="contact" ref={contactRef}>
            <div>
                <h1>Contact me</h1>
                <div className="icons">
                    <a href="https://github.com/aderepas">
                        <img src="icons/github.svg"/>
                    </a>
                    <a href="mailto:tkirishima@proton.me">
                        <img src="icons/mail.svg"/>
                    </a>
                    <a href="https://www.codingame.com/profile/5aa2aa521102866114371c208d6a45c13550264">
                        <img src="icons/codingame.svg"/>
                    </a>
                </div>
            </div>
        </section>
    </main>
}



export default Document;
