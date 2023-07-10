


interface param {
    type: string,
    color: string,
    style: any,
}

const SmallImage = ({ type, color, style }: param) => {

    const getSVG = () => {
        switch (type) {
            case "circle":
                return <svg xmlns="http://www.w3.org/2000/svg" width="979.586" height="979.729" viewBox="0 0 259.182 259.22"><path d="M122.983 259.057c-39.347-2.105-75.271-21.641-98.44-53.535-12.623-17.375-20.847-38.196-23.514-59.531C-5.079 97.147 16.309 49.9 57.102 22.127c37.887-25.796 88.011-29.319 129.249-9.085 12.947 6.353 23.464 13.781 33.698 23.802 6.177 6.048 10.713 11.318 15.265 17.733 19.904 28.051 27.744 62.389 22.065 96.636-8.353 50.374-46.402 91.601-96.031 104.051-12.35 3.098-26.042 4.452-38.365 3.793zm11.016-32.363c21.162-1.078 39.513-7.971 56.361-21.172 3.858-3.023 11.819-10.995 15.116-15.136 12.994-16.324 20.322-35.767 21.195-56.235.753-17.665-2.871-34.248-10.804-49.433-11.666-22.331-31.662-39.426-55.365-47.334-10.338-3.449-19.649-4.936-30.904-4.936-11.437 0-20.704 1.504-31.315 5.082-19.211 6.479-36.541 19.46-48.188 36.097-8.229 11.754-13.57 24.455-16.143 38.382-2.029 10.986-2.029 24.168 0 35.154 8.163 44.199 45.763 77.237 90.486 79.507l4.366.234c.218.018 2.556-.077 5.195-.211z" style={{fill: color}}/></svg>;
            case "square":
                return <svg xmlns="http://www.w3.org/2000/svg" width="990.002" height="985.002" viewBox="0 0 261.938 260.615"><path d="M0 130.307V0h130.969 130.969v130.307 130.307H130.969 0zm236.333.661V25.242H130.969 26.617v105.726 106.591h104.352 105.364z" style={{fill: color}}/></svg>
            case "zigzag":
                return <svg xmlns="http://www.w3.org/2000/svg" width="238.122" height="638.135" viewBox="0 0 63.003 168.84"><path d="M61.33 118.829l-20.591 11.048-18.989 10.18c-.039.033 8.236 4.498 18.389 9.922l18.688 10.07c.21.191-3.595 7.787-4.381 8.745-.306.373-3.391-1.212-27.299-14.029L.205 140.083c.006-.127 9.184-5.124 20.395-11.106l20.393-11.033c.005-.087-9.215-5.087-20.489-11.113L0 95.739c-.004-.075 9.22-5.075 20.498-11.111l20.501-11.108c-.003-.074-9.232-5.067-20.509-11.097L.229 51.217c.134-.134 9.312-5.096 20.397-11.026l20.167-11.015c.01-.174-27.086-14.869-35.959-19.502L3.72 9.093l2.445-4.547L8.61 0l26.979 14.431 27.178 14.614c.109.101-8.999 5.105-20.241 11.119L21.909 51.263c-.097.09 9.043 5.089 20.311 11.11l20.587 11.113c.054.091-9.116 5.098-20.377 11.125L21.953 95.73c0 .088 8.781 4.856 19.513 10.595l20.525 11.006 1.012.57z" style={{fill: color}}/></svg>
        }
    }



    return <div className="outer-svg" style={style}>
        {getSVG()}
    </div>
}


export default SmallImage;
