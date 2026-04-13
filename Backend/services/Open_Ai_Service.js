const googleAi = require("@google/genai");

const ai = new googleAi.GoogleGenAI({
    apiKey: process.env.GEMINI_KEY,
});

module.exports.getGeminiAPIResponse = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        return response.text
    } catch (err) {
        console.log(err);
        return "Error: Could not get response from Gemini API";
    }
}