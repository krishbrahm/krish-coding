import TurnContext from "./TurnContext";
import { useContext } from "react";

function Strike() {
    const { wcombs, wc } = useContext(TurnContext);

    if (!wc) {
        return null;
    }

    let angle;
    let linlen;
    let top;
    let left;
    const combo = wc.join(",");

    if (combo === "1,4,7" || combo === "2,5,8" || combo === "3,6,9") {
        angle = 90;
        linlen = 250;
    }

    if (combo === "1,2,3" || combo === "4,5,6" || combo === "7,8,9") {
        angle = 0;
        linlen = 250;
    }

    if (combo === "1,5,9") {
        angle = 45;
        linlen = 360;
    }

    if (combo === "3,5,7") {
        angle = 135;
        linlen = 360;
    }

    if (wc[0] === 1) {
        top = 53;
        left = 58;
    }
    if (wc[0] === 2) {
        top = 53;
        left = 180;
    }
    if (wc[0] === 3) {
        top = 53;
        left = 300;
    }

    if (wc[0] === 4) {
        top = 180;
        left = 58;
    }
    if (wc[0] === 7) {
        top = 300;
        left = 58;
    }

    function compareWc(first, second) {
        if (
            first[0] === second[0] &&
            first[1] === second[1] &&
            first[2] === second[2]
        )
            return true;
        else return false;
    }

    const startpos = wc[0];
    console.log(`Angle: ${angle}`);
    return (
        <hr
            style={{
                width: `${linlen}px`,
                height: "5px",
                position: "absolute",
                top: `${top}px`,
                left: `${left}px`,
                transformOrigin: "left center",
                transform: `rotate(${angle}deg)`,
                background: "green",
            }}
        />
    );
}

export default Strike;
