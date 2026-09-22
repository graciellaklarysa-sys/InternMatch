import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const PORT = 3000;

let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured");
    }
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "InternMatch" });
  });

  // CV Bullet Tailoring Endpoint
  app.post("/api/tailor-cv", async (req, res) => {
    try {
      const { bullet, internshipTitle, company, requiredSkills = [] } = req.body;

      if (!bullet || typeof bullet !== "string" || !bullet.trim()) {
        res.status(400).json({ error: "Please provide a CV bullet point to tailor." });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        // Fallback deterministic tailoring if API key is not yet set
        const cleaned = bullet.trim().replace(/^[-•*]\s*/, "");
        const verbs = ["Spearheaded", "Coordinated", "Executed", "Developed", "Formulated"];
        const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        const lowerFirst = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
        const fallbackRewritten = `${randomVerb} ${lowerFirst}, emphasizing relevance to ${internshipTitle || "the target role"}.`;
        
        res.json({
          rewrittenBullet: fallbackRewritten,
          explanation: "Polished with strong action verbs and focused structure without fabricating new facts.",
          matchedSkills: requiredSkills.slice(0, 2),
        });
        return;
      }

      const ai = getGeminiClient();

      const prompt = `Target Role: ${internshipTitle || "Internship"} at ${company || "Target Company"}
Required Skills for Role: ${requiredSkills.join(", ") || "General skills"}

User's Original CV Bullet Point:
"${bullet.trim()}"

Transform this bullet point into an impactful, professionally phrased resume bullet. Remember: absolutely NO invented numbers, unmentioned tools, or fabricated accomplishments. Rephrase with precise active verbs and clean cause-and-effect syntax.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are a professional university career coach and resume editor. Your strict directive is: NEVER fabricate, invent, or extrapolate numbers, metrics, software tools, awards, or outcomes that are not explicitly stated in the user's input. You may only reorganize, rephrase using strong active verbs, and polish the student's existing accomplishments so they highlight relevance to the target role. Always return JSON matching the specified schema.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rewrittenBullet: {
                type: Type.STRING,
                description: "The sharpened, polished bullet point strictly based only on provided facts.",
              },
              explanation: {
                type: Type.STRING,
                description: "Brief 1-sentence note explaining what was restructured without adding new facts.",
              },
              matchedSkills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of skills from the role requirements that this bullet highlights.",
              },
            },
            required: ["rewrittenBullet", "explanation", "matchedSkills"],
          },
        },
      });

      const responseText = response.text?.trim();
      if (!responseText) {
        throw new Error("No response received from the language model.");
      }

      const parsed = JSON.parse(responseText);
      res.json(parsed);
    } catch (err: unknown) {
      console.error("Error tailoring CV bullet:", err);
      const message = err instanceof Error ? err.message : "Unable to tailor CV bullet at this moment";
      res.status(500).json({ error: message });
    }
  });

  // Vite middleware for dev / static for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`InternMatch server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
