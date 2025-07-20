import { Prisma } from "../../prisma/generated";
export type Message = Prisma.MessageGetPayload<true>;
export type Workspace = Prisma.WorkspaceGetPayload<true>;
export type User = Prisma.UserGetPayload<true>;
