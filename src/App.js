import { useState } from 'react';
import Gallery from './components/Gallery';
import Navbar from './components/Navbar';

function App() {
  const [search, setSearch] = useState("")

  return (
    <div className="App">
      <Navbar setSearch={setSearch}/>
     <Gallery search={search}/>
    </div>
  );
}

export default App;
