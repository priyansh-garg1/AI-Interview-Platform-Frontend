"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = () => {
    // supabase.auth.getUser().then(async ({ data: { user } }) => {
    //   let { data: userData } = await supabase
    //     .from("users")
    //     .select("*")
    //     .eq("email", user?.email);

    //   if (user?.email && userData.length === 0) {
    //     await supabase.from("users").insert({
    //       email: user?.email,
    //       name: user?.user_metadata?.name || "New User",
    //       created_at: new Date(),
    //     });
    //     setUser(userData[0]);
    //     return;
    //   }

    //   setUser(user);
    // });
  };
  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
}