import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RangeSlider from './components/RangeSlider'
import TableComponent from './components/TableComponent';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowsToShow, setRowsToShow] = useState(10);

  useEffect(() => {
    axios.get('https://frontendassignment-algo-one.netlify.app/table_data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{width:"30%"}}><RangeSlider setRowsToShow={setRowsToShow} /></div>
      <TableComponent data={data} rowsToShow={rowsToShow} />
    </div>
  );
};
export default App;