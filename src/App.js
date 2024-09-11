import React, {useState, useEffect} from 'react';
import 'whatwg-fetch';
import logo from './logo.svg';
import './App.css';
import confetti from 'canvas-confetti';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setmensaje] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        const result = await response.json();
        console.log(result); // para depuracion
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:',error);
        setLoading(false);
      }
    };
    fetchData();
  },[]);

  const handleButtonClick = () => {
    setmensaje('Bienvenido a esta pagina de contenido educativo, aqui encontraras todo acerca de como un desarrollador debe Analisar sistemas Informaticos.');
    // Lanza la animación de confeti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }, // Posición de donde sale el confeti
    });
    // funcion para el tiempo en el que mensaje tardara en desaparecer
    setTimeout(() => {setmensaje('');}, 9000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenidos al proyecto Web de Analisis</h1>
          <nav className="Navegacion-Principal">
            <a href="/incicio">Inicio</a>
            <a href="/contenido">Contenido</a>
            <a href="/cursos">Cursos</a>
          </nav>
        < img src={logo} className="App-logo" alt="logo"/>
        <p>
          Presiona el link de abajo para aprender sobre Analsis De Sistemas.
        </p>
        <a
          className="App-link"
          href="https://www.tecnologias-informacion.com/analisis-sistemas.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contenido de Analisis De Sistemas.
        </a>
      </header>
      <main>
        <h2>Pagina Inicial</h2>
        <p>Este es el contenido de la pagina</p>
        <button className="Button" onClick={handleButtonClick} 
        >Haz Click</button>
        {mensaje && <div className="mensaje-emergente">{mensaje}</div>}
        <h3>Contendio del Curso</h3>
        {loading ? (
            <p>Cargando datos...</p>
          ) : (
                <ul className='contenido-api'>
                  {data.map(item => (
                    <li key = {item.id}>
                      <h4>{item.title}</h4>
                      <p>{item.body}</p>
                    </li>
                  ))}
                </ul>
              )
        }
      </main>
    </div>
  );
}

export default App;
