"use client";

import "@/style/clickE.scss";


const ClickE = () => {


    return <div className="clickE">
        Press <div className="key">
        {
            (() => {
                const resJSON = JSON.parse(localStorage.getItem("keys") ?? '{"menu": "e"}');
                return resJSON?.menu ?? "E";
            })()
        }</div> to interact with the store.
    </div>
}

export default ClickE;
