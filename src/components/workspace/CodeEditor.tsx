"use client";

import React, { useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { autocompletion } from "@codemirror/autocomplete";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import lookup from "@/lib/lookup";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useParams } from "next/navigation";
import {
  getWorkspaceFiles,
  saveWorkspaceFiles,
} from "@/server/actions/user.action";

interface AIResponse {
  output: {
    files: Record<string, { code: string }>;
  };
}

const CodeEditor = () => {
  const params = useParams();
  const workspaceId = params?.id as string;

  const prompt = useSelector((state: RootState) => state.chat.prompt);
  const [files, setFiles] = useState(lookup.DEFAULT_FILE);
  const [key, setKey] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load files from workspace
  useEffect(() => {
    const loadFiles = async () => {
      try {
        if (!workspaceId) return;
        
        const dbFiles = await getWorkspaceFiles(workspaceId);
        if (dbFiles && typeof dbFiles === "object" && !Array.isArray(dbFiles)) {
          setFiles({ ...lookup.DEFAULT_FILE, ...dbFiles });
          setKey(Date.now());
        }
      } catch (err) {
        console.error("Error loading files:", err);
        setError("Failed to load workspace files");
      }
    };
    
    loadFiles();
  }, [workspaceId]);


  useEffect(() => {
    const fetchCode = async () => {
      if (!prompt?.trim()) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("/api/codes", {
          method: "POST",
          body: JSON.stringify({ prompt }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: AIResponse = await res.json();
        
        if (!data.output?.files) {
          throw new Error("Invalid response format");
        }

        const merged = { ...lookup.DEFAULT_FILE, ...data.output.files };
        setFiles(merged);
        setKey(Date.now());

        // Save to workspace if workspaceId exists
        if (workspaceId) {
          await saveWorkspaceFiles(workspaceId, merged);
        }
      } catch (err) {
        console.error("Error generating/saving code:", err);
        setError(err instanceof Error ? err.message : "Failed to generate code");
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [prompt, workspaceId]);

  if (loading) return <LoadingSpinner />;


  return (
    <div className="w-full h-full bg-[#111313] flex flex-col overflow-hidden">
      <SandpackProvider
        key={key}
        files={files}
        customSetup={{ dependencies: lookup.DEPENDANCY }}
        template="react"
        theme={sandpackDark}
        options={{
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
        }}
      >
        <div className="flex flex-col h-full ">
          {/* Header with tabs */}
          <div className="flex-shrink-0  border-b border-white/10">
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid w-50 grid-cols-2 bg-[#2a2a2a] border border-white/10">
                <TabsTrigger
                  value="code"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 transition-all duration-200  flex items-center gap-2 "
                >
                 
                  Code Editor
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 transition-all duration-200 flex items-center gap-2 "
                >
                           Preview
                </TabsTrigger>
                
              </TabsList>

              {/* Content area */}
              <div className=" h-[calc(100vh-120px)]">
                <TabsContent value="code" className="h-full m-0 data-[state=active]:block">
                  <SandpackLayout className="h-full w-full">
                    <SandpackFileExplorer
                      style={{ 
                        height: "100%",
                        minWidth: "200px",
                        maxWidth: "300px"
                      }}
                      className="border-r border-white/10 bg-[#1a1a1a] overflow-y-auto"
                    />
                    <SandpackCodeEditor
                      style={{ 
                        height: "100%",
                        maxWidth:"800px",
                        flex: 1
                      }}
                      className="bg-[#1e1e1e] overflow-y-auto overflow-x-auto"
                      extensions={[autocompletion()]}
                      showTabs
                      showLineNumbers
                      showInlineErrors
                      wrapContent
                    />
                  </SandpackLayout>
                </TabsContent>

                <TabsContent value="preview" className="h-full m-0 data-[state=active]:block">
                  <SandpackLayout className="h-full w-full">
                    <SandpackPreview
                      style={{ 
                        height: "100%",
                        width: "100%"
                      }}
                      showNavigator
                      showRefreshButton
                      className="bg-white rounded-lg border border-white/10"
                    />
                  </SandpackLayout>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </SandpackProvider>
    </div>
  );
};

export default CodeEditor;

const LoadingSpinner = () => (
  <div className="w-full h-full bg-[#111313] flex items-center justify-center">
    <div className="flex flex-col items-center space-y-6 p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200/20 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-r-blue-400/60 rounded-full animate-ping"></div>
      </div>
      <div className="text-center space-y-2">
        <div className="text-white text-xl font-semibold">Generating Code</div>
        <div className="text-gray-400 text-sm max-w-md text-center">
          AI is processing your request and generating the code. This may take a few moments.
        </div>
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);


