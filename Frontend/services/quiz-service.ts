import apiClient from "@/lib/api-client";
import { Question, QuizSettings } from "@/types/quiz";

interface QuizOption {
  text: string;
  option_index: "A" | "B" | "C" | "D";
}

interface QuizQuestion {
  id: number;
  question_text: string;
  options: QuizOption[];
  correct_answer: "A" | "B" | "C" | "D";
}

interface QuizParticipant {
  user_uuid: string;
  wallet_address: string;
  score: number;
  answered_questions: {
    question_id: number;
    answer: "A" | "B" | "C" | "D";
  }[];
  submission_time: number;
  start_time: number;
  reward: number;
}

interface Quiz {
  uuid: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  protocol: string;
  description: string;
  num_questions: number;
  questions: QuizQuestion[];
  access: "Public" | "Private";
  total_reward: number;
  max_reward_per_user: number;
  duration_in_sec_timestamp: number;
  start_time: number;
  end_time: number;
  created_at: number;
  created_by: string;
  participants: QuizParticipant[];
  status: "Pending" | "Active" | "Completed";
  submited: boolean;
  reward_type: "DistributedByRankToTopFive" | "Fixed";
}

export interface CreateQuizDto {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  protocol: string;
  access: "Public" | "Private";
  total_reward: number;
  max_reward_per_user: number;
  duration_in_sec_timestamp: number;
  start_time: number;
  reward_type: "distributed_by_rank" | "fixed";
  questions: {
    id: number;
    question_text: string;
    options: {
      text: string;
      option_index: "A" | "B" | "C" | "D";
    }[];
    correct_answer: "A" | "B" | "C" | "D";
  }[];
}

interface PublishQuizDto {
  quizId: string;
}

// Add this mock data
const MOCK_QUIZZES = [
  {
    id: "1",
    name: "Cartesi Experiment Week Quiz",
    description:
      "Test your knowledge about Cartesi's partnership and experiment week",
    difficulty: "Easy",
    protocol: "Cartesi",
    access: "Public",
    total_reward: 100.0,
    max_reward_per_user: 50.0,
    duration_in_sec_timestamp: 1800, // 30 minutes
    start_time: Math.floor(Date.now() / 1000),
    reward_type: "distributed_by_rank",
    questions: [
      {
        id: 1,
        type: "MULTIPLE_CHOICE",
        text: "Which protocol is Cartesi partnering with for this experiment week?",
        options: [
          { id: "1", text: "Eigen Layer", isCorrect: true },
          { id: "2", text: "Ethereum", isCorrect: false },
          { id: "3", text: "Optimism", isCorrect: false },
          { id: "4", text: "Solana", isCorrect: false },
        ],
        points: 10,
      },
      {
        id: 2,
        type: "MULTIPLE_CHOICE",
        text: "What's the duration of the program?",
        options: [
          { id: "A", text: "1 year", isCorrect: false },
          { id: "B", text: "2 weeks", isCorrect: false },
          { id: "C", text: "6 months", isCorrect: false },
          { id: "D", text: "1 week", isCorrect: true },
        ],
        points: 10,
      },
    ],
    status: "active",
    participants: 45,
  },
  {
    id: "2",
    name: "Web3 Gaming Fundamentals",
    description:
      "Test your understanding of Web3 gaming concepts and mechanics",
    difficulty: "Medium",
    protocol: "GameFi",
    access: "Public",
    total_reward: 200.0,
    max_reward_per_user: 75.0,
    duration_in_sec_timestamp: 2400, // 40 minutes
    start_time: Math.floor(Date.now() / 1000),
    reward_type: "fixed",
    questions: [
      {
        id: 1,
        type: "MULTIPLE_CHOICE",
        text: "What is the main advantage of blockchain gaming?",
        options: [
          { id: "A", text: "True ownership of assets", isCorrect: true },
          { id: "B", text: "Better graphics", isCorrect: false },
          { id: "C", text: "Faster gameplay", isCorrect: false },
          { id: "D", text: "Simpler controls", isCorrect: false },
        ],
        points: 10,
      },
      {
        id: 2,
        type: "MULTIPLE_CHOICE",
        text: "Which of these is NOT a common Web3 gaming token type?",
        options: [
          { id: "A", text: "Governance tokens", isCorrect: false },
          { id: "B", text: "Utility tokens", isCorrect: false },
          { id: "C", text: "Experience tokens", isCorrect: true },
          { id: "D", text: "NFTs", isCorrect: false },
        ],
        points: 10,
      },
    ],
    status: "upcoming",
    participants: 0,
  },
];

