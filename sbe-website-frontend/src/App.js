import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Signup from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import ReservationForm from "./pages/ReservationForm";
import CoursesMenu from "./pages/CoursesMenu";
import CourseDetails from "./pages/CourseDetails";
import CourseHistory from "./pages/CourseHistory";
import About from "./components/about";
import AllNews from "./components/AllNews";
import Activate from "./pages/Activate";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import { Provider } from "react-redux";
import store from "./store";
import AllEvents from "./components/AllEvents";
import GraduatePage from "./components/GraduatePage";
import UnderGraduate from "./components/UnderGraduate";
import CourseGraduate from "./components/CourseGraduate";
import CourseUnderGraduate from "./components/CourseUndergraduate";
import Profile from "./pages/Profile";
import YoneSone from "./pages/Y1S1";
import YoneStwo from "./pages/Y1S2";
import YtwoSone from "./pages/Y2S1";
import YtwoStwo from "./pages/Y2S2";
import YthreeSone from "./pages/Y3S1";
import YthreeStwo from "./pages/Y3S2";
import YfourSone from "./pages/Y4S1";
import YfourStwo from "./pages/Y4S2";
import Moderator from "./pages/Moderator";
import ReservationApprov from "./pages/ReservationApprov";
import RegistrationApprove from "./pages/RegistrationApprove";
import Users from "./pages/Users";
import Layout from './hocs/Layout'; 
import ReservationSchedule from "./components/ReservationSchedule";
import UnderGraduateExamSchedule from "./components/UnderGraduateExams";
import GraduateExamSchedule from "./components/GraduateExams";
import UnderGraduateLecSchedule from "./components/UnderGraduateLecSchedule";
import GraduateLecSchedule from "./components/GraduateLecSchedule";

import OfficeHours from "./components/OfficeHours";
import OfficeHoursSchedule from "./components/OfficeHoursView";
import OfficeHoursDetails from "./components/OfficeHoursDetails";
import EditOfficeHours from "./components/EditOfficeHours";
import LabsReservations from "./pages/LabsReservations";
import HallsReservations from "./pages/HallsReservations";
import DevicesReservations from "./pages/DevicesReservations";
import EditReservationHall from "./components/EditReservationHall";
import EditReservationLab from "./components/EditReservationsLab";
import EditReservationDevice from "./components/EditReservationsDevice";
import Halls from "./components/Halls";
import HallForm from "./components/HallForm";
import Labs from "./components/Labs";
import LabForm from "./components/LabForm";
import Devices from "./components/Devices";
import DeviceForm from "./components/DeviceForm";
import EditHallForm from "./components/EditHallForm";
import EditLabForm from "./components/EditLabForm";
import EditDeviceForm from "./components/EditDeviceForm";
import CourseForm from "./pages/CourseForm";
import Adm_Graduates from "./pages/Adm_Graduates"
import Adm_UnderGraduates from "./pages/Adm_UnderGraduates"

function App() {


  return (
    <>

       
      <Provider store={store}>

        <BrowserRouter>

        <Layout>
          <Header/>
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={"/signup"} exact component={Signup} />
            <Route path={"/login"} exact component={LoginForm} />
            <Route path={"/reservation"} exact component={ReservationForm} />
            <Route path={"/coursesMenu"} exact component={CoursesMenu} />
            <Route path={"/course-history/:id"} exact component={CourseHistory} />
            <Route path={"/courseDetails/:id"} exact component={CourseDetails} />
            <Route path={"/about"} exact component={About} />
            <Route path={"/reset-password"} exact component={ResetPassword} />
            <Route path={"/allnews"} exact component={AllNews} />
            <Route path={"/allevents"} exact component={AllEvents} />
            <Route path={"/graduatepage"} exact component={GraduatePage} />
            <Route path={"/undergraduatepage"} exact component={UnderGraduate} />
            <Route path={"/coursegraduate"} exact component={CourseGraduate} />
            <Route path={"/courseungraduate"} exact component={CourseUnderGraduate} />
            <Route path={"/profilepage"} exact component={Profile} />
            <Route path={"/one-smesterone"} exact component={YoneSone} />
            <Route path={"/one-smestertwo"} exact component={YoneStwo} />
            <Route path={"/two-smesterone"} exact component={YtwoSone} />
            <Route path={"/two-smestertwo"} exact component={YtwoStwo} />
            <Route path={"/three-smesterone"} exact component={YthreeSone} />
            <Route path={"/three-smestertwo"} exact component={YthreeStwo} />
            <Route path={"/four-smesterone"} exact component={YfourSone} />
            <Route path={"/four-smestertwo"} exact component={YfourStwo} />
            <Route path={"/moderator"} exact component={Moderator} />
            <Route path={"/reservation-approv"} exact component={ReservationApprov} />
            <Route path={"/registration-approv"} exact component={RegistrationApprove} />
            <Route path={"/users"} exact component={Users} />
            <Route path={"/undergraduate-exams"} exact component={UnderGraduateExamSchedule} /> 
            <Route path={"/graduate-exams"} exact component={GraduateExamSchedule} /> 


            <Route path={"/adm-undergraduates"} exact component={Adm_UnderGraduates} />
            <Route path={"/adm-graduates"} exact component={Adm_Graduates} />

            <Route path={"/reservationsShedule"} exact component={ReservationSchedule} />
            <Route path={"/officehours"} exact component={OfficeHours} />
            <Route path={"/officehourschedule"} exact component={OfficeHoursSchedule} />
            <Route path={"/officehoursDetails"} exact component={OfficeHoursDetails} />
            <Route path={"/officehoursEdit/:id"} exact component={EditOfficeHours} />
            <Route path={"/reservationEditHall/:id/:date/:time/:type/:name/:staff"} exact component={EditReservationHall} />
            <Route path={"/reservationEditLab/:id/:date/:time/:type/:name/:staff"} exact component={EditReservationLab} />
            <Route path={"/reservationEditDevice/:id/:date/:time/:type/:name/:staff"} exact component={EditReservationDevice} />

            <Route path={"/halls"} exact component={Halls} />
            <Route path={"/hallform"} exact component={HallForm} />
            <Route path={"/labs"} exact component={Labs} />
            <Route path={"/labform"} exact component={LabForm} />
            <Route path={"/devices"} exact component={Devices} />
            <Route path={"/deviceform"} exact component={DeviceForm} />
            <Route path={"/editHallForm/:id/:name"} exact component={EditHallForm} />
            <Route path={"/editLabForm/:id/:name"} exact component={EditLabForm} />
            <Route path={"/editDeviceForm/:id/:name"} exact component={EditDeviceForm} />

            <Route path={"/labsreservations"} exact component={LabsReservations} />
            <Route path={"/hallsreservations"} exact component={HallsReservations} />
            <Route path={"/devicesreservations"} exact component={DevicesReservations} />

            <Route path={"/courseform"} exact component={CourseForm} />

            <Route path={"/undergraduate-lecs"} exact component={UnderGraduateLecSchedule} /> 
            <Route path={"/graduate-lecs"} exact component={GraduateLecSchedule} /> 

            <Route
              path={"/password/reset/confirm/:uid/:token"}
              exact
              component={ResetPasswordConfirm}
              />
            <Route path={"/activate/:uid/:token"} exact component={Activate} />
            
          </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
}
export default App;
