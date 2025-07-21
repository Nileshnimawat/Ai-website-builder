"use server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/GetCurrentUser";

// Save user on first login
export async function saveUserToDB(user: {
  email: string;
  name: string;
}) {
  return prisma.user.upsert({
    where: { email: user.email },
    update: {
      name: user.name,
   
    },
    create: {
      email: user.email,
      name: user.name,
    
    },
  });
}

export async function createWorkspace(title: string) {
  const user = await getCurrentUser();
  if (!user?.email) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!dbUser) throw new Error("User not found");

  const workspace = await prisma.workspace.create({
    data: {
      title: title || "New Chat",
      userId: dbUser.id,
    },
  });

  return workspace.id;
}

export async function saveMessage({
  role,
  content,
  workspaceId,
}: {
  role: "user" | "assistant";
  content: string;
  workspaceId: string;
}) {
  return prisma.message.create({
    data: {
      role,
      content,
      workspaceId,
    },
  });
}

export async function getWorkspaceMessages(workspaceId: string) {
  const user = await getCurrentUser();
  if (!user?.email) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!dbUser) throw new Error("User not found");

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      userId: dbUser.id,
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!workspace) throw new Error("Workspace not found");

  return workspace.messages;
}

export async function getUserWorkspaces() {
  const user = await getCurrentUser();
  if (!user?.email) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!dbUser) throw new Error("User not found");

  return prisma.workspace.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
  });
}

// export async function getWorkspaceFiles(workspaceId: string) {
//   try {
//     const workspace = await prisma.workspace.findUnique({
//       where: { id: workspaceId },
//       select: { files: true },
//     });

//     return workspace?.files || null;
//   } catch (err) {
//     console.error("Failed to fetch files:", err);
//     return null;
//   }
// }

// export async function saveWorkspaceFiles(
//   workspaceId: string,
//   files: Record<string, { code: string }>
// ) {
//   try {
//     await prisma.workspace.update({
//       where: { id: workspaceId },
//       data: { files },
//     });

//     return { success: true };
//   } catch (err) {
//     console.error("Failed to save files:", err);
//     return { error: true };
//   }
// }
