import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import DashboardPage from "views/Dashboard/Dashboard.js";
import Login from "views/Login";
import UserProfile from "views/UserProfile/UserProfile.js";
import CampaignList from "views/CampaignList";
import Patients from "views/Patients";
import TableList from "views/TableList/TableList.js";
import TestResultState from "views/TestResultState";
import Campaign from "views/Campaign";
import Symptom from "views/Symptom";
import NotificationsPage from "views/Notifications/Notifications.js";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AcUnitIcon from '@material-ui/icons/AcUnit';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/add/user",
    name: "Add Users",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "System Users",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/add/campaign",
    name: "Add Campaign",
    icon: AccessibilityIcon,
    component: Campaign,
    layout: "/admin"
  },
  {
    path: "/symptoms",
    name: "Symptom",
    icon: AcUnitIcon,
    component: Symptom,
    layout: "/admin"
  },
  {
    path: "/result/states",
    name: "Result States",
    icon: AmpStoriesIcon,
    component: TestResultState,
    layout: "/admin"
  },
  {
    path: "/patients",
    name: "Patients Listing",
    icon: LocalHospitalIcon,
    component: Patients,
    layout: "/admin"
  },
];

export default dashboardRoutes;