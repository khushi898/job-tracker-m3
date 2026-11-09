import {Routes, Route, Navigate} from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Applications from "./pages/Applications.jsx";
import ApplicationForm from "./pages/ApplicationForm.jsx";
import ApplicationDetail from "./pages/ApplicationDetail.jsx";
import ExploreJobs from "./pages/ExploreJobs.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";

function App(){
  return(
   <Routes>
    <Route path="/login" element={<Login/>}/>

    <Route element={<ProtectedRoute/>}>
    <Route element={<Layout/>}>
      <Route path="/" element={<Navigate to="/dashboard" replace />}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/applications" element={<Applications/>}/>
      <Route path="/applications/new" element={<ApplicationForm/>}/>
      <Route path="/applications/:id" element={<ApplicationDetail/>}/>
      <Route path="/application/:id/edit" element={<ApplicationForm/>}/>
      <Route path="/explore" element={<ExploreJobs/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Route>
    </Route>
   </Routes>
  )
}
export default App;