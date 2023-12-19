import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Login } from './pages/login/Login'
import { Member } from './pages/admin/member/Member'
import { GateKeeper } from './pages/admin/gatekeeper/GateKeeper'
import { Gate } from './pages/admin/gate/Gate'
import { Building } from './pages/admin/building/Building'
import { Room } from './pages/admin/room/Room'
import { QrCode } from './pages/gatekeeper/qrcode/QrCode'
import { VisitorRequest } from './pages/gatekeeper/visitorRequest/VisitorRequest'

function App() {

  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/gate" element={<Gate/>}/>
        <Route path="/building" element={<Building/>}/>
        <Route path="/member" element={<Member/>}/>
        <Route path="/gateKeeper" element={<GateKeeper/>}/>
        <Route path="/building/:id" element={<Room/>}/>
        <Route path="/check-info" element={<QrCode/>}/>
        <Route path="/entry-exit" element={<VisitorRequest/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
