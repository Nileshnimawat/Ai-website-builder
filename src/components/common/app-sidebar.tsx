"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { useRouter, usePathname } from "next/navigation";
import Header from "./sidebar/SidebarHeader";
import Footer from "./sidebar/SidebarFooter";
import { useEffect, useState, useCallback } from "react";
import { getUserWorkspaces } from "@/server/actions/user.action";
import { Workspace } from "@/types/types";
import { 
  MessageCircle, 
  Plus,
  ChevronRight,
  Loader2,
  AlertCircle
} from "lucide-react";

// Enhanced workspace type with additional properties
interface ExtendedWorkspace extends Workspace {
  lastActivity?: Date;
  messages?: string;
  isActive?: boolean;
}

export function AppSidebar() {
  const [workspaces, setWorkspaces] = useState<ExtendedWorkspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null);
  const [hoveredWorkspace, setHoveredWorkspace] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  // Enhanced fetch function with error handling
  const fetchWorkspaces = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getUserWorkspaces();
      const enhancedData = data.map((ws: Workspace) => ({
        ...ws,
        lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        messageCount: Math.floor(Math.random() * 50) + 1,
        isActive: pathname.includes(ws.id)
      }));
      
      setWorkspaces(enhancedData);
    } catch (err) {
      console.error("Failed to load workspaces", err);
      setError("Failed to load chats. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [pathname]);

  // Set active workspace based on pathname
  useEffect(() => {
    const currentWorkspaceId = pathname.split('/chat/')[1];
    setActiveWorkspace(currentWorkspaceId || null);
  }, [pathname]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  // Handle workspace navigation
  const handleWorkspaceClick = (workspaceId: string) => {
    router.push(`/chat/${workspaceId}`);
  };

  // Handle workspace actions
  const handleWorkspaceAction = (action: string, workspaceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    switch (action) {
      case 'edit':
        // Handle edit logic
        console.log('Edit workspace:', workspaceId);
        break;
      case 'delete':
        // Handle delete logic
        console.log('Delete workspace:', workspaceId);
        break;
    }
  };



  // Truncate text
  const truncateText = (text: string, maxLength: number = 25) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Sidebar className={`bg-zinc-950 text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64 sm:w-72'} flex flex-col border-r border-gray-800 shadow-2xl`}>
      
      {/* Enhanced Header */}
      <SidebarHeader className="p-4 border-b  backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Header />
          {!isCollapsed && (
            <button
              onClick={() => router.push('/chat/new')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors group"
              title="New Chat"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>
          )}
        </div>
      </SidebarHeader>

      {/* Enhanced Content */}
      <SidebarContent className="flex-1 overflow-hidden flex flex-col">
        
        {/* Chat History Section */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 custom-scrollbar">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <div className="flex items-center justify-between px-2 py-2 text-xs font-semibold uppercase text-gray-400 hover:text-white transition-colors">
                {!isCollapsed && (
                  <>
                    <span className="flex items-center gap-2">
                      <MessageCircle size={14} />
                      Recent Chats
                    </span>
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                      {workspaces.length}
                    </span>
                  </>
                )}
              </div>
            </SidebarGroupLabel>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={20} className="animate-spin text-gray-400" />
                {!isCollapsed && <span className="ml-2 text-sm text-gray-400">Loading chats...</span>}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex items-center justify-center py-8 px-2">
                <AlertCircle size={20} className="text-red-400" />
                {!isCollapsed && <span className="ml-2 text-sm text-red-400">{error}</span>}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && workspaces.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 px-2 text-center">
                <MessageCircle size={32} className="text-gray-600 mb-2" />
                {!isCollapsed && (
                  <>
                    <p className="text-sm text-gray-400 mb-2">No chats found</p>
                    <button
                      onClick={() => router.push('/chat/new')}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Start your first chat
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Workspace List */}
            <div className="flex flex-col gap-1">
              {workspaces.map((ws) => (
                <div
                  key={ws.id}
                  className={`group relative rounded-lg transition-all duration-200 ${
                    activeWorkspace === ws.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                      : 'hover:bg-gray-800'
                  }`}
                  onMouseEnter={() => setHoveredWorkspace(ws.id)}
                  onMouseLeave={() => setHoveredWorkspace(null)}
                >
                  <button
                    onClick={() => handleWorkspaceClick(ws.id)}
                    className={`w-full px-3 py-3 text-left transition-all duration-200 rounded-lg ${
                      isCollapsed ? 'justify-center' : 'justify-start'
                    } flex items-center gap-3`}
                  >
                    {/* Chat Icon */}
                    <div className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}>
                      <MessageCircle size={16} className={`${
                        activeWorkspace === ws.id ? 'text-white' : 'text-gray-400'
                      }`} />
                    </div>

                    {/* Chat Info */}
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm font-medium truncate ${
                            activeWorkspace === ws.id ? 'text-white' : 'text-gray-200'
                          }`}>
                            {truncateText(ws.title)}
                          </h3>
                        
                        </div>
                      </div>
                    )}

                    {/* Active Indicator */}
                    {activeWorkspace === ws.id && (
                      <ChevronRight size={16} className="text-white animate-pulse" />
                    )}
                  </button>

                
                </div>
              ))}
            </div>
          </SidebarGroup>
        </div>
      </SidebarContent>

      {/* Enhanced Footer */}
      <SidebarFooter className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="px-4 py-3">
          <Footer />
        </div>
      </SidebarFooter>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </Sidebar>
  );
}