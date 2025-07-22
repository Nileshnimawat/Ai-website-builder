import { Prisma } from "@prisma/client";
export type Message = Prisma.MessageGetPayload<true>;
export type Workspace = Prisma.WorkspaceGetPayload<true>;
export type User = Prisma.UserGetPayload<true>;
