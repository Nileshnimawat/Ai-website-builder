import { Button } from "@/components/ui/button";

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";

const SidebarFooter = () => {
  return (
    <div className="mt-auto  bg-zinc-900 rounded-lg">
      <SidebarMenu>
        <SidebarMenuItem>
          <Button className="flex items-center gap-2 w-full p-4 py-6 rounded-md bg-muted  hover:bg-zinc-800 transition">
            <User2 className="h-5 w-5" />
            <p className="text-sm font-medium">Upgrade Plan</p>

            <ChevronUp className="ml-auto h-5 w-5 opacity-70" />
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default SidebarFooter;
