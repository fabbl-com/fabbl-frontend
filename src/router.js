import { Settings } from "@material-ui/icons";
import {
  Auth,
  Chat,
  ChatDetails,
  Home,
  ImageUpload,
  PersonalData,
  Profile,
  Random,
  SecurityData,
  VerifyVoice
} from "./pages";

export default [
  {
    path: "/",
    component: <Home />
  },
  {
    path: "/chat",
    component: (isTheme, setTheme) => <Chat isTheme={isTheme} setTheme={setTheme} />
  },
  {
    path: "/chat-details",
    component: (isTheme, setTheme) => <ChatDetails isTheme={isTheme} setTheme={setTheme} />
  },
  {
    path: "/profile",
    component: (isTheme, setTheme) => <Profile isTheme={isTheme} setTheme={setTheme} />
  },
  {
    path: "/",
    component: (isTheme, setTheme) => <Settings isTheme={isTheme} setTheme={setTheme} />
  },
  {
    path: "/edit/personal-data",
    component: (isTheme, setTheme) => <PersonalData isTheme={isTheme} setTheme={setTheme} />
  },
  {
    path: "/edit/security-data",
    component: (isTheme, setTheme) => <SecurityData isTheme={isTheme} setTheme={setTheme} />
  },
  {
    path: "/auth",
    component: () => <Auth />
  },
  {
    path: "/image",
    component: () => <ImageUpload />
  },
  {
    path: "/verify-voice",
    component: () => <VerifyVoice />
  },
  {
    path: "edit/security-data",
    component: () => <Random />
  }
];
