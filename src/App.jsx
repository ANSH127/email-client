
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Sidebar from "./components/SideBar";
import Inbox from "./pages/Inbox";
import Sent from "./pages/Sent";
import Trash from "./pages/Trash";
import Compose from "./pages/Compose";

function App() {
  

  return (
    <Router>
          
      <Sidebar />

      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/compose" element={<Compose />} />
      </Routes>
      
    </Router>
  );
}

export default App;
