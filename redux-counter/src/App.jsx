import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './features/counter/counterSlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())} style={{ margin: '5px' }}>Increment</button>
      <button onClick={() => dispatch(decrement())} style={{ margin: '5px' }}>Decrement</button>
    </div>
  );
}

export default App;
