import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "../Root";
import AdminRoot from "../Admin/AdminRoot";
import Home from "../Pages/Home";

// ADMIN
import AdminHome from "../Admin/Pages/AdminHome";
import AllEvents from "../Admin/Pages/AllEvents";
import EventDetails from "../Admin/Pages/EventDetails";

// USERS
import Registeration from "../Pages/Registeration";
import Details from "../Pages/Details";

import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import { onAuthStateChanged, auth } from "../Firebase/Firebase";
import Spinner from "react-bootstrap/Spinner";


function AppRouter() {
  const [isLoader, setIsloader] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("cPLmX1bV1dG20T6fxF74");
  const [adminEmail, setAdminEmail] = useState("admin@gmail.com");

  useEffect(() => {
    const unSubscribeOnAuth = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        let latestUser;
        if (user) {
          const uid = user.uid;
          latestUser = JSON.parse(localStorage.getItem("latestUser"));
  
          if (
            (latestUser === null || latestUser === undefined) &&
            user.email === adminEmail
          ) {
            console.log("Admin Hai");
            latestUser = { id: "cPLmX1bV1dG20T6fxF74" };
            localStorage.setItem("latestUser", JSON.stringify(latestUser));
            console.log("Initial admin value set:", latestUser.id);
          } else if (latestUser === null || latestUser === undefined) {
            console.log("General User Hai");
            latestUser = { id: user.email };
            localStorage.setItem("latestUser", JSON.stringify(latestUser));
            console.log("Initial admin value set:", latestUser.id);
          }
          if (latestUser && adminPass === latestUser.id) {
            console.log("ADMIN AUTHENTICATED!...");
            setIsAdmin(true);
            setIsloader(false);
          } else {
            console.log("GENERAL USER AUTHENTICATE");
            setIsUser(true);
            setIsloader(false);
          }
        } 
        else {
          console.log("LOGOUT.");
          setIsAdmin(false);
          setIsUser(false);
          setIsloader(false);
          localStorage.removeItem("latestUser");
        }
      },2500)
     
    });

    return () => {
      unSubscribeOnAuth();
    };
  }, [adminPass]);


  return isLoader ? (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" variant="warning" />
    </div>
  ) : (
   
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/">
            {isUser && (
              <>
              <Route path="login" element={<Navigate to={"/"} />}/>
               <Route path="signup" element={<Navigate to={"/"} />}/>
              </>
              
            )}
            {isAdmin && (
              <>
               <Route path="login" element={<Navigate to={"/dashboard"} />}/>
               <Route path="signup" element={<Navigate to={"/dashboard"} />}/>
              </>
            )}
              <Route path="signup" element={<Signup />}/>
              <Route path="login" element={<Login />}/>
           

            <Route path="" element={<Root />}>
              <Route path="" element={<Home />} />
              <Route path="registeration/:id" element={isUser ? <Registeration /> : <Navigate to={"/"} />} />
              <Route path="details/:id" element={<Details />} />
            </Route>

            <Route path="" element={isAdmin && <AdminRoot />}>
              <Route path="dashboard" element={isAdmin ? <AdminHome /> : <Navigate to={"/"} />}/>
              <Route path="all-events" element={isAdmin ? <AllEvents /> : <Navigate to={"/"} />}/>
              <Route path="event-details" element={isAdmin ? <EventDetails /> : <Navigate to={"/"} />}/>
            </Route>
            <Route path="*"> SERVICE UNAVAILABLE</Route>

          </Route>

            

        )
      )}
    />
   
   
  );
}

export default AppRouter;
