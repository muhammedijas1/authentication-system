import {BrowserRouter,Routes,Route,Link,Navigate,useNavigate} from "react-router-dom"
import Registerpage from "./pages/RegisterPage"
import Loginpage from "./pages/LoginPage"
import Dashboard from "./pages/DashboardPage"
import Protectedroute from "./components/ProtectedRoute"
import { AuthProvider } from "./Context/AuthContext"
function App(){
  return(
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>}/>
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/register" element={<Registerpage/>}/>
      <Route path="/dashboard" element={
      <Protectedroute>
        <Dashboard/>
      </Protectedroute>
        }/>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}
export default App