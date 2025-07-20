import { Prisma } from "../../prisma/generated";

export type Message = Prisma.MessageGetPayload<{}>;
export type Workspace = Prisma.WorkspaceGetPayload<{}>;
export type User = Prisma.UserGetPayload<{}>;
