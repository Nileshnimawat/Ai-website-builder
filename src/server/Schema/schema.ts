import { z } from 'zod';

// define a schema for the notifications
export const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      files: z.string().describe('Write all the files path.'),
      content: z.string().describe('Write all the paths of file with the code'),
    }),
  ),
});



export const fileSchema = z.object({
  path: z.string(),
  content: z.string(),
});

export const promptSchema = z.object({
  techStack: z.object({
    react: z.literal(true),
    reactVersion: z.string().regex(/^18/),
    tailwind: z.literal(true),
    vite: z.literal(true),
    router: z.literal(true),
  }),

  requirements: z.object({
    responsive: z.boolean(),
    accessible: z.boolean(),
    interactive: z.boolean(),
    mobileFirst: z.boolean(),
  }),

  dependencies: z.object({
    dependencies: z.record(z.string(), z.string()),
    devDependencies: z.record(z.string(), z.string()),
  }),

  files: z.array(fileSchema),

  userMessage: z.string().min(10, "Project description must be detailed"),
});
