import "./Toast.css";
import {useState} from 'react'
function Toast() {
  const [left, setLeft] = useState('left');
  const [top, setTop] = useState('top');
  const [click, setClick] = useState(false);
  const [type, setType] = useState('normal');
  const [text, setText] = useState('hello darling');
  const [range, setRange] = useState(3)
  const submitClick = () => {
    setClick(true)
    setTimeout(() => {
      setClick(false)
    }, range*1000)
  }

  const onTextChange = (e) => {
    setText(e.target.value)
  }

  const setRangeChange = (e) => {
    e.target.value >= 3 ? setRange(Number(e.target.value)): setRange(3);
  }
  const closeClick = () => {
    setLeft('left');
    setTop('top');
    setClick(false);
    setType('normal');
    setText('hello darling');
    setRange(3);
  }

  return (
    <>
      <h1>Toast</h1>
      <div className="container">
      <select onChange={(e) => setLeft(e.target.value)}>
        <option>Left</option>
        <option>Right</option>
      </select>
      <select onChange={(e) => setTop(e.target.value)}>
        <option>Top</option>
        <option>Bottom</option>
      </select>
      <select onChange={(e) => setType(e.target.value)}>
        <option>Normal</option>
        <option>Success</option>
        <option>Error</option>
        <option>Warning</option>
        <option>Info</option>
      </select>
      <input type="text" onChange={onTextChange} value={text}></input>
      <div className="duration-container">
      <label>Duration</label>
      <input type="range" className="duration" max={10} min={2} value={range} onChange={setRangeChange}></input>
      <label>{range} sec</label>
      </div>
      <button onClick={submitClick}>Show Toast</button>
      </div>
      {click && (<div className={`toast-container-${left.toLowerCase()}-${top.toLowerCase()}`}>
        <div className={`${type.toLowerCase()}`}>  {text} <span class="close" onClick={closeClick}>X</span></div>
      </div>)}

    </>
  );
}

export default Toast;
