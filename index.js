// node --version # Should be >= 18
// npm install @google/generative-ai

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "YOUR_API_KEY";

async function runChat() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You've been tasked with creating a music learning chatbot! Design a virtual assistant that can help aspiring musicians improve their skills. Think about the specific areas of music education it could cover, such as theory, technique, composition, or even instrument-specific lessons. Consider how the chatbot can provide interactive exercises, personalized feedback, and resources to make the learning experience engaging and effective. Get creative and imagine the possibilities of this music learning chatbot!"}],
      },
      {
        role: "model",
        parts: [{ text: "## Meet \"Muse\": Your AI Music Mentor\n\n**Muse** is an AI-powered music learning chatbot designed to be a companion for aspiring musicians of all levels.  Muse can tailor lessons and feedback to the user's specific needs and interests, making learning music fun and efficient.\n\n**Here's what Muse can offer:**\n\n**1. Foundational Knowledge:**\n\n*   **Music Theory:** Learn about scales, chords, intervals, rhythm, harmony, and music notation through interactive lessons and quizzes. \n*   **Ear Training:** Develop your aural skills with exercises in interval recognition, chord identification, and melodic dictation.\n*   **Music History:** Explore different musical eras, composers, and genres to understand the evolution of music.\n\n**2. Instrument-Specific Guidance:**\n\n*   **Choose Your Instrument:** Muse can cater to various instruments, including guitar, piano, violin, drums, and more.\n*   **Technique Training:** Learn proper posture, fingering techniques, and exercises to improve dexterity and control. \n*   **Interactive Practice:** Follow along with virtual instructors or receive feedback on your playing through microphone input.\n\n**3. Composition and Creativity:**\n\n*   **Songwriting Tools:** Explore different chord progressions, experiment with melodies, and learn about song structure and arrangement.\n*   **Virtual Instruments:** Play around with a variety of virtual instruments to create your own compositions. \n*   **Feedback and Refinement:**  Muse can analyze your compositions and provide constructive feedback on melody, harmony, and rhythm.\n\n**4. Personalized Learning Experience:**\n\n*   **Goal Setting:** Set specific goals and track your progress over time.\n*   **Adaptive Learning:** Muse adjusts the difficulty and pace of lessons based on your performance and understanding.\n*   **Custom Playlists:** Discover new music based on your preferences and learning goals.\n*   **Practice Reminders and Motivation:** Stay on track with scheduled reminders and encouraging messages.\n\n**5. Additional Features:**\n\n*   **Metronome and Tuner:** Keep your timing and pitch perfect with built-in tools.\n*   **Music Glossary:** Access a comprehensive library of musical terms and definitions.\n*   **Community Forum:** Connect with other aspiring musicians, share your progress, and learn from each other.\n\n**Muse's potential goes beyond simply providing information. It can be a true mentor, adapting to your learning style and offering personalized support to help you achieve your musical aspirations.**"}],
      },
      {
        role: "user",
        parts: [{ text: "from where to start to learn the music"}],
      },
      {
        role: "model",
        parts: [{ text: "## Starting Your Musical Journey with Muse:\n\nThe best place to begin your music learning adventure with Muse depends on your current knowledge, goals, and interests. Here are some potential starting points:\n\n**1. Complete Beginners:**\n\n*   **Foundational Music Theory:** Start with the basics of music theory, including notes, rhythm, scales, and simple chords. This will provide a solid understanding of the language of music.\n*   **Ear Training:** Begin with simple interval recognition exercises and gradually progress to more complex tasks like chord identification and melodic dictation.\n*   **Instrument Exploration:** If you haven't chosen an instrument yet, explore different options through Muse's virtual instruments or introductory lessons. This can help you discover your preference. \n\n**2. Those with Some Musical Background:**\n\n*   **Review and Refine:**  Brush up on your existing knowledge of music theory and ear training through Muse's interactive quizzes and exercises.\n*   **Focus on Technique:**  If you already play an instrument, dive deeper into instrument-specific lessons and exercises to improve your technique and dexterity. \n*   **Explore Composition:** Start experimenting with Muse's songwriting tools and virtual instruments to create your own melodies and chord progressions.\n\n**3. Specific Goals:**\n\n*   **Playing a Specific Song:**  Tell Muse what song you want to learn, and it will provide you with the necessary chords, tabs, or sheet music, along with practice tips.\n*   **Improving Improvisation:** Focus on scales, chord progressions, and ear training exercises specifically designed to enhance your improvisational skills. \n*   **Writing Music in a Specific Genre:**  Explore the characteristics of your preferred genre and learn about the common chord progressions, rhythmic patterns, and song structures used within it.\n\n**Remember, Muse is designed to adapt to your individual needs.** As you progress, it will recommend new lessons and challenges based on your performance and goals. \n\n**Don't hesitate to experiment, explore different areas, and most importantly, have fun!**"}],
      },
    ],
  });

  const result = await chat.sendMessage("YOUR_USER_INPUT");
  const response = result.response;
  console.log(response.text());
}

runChat();