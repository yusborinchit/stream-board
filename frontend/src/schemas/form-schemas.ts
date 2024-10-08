import { z } from "zod";

export const VideoFormSchema = z.object({
  name: z.string().min(1),
  color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  fullscreen: z.boolean(),
  width: z.number().min(50),
  height: z.number().min(50),
  random: z.boolean(),
  x: z.number().min(0),
  y: z.number().min(0),
});

export const AudioFormSchema = z.object({
  name: z.string().min(1),
  color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
});