// Helper function to clean the raw quiz data
function cleanRawQuizData(rawData: string): Quiz[] {
  try {
    console.log("Raw data received:", rawData);

    // Remove the "All quizzes data: " prefix if it exists
    let dataString = rawData.replace("All quizzes data: ", "");

    // Handle array brackets if missing
    if (!dataString.startsWith("[")) {
      dataString = `[${dataString}]`;
    }

    // Clean up Rust-style formatting
    const cleanedString = dataString
      // Remove "Quiz {" and just leave the object content
      .replace(/Quiz \{/g, "{")
      .replace(/Question \{/g, "{")
      .replace(/QuizOption \{/g, "{")
      .replace(/QuizAnswer \{/g, "{")
      .replace(/Participant \{/g, "{")
      // Fix the enum values that don't have quotes
      .replace(/: Easy/g, ': "Easy"')
      .replace(/: Medium/g, ': "Medium"')
      .replace(/: Hard/g, ': "Hard"')
      .replace(/: Public/g, ': "Public"')
      .replace(/: Private/g, ': "Private"')
      .replace(/: Pending/g, ': "Pending"')
      .replace(/: Active/g, ': "Active"')
      .replace(/: Completed/g, ': "Completed"')
      .replace(
        /: DistributedByRankToTopFive/g,
        ': "DistributedByRankToTopFive"'
      )
      .replace(/: Fixed/g, ': "Fixed"')
      // Fix option indexes
      .replace(/option_index: A/g, 'option_index: "A"')
      .replace(/option_index: B/g, 'option_index: "B"')
      .replace(/option_index: C/g, 'option_index: "C"')
      .replace(/option_index: D/g, 'option_index: "D"')
      // Fix correct answers
      .replace(/correct_answer: A/g, 'correct_answer: "A"')
      .replace(/correct_answer: B/g, 'correct_answer: "B"')
      .replace(/correct_answer: C/g, 'correct_answer: "C"')
      .replace(/correct_answer: D/g, 'correct_answer: "D"')
      // Fix answers in answered_questions
      .replace(/answer: A/g, 'answer: "A"')
      .replace(/answer: B/g, 'answer: "B"')
      .replace(/answer: C/g, 'answer: "C"')
      .replace(/answer: D/g, 'answer: "D"')
      // Fix Rust-style object notation
      .replace(/(\w+):/g, '"$1":') // Add quotes to property names
      .replace(/,\s*}/g, "}") // Remove trailing commas in objects
      .replace(/,\s*]/g, "]") // Remove trailing commas in arrays
      .replace(/\\/g, "") // Remove escape characters
      .replace(/"\s+/g, '"') // Remove extra spaces after quotes
      .replace(/\s+"/g, '"') // Remove extra spaces before quotes
      .replace(/"submited":/g, '"submitted":'); // Fix typo

    console.log("Cleaned string:", cleanedString);

    // Parse the cleaned string into a JavaScript array
    let quizzes: Quiz[] = JSON.parse(cleanedString);

    // Ensure numerical fields are properly converted
    quizzes = quizzes.map((quiz) => ({
      ...quiz,
      num_questions: Number(quiz.num_questions),
      total_reward: Number(quiz.total_reward),
      max_reward_per_user: Number(quiz.max_reward_per_user),
      duration_in_sec_timestamp: Number(quiz.duration_in_sec_timestamp),
      start_time: Number(quiz.start_time),
      end_time: Number(quiz.end_time),
      created_at: Number(quiz.created_at),
      participants: quiz.participants
        ? quiz.participants.map((participant) => ({
            ...participant,
            score: Number(participant.score),
            submission_time: Number(participant.submission_time),
            start_time: Number(participant.start_time),
            reward: Number(participant.reward),
            answered_questions: participant.answered_questions
              ? participant.answered_questions.map((answer) => ({
                  ...answer,
                  question_id: Number(answer.question_id),
                }))
              : [],
          }))
        : [],
    }));

    console.log("Parsed quizzes:", quizzes);
    return quizzes;
  } catch (error) {
    console.error("Error cleaning quiz data:", error);
    return [];
  }
}

function transformSingleQuizResponse(rawData: any) {
  try {
    console.log("Raw data received:", rawData);

    // If data is already an object, return it
    if (typeof rawData !== "string" && typeof rawData === "object") {
      return rawData;
    }

    // Remove the "Fetched quiz: " prefix if it exists
    let dataString = rawData.toString().replace("Fetched quiz: ", "");

    // Clean up Rust-style formatting
    const cleanedString = dataString
      .replace(/Quiz \{/g, "{")
      .replace(/Question \{/g, "{")
      .replace(/QuizOption \{/g, "{")
      .replace(/: Easy/g, ': "Easy"')
      .replace(/: Medium/g, ': "Medium"')
      .replace(/: Hard/g, ': "Hard"')
      .replace(/: Public/g, ': "Public"')
      .replace(/: Private/g, ': "Private"')
      .replace(/: Pending/g, ': "Pending"')
      .replace(/: Active/g, ': "Active"')
      .replace(/: Completed/g, ': "Completed"')
      .replace(
        /: DistributedByRankToTopFive/g,
        ': "DistributedByRankToTopFive"'
      )
      .replace(/: Fixed/g, ': "Fixed"')
      .replace(/option_index: ([A-D])/g, 'option_index: "$1"')
      .replace(/correct_answer: ([A-D])/g, 'correct_answer: "$1"')
      .replace(/(\w+):/g, '"$1":')
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]")
      .replace(/\\/g, "")
      .replace(/"\s+/g, '"')
      .replace(/\s+"/g, '"');

    console.log("Cleaned string:", cleanedString);

    // Parse the cleaned string into a JavaScript object
    const quiz = JSON.parse(cleanedString);

    // Convert numerical fields
    return {
      ...quiz,
      num_questions: Number(quiz.num_questions),
      total_reward: Number(quiz.total_reward),
      max_reward_per_user: Number(quiz.max_reward_per_user),
      duration_in_sec_timestamp: Number(quiz.duration_in_sec_timestamp),
      start_time: Number(quiz.start_time),
      end_time: Number(quiz.end_time),
      created_at: Number(quiz.created_at),
      participants:
        quiz.participants?.map((p: any) => ({
          ...p,
          score: Number(p.score),
          submission_time: Number(p.submission_time),
          start_time: Number(p.start_time),
          reward: Number(p.reward),
          answered_questions:
            p.answered_questions?.map((a: any) => ({
              ...a,
              question_id: Number(a.question_id),
            })) || [],
        })) || [],
    };
  } catch (error) {
    console.error("Error transforming quiz data:", error);
    throw error;
  }
}

export const quizService = {
  // Create a new quiz
  async createQuiz(data: CreateQuizDto) {
    try {
      console.log("Making API call to create quiz:", data);
      const response = await apiClient.post("/quiz/create", data);
      console.log("API response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("API error:", error.response?.data || error);
      throw error;
    }
  },

  // Get quiz by ID
  async getQuiz(id: string) {
    const response = await apiClient.get(`/quizzes/${id}`);
    return response.data;
  },

  // Publish a quiz
  async publishQuiz(data: PublishQuizDto) {
    const response = await apiClient.post(`/quizzes/${data.quizId}/publish`);
    return response.data;
  },

  // Get all quizzes (with optional filters)
  async getQuizzes(params?: { status?: string; difficulty?: string }) {
    const response = await apiClient.get("/quizzes", { params });
    return response.data;
  },

  // Submit quiz answers
  async submitQuizAnswers(quizId: string, answers: any) {
    const response = await apiClient.post(`/quizzes/${quizId}/submit`, {
      answers,
    });
    return response.data;
  },

  async startQuiz(quiz_uuid: string) {
    try {
      console.log("Starting quiz with UUID:", quiz_uuid);

      const response = await apiClient.post(
        "/quiz/join",
        {
          quiz_uuid: quiz_uuid,
        },
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );

      console.log("Start quiz response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Failed to start quiz:", {
        error,
        uuid: quiz_uuid,
        request: error.request,
        response: error.response,
      });
      throw error;
    }
  },

  async healthCheck() {
    const response = await apiClient.get("/health");
    return response.data;
  },

  async getAllQuizzes(): Promise<Quiz[]> {
    try {
      console.log("Fetching all quizzes...");
      const response = await apiClient.get("/quizes");

      // Clean and parse the raw data
      const cleanedQuizzes = cleanRawQuizData(response.data);
      console.log("Cleaned quizzes:", cleanedQuizzes);

      return cleanedQuizzes;
    } catch (error: any) {
      console.error("Failed to fetch quizzes:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },

  async getQuizById(quizId: string) {
    try {
      const response = await apiClient.get(`/quiz/by-id/${quizId}`);
      console.log("Quiz API response:", response.data);
      const transformedQuiz = transformSingleQuizResponse(response.data);
      console.log("Transformed quiz:", transformedQuiz);
      return transformedQuiz;
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
      throw error;
    }
  },

  async getAll() {
    try {
      // For development, return mock data
      return MOCK_QUIZZES;
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
      throw error;
    }
  },

  async submitQuiz(submission: {
    quiz_id: string;
    answers: { question_id: string; selected_option: string }[];
  }) {
    try {
      const response = await apiClient.post(
        `/quizes/${submission.quiz_id}/submit`,
        submission
      );
      return response.data;
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      throw error;
    }
  },
};
