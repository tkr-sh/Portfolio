import SmallImage from "./SmallImage"


interface smallImageType {
    type: string,
    color: string,
    style: any,
}

interface imageType {
    imagePath: string,
    description: string,
}

interface param {
    formatName: string,
    sectionName: string,
    images: imageType[],
    forwardRef: any,
    index: number,
    p: any,
    stack: string[],
    smallImages: smallImageType[],
    imageCorrespondance: any,
    link: string,
}


const Project = ({formatName, sectionName, forwardRef, images, index, p, stack, smallImages, imageCorrespondance, link}: param) => {


    return  <section className={sectionName}>
            {/* List of small images to break the monotony */}
            {
                smallImages
                .map((e,i) => 
                    <SmallImage
                        key={i}
                        type={e.type}
                        color={e.color}
                        style={e.style}
                    />
                )
            }


            {/* Real content */}
            {
                index % 2 === 1 &&
                <div
                    className="content-images"
                    style={{height: forwardRef.current[sectionName]?.getBoundingClientRect().height}}
                >
                {
                    images
                    .map((e,i) => 
                        <div key={i} className="outer-image">
                            <span>{e.description}</span>
                            <img src={`img/${e.imagePath}`}/>
                        </div>
                    )
                }
                </div>
            }


            <div className="content-project" ref={e => forwardRef.current[sectionName] = e}>
                <h1>
                    <span className="index">0{index}.</span> {formatName}
                </h1>
                {
                    p
                }
                <div className="stack">
                {
                    stack
                    .map(
                        (e,i) => 
                            <div key={i}>
                                <img
                                    alt={e}
                                    title={e}
                                    src={`img/${(e.toLowerCase() in imageCorrespondance ? imageCorrespondance[e.toLowerCase()].img : e.toLowerCase())}.svg`}
                                />
                            </div>
                    )
                }
                </div>

                <br/>

                Source code: <a href={link}>{link}</a>
            </div>

            {
                index % 2 === 0 &&
                <div
                    className="content-images"
                    style={{height: forwardRef.current[sectionName]?.getBoundingClientRect().height}}
                >
                {
                    images
                    .map((e,i) => 
                        <div key={i} className="outer-image">
                            <span>{e.description}</span>
                            <img src={`img/${e.imagePath}`}/>
                        </div>
                    )
                }
                </div>
            }
        </section>
}


export default Project;
