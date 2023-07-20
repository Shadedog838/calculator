import { useState } from "react";
import { flushSync } from "react-dom";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [problem, setProblem] = useState("0");

  const handleNumber = (event) => {
    const number = event.target.textContent;
    if (display === "0") {
      flushSync(() => {
        setDisplay(number);
      })
      flushSync(() => {
        setProblem(number)
      })
    } else {
      flushSync(() => {
        setDisplay(display + number);
      })
      flushSync(() => {
        setProblem(problem + number);
      })
    }
  };

  const handleOperator = (event) => {
    const operator = event.target.textContent;
    const array = problem.split(' ');
    if (array[array.length - 1] === "") {
      if (operator === '-') {
        array[array.length - 2] = array[array.length - 2] + operator;
        let newProb = array.join(' ')
        flushSync(() => {
          setDisplay(display + " " + operator + " ");
        })
        flushSync(() => {
          setProblem(newProb);
        })
      } else {
        array[array.length - 2] = operator;
        let newProb = array.join(' ')
        flushSync(() => {
          setDisplay(display + " " + operator + " ");
        })
        flushSync(() => {
          setProblem(newProb);
        })
      }
    } else {
      flushSync(() => {
        setDisplay(display + " " + operator + " ");
      })
      flushSync(() => {
        setProblem(problem + " " + operator + " ")
      })
    }
    // flushSync(() => {
    //   setDisplay(display + " " + operator + " ");
    // })
  };

  const handleEqual = () => {
    flushSync(() => {
      setDisplay((Math.round(eval(problem)  * 10 ** 4) / 10 ** 4).toString());
    })
    flushSync(() => {
      setProblem((Math.round(eval(problem)  * 10 ** 4) / 10 ** 4).toString());
    })
  }

  const handleDecimal = () => {
    const array = display.split(' ');
    const lastElement = array[array.length - 1];
    if (!lastElement.includes('.') && isNaN(parseInt(lastElement))  === false) {
      flushSync(() => {
        setDisplay(display + '.');
      });
      flushSync(() => {
        setProblem(problem + '.');
      })
    }
  }

  const handleClear = () => {
    flushSync(() => {
      setDisplay('0');
    })
    flushSync(() => {
      setProblem('0');
    })
  }


  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row">
          {display}
        </div>
        <div id="clear" onClick={handleClear} className="row">
          AC
        </div>
        <div id="seven" onClick={handleNumber}>
          7
        </div>
        <div id="eight" onClick={handleNumber}>
          8
        </div>
        <div id="nine" onClick={handleNumber}>
          9
        </div>
        <div id="multiply" onClick={handleOperator}>
          *
        </div>
        <div id="four" onClick={handleNumber}>
          4
        </div>
        <div id="five" onClick={handleNumber}>
          5
        </div>
        <div id="six" onClick={handleNumber}>
          6
        </div>
        <div id="divide" onClick={handleOperator}>
          /
        </div>
        <div id="one" onClick={handleNumber}>
          1
        </div>
        <div id="two" onClick={handleNumber}>
          2
        </div>
        <div id="three" onClick={handleNumber}>
          3
        </div>
        <div id="add" onClick={handleOperator}>
          +
        </div>
        <div id="zero" onClick={handleNumber}>
          0
        </div>
        <div id="decimal" onClick={handleDecimal}>.</div>
        <div id="equals" onClick={handleEqual}>=</div>
        <div id="subtract" onClick={handleOperator}>
          -
        </div>
      </div>
    </div>
  );
}

export default App;
