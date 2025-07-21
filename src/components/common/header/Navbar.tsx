// "use client";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import { usePathname } from 'next/navigation'
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { RocketIcon } from "lucide-react";

// const Navbar = () => {
//    const pathname = usePathname()
//   return (
//     <nav className=" w-full z-50 ">
//       <div className="flex justify-between relative p-3 w-full">
//        {pathname !== "/" && <SidebarTrigger />}
//        {pathname === "/" && <RocketIcon/>}

//         <div className="flex gap-2.5 ">
//           <SignedOut>
//             <SignInButton>
//               <Button className="border-white light:border-black border-2">
//                 Login
//               </Button>
//             </SignInButton>
//             <SignUpButton>
//               <Button className="border-white light:border-black border-2">
//                 Signup
//               </Button>
//             </SignUpButton>
//           </SignedOut>

          

//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
