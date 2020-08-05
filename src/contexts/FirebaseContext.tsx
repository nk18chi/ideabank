import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { TUser } from "../model/user.model";

type TFirebaseContext = {
  user: TUser;
  auth: firebase.auth.Auth;
};

const initalUser = { uid: null, loading: true, isAdmin: false };
export const FirebaseContext = createContext<TFirebaseContext>({ user: initalUser, auth: auth });

const FirebaseContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser>(initalUser);

  useEffect(() => {
    setUser({ uid: null, loading: true, isAdmin: false });
    const unsubscribe = auth.onAuthStateChanged(async (usr) => {
      if (usr && usr.emailVerified) {
        let isAdmin = false;
        await usr.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            isAdmin = true;
          }
        });
        setUser({ uid: usr.uid, loading: false, isAdmin: isAdmin });
      } else {
        setUser({ uid: null, loading: false, isAdmin: false });
      }
    });
    return () => unsubscribe();
  }, []);

  return <FirebaseContext.Provider value={{ user, auth }}>{children}</FirebaseContext.Provider>;
};
export default FirebaseContextProvider;
