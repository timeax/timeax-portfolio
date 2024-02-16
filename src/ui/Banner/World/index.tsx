import React, { useEffect, useRef } from "react";
import { createWorld } from "./script";

const World: React.FC = () => {
    const ref = useRef<HTMLCanvasElement>();
    useEffect(() => {
        if (ref.current) createWorld(ref.current, 'red');
        else createWorld(document.querySelector("#earth") as any);
    }, []);
    return (
        <canvas
            id="earth"
            ref={ref as any}
            style={{
                touchAction: "manipulation",
            }}
        ></canvas>
    );
};

export default World;
