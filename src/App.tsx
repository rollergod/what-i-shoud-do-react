import React from 'react';
import './App.css';

import C1 from './react-render/C1';
import C2 from './react-render/C2';

import ImagePage from './ImagePage';

function App() {

  const [count, setCount] = React.useState<number>(10);
  const [arr, setArr] = React.useState<string[]>(['Test']); // задавать начальное значение

  // React.useEffect(() => {
  //   setInterval(() => {
  //     переменные замыкаются внутри setInterval
  //     setCount(count - 1); не работает
  //     setCount(prev => prev - 1);
  //   }, 1000);
  // }, []);


  const onClick = (): void => {
    // setCount(count - 1);
    // setCount(count * 2); из-за того, что и там и там count = 10, не сохранит первый стейт и выполнит сразу 2
    setCount(prev => prev - 1);
    setCount(prev => prev + 2);
  }

  // const onClickEdit = (i: number) => {
  //   setArr(arr.map((obj, i) => {
  //     obj = 'Test';
  //   }))

  // }

  const onClickRemove = (i: number) => {
    setArr(arr.filter((_, i) => i !== i));
  }

  return (
    <div className="App">
{/* 
    <C1>
      <C2></C2>
    </C1>
     */}

     <ImagePage></ImagePage>
    
    </div>
  );
}

export default App;


//  <h1 onClick={onClick}>{count}</h1>

//       <ul>
//         {
//           arr.map((obj, i) => (
//             <li key={i}>{obj}
//               {/* <button onClick={() => onClickEdit(i)}>Edit</button> */}
//               <button onClick={() => onClickRemove(i)}>Remove</button>
//             </li>
//           ))
//         }
//       </ul> 
    
//     