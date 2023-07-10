"use client";

import "@/style/clickE.scss";
import keys from "@/data/keys.json"

const keysTyped: {[key: string]: string} = keys;

const Controls = () => {
    const allKeys: {[key: string]: string} = {...keysTyped, ...JSON.parse(localStorage.getItem("keys") ?? '{}')}

    return <div className="clickE">
        The keys to move are:

        <div className="content-key">
        {
            ["Forward", "Left", "Right", "Back", "Exit"]
            .map(
                k =>
                    <div key={k}>
                        <div className="key">
                        {
                            allKeys[k.toLowerCase()].toUpperCase()
                        }
                        </div>
                        {
                           " - " + k
                        }
                    </div>
            )
        }
        </div>
    </div>
}

export default Controls;
