import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Teachers from "./pages/admin/Teachers";
import AddTeacher from "./pages/admin/AddTeacher";
import EditTeacher from "./pages/admin/EditTeacher";
import Staff from "./pages/admin/Staff";
import AddStaff from "./pages/admin/AddStaff";
import EditStaff from "./pages/admin/EditStaff";
import News from "./pages/admin/News";
import AddNews from "./pages/admin/AddNews";
import EditNews from "./pages/admin/EditNews";
import Gallery from "./pages/admin/Gallery";
import AddGallery from "./pages/admin/AddGallery";
import ContactMessages from "./pages/admin/ContactMessages";
import AboutManagement from "./pages/admin/AboutManagement";
import SettingsManagement from "./pages/admin/SettingsManagement";
import Admissions from "./pages/admin/Admissions";
import Students from "./pages/admin/Students";
import CreateStudent from "./pages/admin/CreateStudent";
import EditStudent from "./pages/admin/EditStudent";
// WEBSITE
import Home from "./pages/website/Home";
import AdmissionForm from "./pages/website/AdmissionForm";
import About from "./pages/website/About";
import CheckResult from "./pages/website/CheckResult";
import Contact from "./pages/website/Contact";
import Notice from "./pages/website/Notice";
import NoticeSingle from "./pages/website/singlePage/NoticeSingle";
import SingleGallery from "./pages/website/singlePage/GallerySingle";
import Galleries from "./pages/website/Galleries";

//redux global
import {
  useEffect,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  fetchSettings,
} from "./redux/features/settingsSlice";

import {
  fetchAbout,
} from "./redux/features/aboutSlice";

// ADMIN
import AdminLogin from "./pages/admin/AdminLogin";

import AdminDashboard from "./pages/admin/AdminDashboard";


// PRIVATE ROUTE
import PrivateRoute from "./routes/PrivateRoute";
import EditGallery from "./pages/admin/EditGallery";
import CreateResult from "./pages/admin/CreateResult";
import Results from "./pages/admin/Results";
import AdminDetails from "./pages/admin/AdminDetails";
import TeachersPublic from "./pages/website/TeachersPublic";
import StaffPublic from "./pages/website/StaffPublic";




function App() {
  const dispatch =
    useDispatch();

  useEffect(() => {

    dispatch(
      fetchSettings()
    );

    dispatch(
      fetchAbout()
    );

  }, [dispatch]);

  return (

    <BrowserRouter>

      <Routes>

        {/* WEBSITE */}

        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/notice"
          element={<Notice />}
        />
        <Route path="/notice/:id" element={<NoticeSingle />} />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route path="/gallery" element={<Galleries />} />
        <Route path="/gallery/:id" element={<SingleGallery />} />


        <Route
          path="/result-check"
          element={<CheckResult />}
        />

        <Route
          path="/admission"
          element={<AdmissionForm />}
        />
        <Route
          path="/teachers"
          element={<TeachersPublic />}
        />
        <Route
          path="/staffs"
          element={<StaffPublic />}
        />


        {/* ADMIN LOGIN */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin/dashboard"
          element={

            <PrivateRoute>

              <AdminDashboard />

            </PrivateRoute>
          }
        />

        <Route
          path="/admin/teachers"
          element={
            <PrivateRoute>
              <Teachers />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/teachers/add"
          element={
            <PrivateRoute>
              <AddTeacher />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/teachers/edit/:id"
          element={
            <PrivateRoute>
              <EditTeacher />
            </PrivateRoute>
          }
        />


        <Route
          path="/admin/staff"
          element={
            <PrivateRoute>
              <Staff />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/staff/add"
          element={
            <PrivateRoute>
              <AddStaff />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/staff/edit/:id"
          element={
            <PrivateRoute>
              <EditStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/news"
          element={
            <PrivateRoute>
              <News />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/news/add"
          element={
            <PrivateRoute>
              <AddNews />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/news/edit/:id"
          element={
            <PrivateRoute>
              <EditNews />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <PrivateRoute>
              <Gallery />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/gallery/add"
          element={
            <PrivateRoute>
              <AddGallery />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/gallery/edit/:id"
          element={
            <PrivateRoute>
              <EditGallery />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <PrivateRoute>
              <ContactMessages />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/about"
          element={
            <PrivateRoute>
              <AboutManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <PrivateRoute>
              <SettingsManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/admissions"
          element={
            <PrivateRoute>
              <Admissions />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <PrivateRoute>
              <Students />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/students/create"
          element={
            <PrivateRoute>
              <CreateStudent />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/students/edit/:id"
          element={
            <PrivateRoute>
              <EditStudent />
            </PrivateRoute>

          }
        />

        <Route
          path="/admin/results"
          element={
            <PrivateRoute>
              <Results />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/results/create"
          element={
            <PrivateRoute>
              <CreateResult />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/details"
          element={
            <PrivateRoute>
              <AdminDetails />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;