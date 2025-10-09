import { Resend } from "resend";
import React from "react";

export const sendEmail = async (to: string, subject: string, template: React.ReactNode) => {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  
  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text: "",
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};