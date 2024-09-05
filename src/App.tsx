import { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from './atoms/button/Button';
import Card from './atoms/card/Card';
import Input from './atoms/input/Input';

function App() {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Card>
          <h2>Título de la tarjeta</h2>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>Este es el contenido de la tarjeta.</p>
        </Card>
        <Button variant='secondary'>
          Cancel
        </Button>
        <Input
        label="Nombre"
        type="text"
        placeholder="Introduce tu nombre"
        value={value}
        onChange={handleChange}
      />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
