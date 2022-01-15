export const LOCAL_STORAGE_KEY = "logged_user";

export const GOOGLE_MAPS_API_KEY = "AIzaSyAHHpPhwt22vrXE981Fxh_bzFCKXAsl9DA";

export const DUMMY_PASSWORD = "pass";

export const ERROR_MESSAGES = {
  WRONG_PASSWORD: "Password is not correct!",
  INVALID_EMAIL: "Email is not valid!",
  NO_USER: "No logged in User!",
  NO_USER_CREATED: "User cannot be created!",
};

export const NO_DATA_COLOR = "grey";

export const NAV_LINKS = [
  {
    path: "/",
    name: "Home",
    requiresAuth: false,
  },
  {
    path: "/my-profile",
    name: "My Profile",
    requiresAuth: true,
  },
  {
    path: "/my-reservations",
    name: "My Reservationss",
    requiresAuth: true,
  },
];

export const ROLES = ["admin", "tourist", "beach_admin"];
