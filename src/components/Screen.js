import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const Screen = () => {
    const { calc } = useContext(CalcContext) 
    return(
        <div className = "Screen" max={10}>{calc.num ? calc.num : calc.res}</div>
    );
}

export default Screen;