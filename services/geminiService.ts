import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { GeneratedData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const resourceSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "The human-readable name of the resource, e.g., 'Full Python Course (Playlist)'." },
        url: { type: Type.STRING, description: "The fully-qualified, working, canonical URL. No shorteners, no broken links." },
        platform: { type: Type.STRING, description: "The source platform, e.g., 'YouTube', 'Coursera', 'NPTEL', 'freeCodeCamp'." },
        type: { type: Type.STRING, enum: ['Playlist', 'Course', 'Docs', 'Article', 'Repo'], description: "The format of the resource." },
        access: { type: Type.STRING, enum: ['Free', 'Paid', 'Free audit'], description: "The access model for the resource." },
        notes: { type: Type.STRING, description: "A brief, helpful note on why this resource is good or what it covers." },
        last_verified_IST: { type: Type.STRING, description: "The timestamp (YYYY-MM-DD HH:mm) when you last verified this link." },
    },
    required: ['title', 'url', 'platform', 'type', 'access', 'notes', 'last_verified_IST']
};

const titledResourceGroupSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "The name of the subject, skill, or topic, e.g., 'Data Structures & Algorithms'." },
        resources: { type: Type.ARRAY, description: "An array of 2-3 verified resources for this topic.", items: resourceSchema }
    },
    required: ['title', 'resources']
};


const roadmapSchema = {
  type: Type.OBJECT,
  properties: {
    roadmap: {
      type: Type.ARRAY,
      description: "A 4-element array, one for each year of the B.Tech program.",
      items: {
        type: Type.OBJECT,
        properties: {
          year: { type: Type.NUMBER, description: "The academic year (1, 2, 3, 4)." },
          coreSubjects: { type: Type.ARRAY, description: "Key subjects for the year.", items: titledResourceGroupSchema },
          skills: {
            type: Type.OBJECT,
            properties: {
              programming: { type: Type.ARRAY, description: "Programming languages and frameworks to learn.", items: titledResourceGroupSchema },
              software: { type: Type.ARRAY, description: "Software, tools, and platforms to master.", items: titledResourceGroupSchema },
              softSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of important soft skills." },
            },
            required: ['programming', 'software', 'softSkills'],
          },
          certifications: { type: Type.ARRAY, description: "Recommended certifications.", items: titledResourceGroupSchema },
          projects: { 
            type: Type.ARRAY, 
            description: "Project ideas for the year. Each project MUST include a description and a relevant, working GitHub link.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING, description: "A short, compelling project description." },
                    githubLink: { type: Type.STRING, description: "A MANDATORY, valid link to a starter repo, tutorial, or relevant library on GitHub." }
                },
                required: ['title', 'description', 'githubLink']
            }
          },
          internships: { type: Type.STRING, description: "Internship advice for the year." },
          placementPrep: { type: Type.ARRAY, description: "Placement preparation topics and resources.", items: titledResourceGroupSchema },
        },
        required: ['year', 'coreSubjects', 'skills', 'certifications', 'projects', 'internships', 'placementPrep'],
      },
    },
    careerPaths: {
      type: Type.ARRAY,
      description: "An array of 3-5 potential career paths related to the student's goal.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Career title (e.g., 'AI/ML Engineer')." },
          description: { type: Type.STRING, description: "A brief description of the role." },
          skills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key skills required." },
          avgSalary: { type: Type.STRING, description: "Estimated average salary in India." },
          projectIdea: { type: Type.STRING, description: "A portfolio-worthy project idea." },
        },
        required: ['title', 'description', 'skills', 'avgSalary', 'projectIdea'],
      },
    },
  },
  required: ['roadmap', 'careerPaths'],
};

export const generateRoadmapAndCareers = async (branch: string, goal: string): Promise<GeneratedData> => {
    const prompt = `
    You are an expert AI career counselor for B.Tech students in India. Your output MUST be a single, valid JSON object adhering to the provided schema.

    **Student Profile:**
    - Branch: "${branch}"
    - Career Goal: "${goal}"

    **CRITICAL GOAL: LINK QUALITY & VERIFICATION**
    Your primary function is to provide a roadmap with verified, high-quality, and working links. For every single roadmap item that requires resources (Subjects, Tools, Certifications, Placement Prep), you MUST return 2–3 verified resources.

    **SOURCE & VALIDATION RULES (NON-NEGOTIABLE):**
    1.  **VERIFY ALL LINKS:** Before outputting, you must internally verify that every single URL is a working HTTPS link, not a 404, placeholder, or geo-blocked page. Silently replace any failing link with a verified alternative.
    2.  **ALLOWLIST-FIRST:** Strongly prefer these domains: youtube.com, nptel.ac.in, freecodecamp.org, coursera.org, edx.org, geeksforgeeks.org, official documentation (e.g., react.dev, python.org), and github.com.
    3.  **CANONICAL YOUTUBE URLS:** For YouTube, use ONLY full playlist URLs. The URL format must be \`https://www.youtube.com/playlist?list=PLAYLIST_ID\`. Do NOT use "Mix" playlists, single videos (unless it's a full course), or links with extra tracking parameters.
    4.  **NO RESTRICTIONS:** All links must be publicly viewable without a required sign-in, not age-restricted, and not "Made for kids."
    5.  **PROJECTS REQUIRE GITHUB:** Every project idea MUST include a working 'githubLink' to a tutorial, boilerplate, or relevant library.
    6.  **PROVIDE FALLBACKS:** For each topic, provide at least one free resource (YouTube, NPTEL, Docs) and, if relevant, a paid/certificate option (Coursera, edX). Ensure regional availability (NPTEL is excellent for India).
    7.  **TIMESTAMP VERIFICATION:** For each resource, you must provide the 'last_verified_IST' field with the timestamp of your check.

    **OUTPUT FORMAT (Strict Adherence Required):**
    - You must provide your response as a single, valid JSON object that strictly adheres to the provided schema. Do not include any text or markdown formatting (like \`\`\`json) before or after the JSON object.
    - The entire output should be tailored to the student's specified branch and career goal.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: roadmapSchema,
        },
    });
    
    const jsonText = response.text.trim();
    try {
        const parsedData = JSON.parse(jsonText);
        // Basic validation
        if (!parsedData.roadmap || !parsedData.careerPaths) {
            throw new Error("Invalid data structure received from API.");
        }
        return parsedData as GeneratedData;
    } catch (e) {
        console.error("Failed to parse JSON response:", jsonText);
        throw new Error("Could not parse the roadmap data. The format might be incorrect.");
    }
};


export const createChat = (): Chat => {
    return ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are 'Roadmap AI', a friendly and knowledgeable mentor for B.Tech students. Your goal is to answer their questions about careers, skills, projects, and academics. Keep your answers concise, encouraging, and student-friendly. Use bullet points and provide actionable advice. Do not go off-topic.",
      },
    });
};