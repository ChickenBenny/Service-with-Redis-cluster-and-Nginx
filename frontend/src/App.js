import { Merchants } from "./components/merchant";
import { MerchantsCreate } from "./components/merchantCreate"
import { BrowserRouter, Routes, Route} from "react-router-dom"


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Merchants />}/>
      <Route path="/create" element={<MerchantsCreate />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
