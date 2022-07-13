import { Merchants } from "./components/merchant";
import { Create } from "./components/create"
import { Read } from "./components/read"
import { Update } from "./components/update"
import { Delete } from "./components/delete"
import { BrowserRouter, Routes, Route} from "react-router-dom"


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Merchants />}/>
      <Route path="/create" element={<Create />}/>
      <Route path="/read" element={<Read />}/>
      <Route path="/update" element={<Update />}/>
      <Route path="/delete" element={<Delete />}/>

    </Routes>
  </BrowserRouter>
  )
}

export default App;
