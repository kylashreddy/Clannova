import { z } from "zod";
import { budgetOptions, industryOptions, serviceOptions } from "./content";

// Shared by the enquiry form (client-side validation) and /api/leads (server-side).
export const leadSchema = z.object({
  fullName: z.string({ error: "Please enter your full name." }).trim().min(2, "Please enter your full name.").max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string({ error: "Please enter a valid email address." }).trim().email("Please enter a valid email address.").max(200),
  phone: z
    .string({ error: "Please enter a valid phone number." })
    .trim()
    .regex(/^[+()\-\s\d]{7,20}$/, "Please enter a valid phone number, including country code if outside India."),
  industry: z.enum(industryOptions, { error: "Please choose your industry." }),
  service: z.enum(serviceOptions, { error: "Please choose a service." }),
  budget: z.enum(budgetOptions, { error: "Please choose a budget range." }),
  description: z
    .string({ error: "Please describe your project." })
    .trim()
    .min(20, "Tell us a little more: at least 20 characters.")
    .max(4000, "Please keep this under 4,000 characters."),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional().default(""),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
export type LeadField = keyof LeadInput;
