import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
  
});

const supportAgent = new Agent(components.agent, {
  name: "support-agent", 
  chat: google.chat("gemini-2.0-flash"),
  instructions: "You are a helpful and friendly customer support assistant.",
});

export { supportAgent };


