"use server"
import { prisma } from "@/lib/prisma";
import {currentUser, User } from "@clerk/nextjs/server";

export async function saveUserToDB(user: User) {
  await prisma.user.upsert({
    where: { clerkId: user.id },
    update: {
      email: user.emailAddresses[0].emailAddress,
      name: user.firstName + " " + user.lastName,
      phoneNumber: user.phoneNumbers?.[0]?.phoneNumber
        ? Number(user.phoneNumbers[0].phoneNumber)
        : null,
    },
    create: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.firstName + " " + user.lastName,
      phoneNumber: user.phoneNumbers?.[0]?.phoneNumber
        ? Number(user.phoneNumbers[0].phoneNumber)
        : null,
    },
  });
}

export async function createWorkspace(title: string) {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const workspace = await prisma.workspace.create({
    data: {
      title: title || "New Chat", // fallback to default if empty
      user: {
        connect: { clerkId: user.id },
      },
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
  try {
    const message = await prisma.message.create({
      data: {
        role,
        content,
        workspaceId,
      },
    });

    return message;
  } catch (error) {
    console.error("❌ Error saving message:", error);
    throw new Error("Failed to save message");
  }
}

export async function getWorkspaceMessages(workspaceId: string) {
  const user = await currentUser();
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      user: { clerkId: user.id }, 
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!workspace) {
    throw new Error("Workspace not found or you don't have access");
  }

  return workspace.messages;
}

export async function getUserWorkspaces() {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const workspaces = await prisma.workspace.findMany({
    where: {
      user: {
        clerkId: user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return workspaces;
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
