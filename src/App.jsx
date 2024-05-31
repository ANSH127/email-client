
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
import ViewMail from "./pages/ViewMail";

function App() {
  

  return (
    <Router>
          
      <Sidebar />

      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/viewmail/:id" element={<ViewMail />} />
      </Routes>
      
    </Router>
  );
}

export default App;
