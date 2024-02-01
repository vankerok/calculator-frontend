import { CalcContext } from "../context/CalcContext";
import { useContext } from "react"

const getStyleName = btn => {
    const className = {
        '=': 'equals',
        'x': 'opt',
        '-': 'opt',
        '+': 'opt',
        '/': 'opt',
    }
    return className[btn]
}

const Button = ({ value }) => {
    const {calc, setCalc} = useContext(CalcContext)

    // User clicks comma
    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        })
    }

    // User clicks C
    const resetClick = () => {
        setCalc({ sign: '', num: 0, res: 0})
    }

    // User clicks %
    const persentClick = () => {
        setCalc({
            ...calc,
            num: calc.num/100
        })
    }

    const changeSign = () => {
        setCalc({
            ...calc,
            num: -calc.num
        })
    }

    const numClick = (number) => {
        if (calc.num === 0){
            setCalc({
                ...calc,
                num: number.toString()
            })
        }
        else {
            setCalc({
                ...calc,
                num: calc.num += number.toString()
            })
        }
    }

    const operatorClick = (operator) => {
        setCalc({
            ...calc,
            res: calc.num,
            num: 0,
            operator: operator
        })

    }

    const equalClick = () => {
        const operators = {
            '+': (a,b) => a + b,
            '-': (a,b) => a - b,
            'x': (a,b) => a * b,
            '/': (a,b) => a / b,
        }
        
        setCalc({
            ...calc,
            num: Math.round(operators[calc.operator](parseFloat(calc.res), parseFloat(calc.num))*10**7)/10**7
        })
    }

    const handleClick = () => {
        const result = {
            '.': commaClick,
            'C': resetClick,
            '%': persentClick,
            '+-': changeSign,
            '0': () => numClick('0'),
            '1': () => numClick('1'),
            '2': () =>  numClick('2'),
            '3': () =>  numClick('3'),
            '4': () =>  numClick('4'),
            '5': () =>  numClick('5'),
            '6': () =>  numClick('6'),
            '7': () =>  numClick('7'),
            '8': () =>  numClick('8'),
            '9': () =>  numClick('9'),
            '+': () => operatorClick('+'),
            '-': () => operatorClick('-'),
            'x': () => operatorClick('x'),
            '/': () => operatorClick('/'),
            '=': () => equalClick(),
        }
        
        return result[value]()
    }
    

    return(
        <button onClick={handleClick} className={`${getStyleName(value)} button`}>{value}</button>
    );
}

export default Button;