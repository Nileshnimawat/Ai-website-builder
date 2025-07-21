"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RocketIcon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <nav className="w-full z-50">
      <div className="flex justify-between relative p-3 w-full">
        {pathname !== "/" && <SidebarTrigger />}
        {pathname === "/" && <RocketIcon />}

        <div className="flex gap-2.5">
          {status === "unauthenticated" && (
            <>
              <Button
                className="border-white light:border-black border-2"
                onClick={() => signIn()}
              >
                Login
              </Button>
              <Button
                className="border-white light:border-black border-2"
                onClick={() => signIn()}
              >
                Signup
              </Button>
            </>
          )}

          {status === "authenticated" && session?.user && (
            <>
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline font-medium">
                  {session.user.name || session.user.email}
                </span>
              </span>
              <Button
                className="border-white light:border-black border-2"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
