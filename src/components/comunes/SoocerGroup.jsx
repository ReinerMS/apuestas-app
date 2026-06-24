import { useState, useEffect } from 'react';
import { getSports } from '../../services/oddsApi'; 

function SoccerList() {
  const [soccerSports, setSoccerSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. ESTADOS PARA LA PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1); // Empezamos en la página 1
  const itemsPerPage = 6; // Queremos mostrar solo 6 por página

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getSports();
        const soccerOnly = data.filter(sport => sport.group === "Soccer");
        setSoccerSports(soccerOnly);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Cargando ligas de fútbol...</p>;
  if (error) return <p>Hubo un error: {error}</p>;

  // 2. CÁLCULOS MATEMÁTICOS PARA EL CORTE
  // Si estamos en Pág 1: indexOfLastItem = 1 * 6 = 6.  indexOfFirstItem = 6 - 6 = 0. (.slice(0, 6))
  // Si estamos en Pág 2: indexOfLastItem = 2 * 6 = 12. indexOfFirstItem = 12 - 6 = 6. (.slice(6, 12))
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Esta es la lista recortada que realmente vamos a dibujar en pantalla
  const currentItems = soccerSports.slice(indexOfFirstItem, indexOfLastItem);

  // Saber cuántas páginas totales existen (ej: 13 elementos / 6 = 2.16 -> Redondea a 3 páginas)
  const totalPages = Math.ceil(soccerSports.length / itemsPerPage);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h2>Ligas de Fútbol Disponibles ({soccerSports.length})</h2>
      
      {/* 3. CAMBIAMOS soccerSports.map POR currentItems.map */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {currentItems.map((sport) => (
          <li 
            key={sport.key} 
            style={{ 
              padding: '12px', 
              marginBottom: '10px', 
              backgroundColor: '#f4f4f4', 
              borderRadius: '6px',
              borderLeft: `5px solid ${sport.active ? '#2ecc71' : '#e74c3c'}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{sport.title}</strong>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 'bold', 
                color: sport.active ? '#27ae60' : '#c0392b' 
              }}>
                {sport.active ? '🟢 ACTIVA' : '🔴 INACTIVA'}
              </span>
            </div>
            <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
              {sport.description}
            </p>
          </li>
        ))}
      </ul>

      {/* 4. BOTONES DE CONTROL DE PÁGINA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <button 
          onClick={() => setCurrentPage(prev => prev - 1)} 
          disabled={currentPage === 1} // Si está en la página 1, se deshabilita
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Anterior
        </button>

        <span>Página <strong>{currentPage}</strong> de {totalPages}</span>

        <button 
          onClick={() => setCurrentPage(prev => prev + 1)} 
          disabled={currentPage === totalPages} // Si llegamos al final, se deshabilita
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default SoccerList;