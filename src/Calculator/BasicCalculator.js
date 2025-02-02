import './BasicCalculator.css';
import { useState } from "react";
const BasicCalculator = () => {
    const [output, setOutput] = useState('');
   
    const buttons = [
        ['7', '8', '9', 'C'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '/', '+'],
        ['=']
      ];

    const onButtonClick = (e) => {
        const value = e.target.value;
        switch(value){
            case '=':
                setOutput(eval(output.toString()));
                break;
            case 'C':
                setOutput('');
                break;
            case '+':
                setOutput(output + value);
                break;
            case '-':
                setOutput(output + value);
                break;
            case '*':
                setOutput(output + value);
                break;
            case '/':
                setOutput(output + value);
                break;
            default:
                setOutput(output + value);
        }
    }

    return(
        <>
            <h1>Basic Calculator</h1>
            <div className="calculator">
            <div className="display">
                <h2>{output}</h2>
            </div>
                <div className="buttons">
                    {buttons.map((row, rowIndex) => (
                    <div key={rowIndex} className="button-row">
                        {row.map((button) => (
                            <button className="button"  onClick = {onButtonClick} value={button}>
                            {button}
                          </button>
                        ))}
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default BasicCalculator;