export const sampleProjects = [
  {
    title: "Bank Marketing Term Deposit Predictor",
    description:
      "End-to-end ML pipeline for term deposit prediction with preprocessing, model comparison, evaluation, and deployment workflow.",
    github: "https://github.com/rgrohitgupta938/bank_marketing",
    live: "https://bankmarketing-exaggy3la8ywtjirbfrb4q.streamlit.app/",
    techStack: ["Python", "Scikit-learn", "XGBoost", "Streamlit", "AWS S3"],
    category: "Machine Learning",
    featured: true,
    problem:
      "Bank campaign conversion prediction is noisy and imbalanced, so simple accuracy is not enough for real decision-making.",
    approach:
      "Built a full ML pipeline with preprocessing, feature handling, model comparison, and evaluation using business-relevant metrics.",
    outcome:
      "Created a deployment-ready project with training, evaluation, and serving flow suitable for portfolio and interview discussion.",
    features: [
      "Data preprocessing pipeline",
      "Model comparison",
      "Deployment-ready workflow",
      "Interactive demo",
    ],
    screenshots: [
      "/projects/bank-marketing/1.png",
      "/projects/bank-marketing/2.png",
      "/projects/bank-marketing/3.png",
    ],
  },
  {
    title: "Agentic AI Lead Generation System",
    description:
      "Multi-agent architecture for lead discovery, research, personalization, and reporting.",
    github: "https://github.com/rgrohit",
    live: "",
    techStack: ["LangGraph", "LLMs", "Automation", "Python"],
    category: "Generative AI",
    featured: true,
    problem:
      "Manual lead research and outreach personalization is slow, repetitive, and difficult to scale.",
    approach:
      "Designed a coordinator-based agent system that delegates research, qualification, messaging, and reporting to specialized agents.",
    outcome:
      "Structured an extensible architecture for scalable outbound intelligence and AI-assisted prospecting.",
    features: [
      "Coordinator agent",
      "Lead research workflow",
      "Personalized outreach logic",
      "Report generation",
    ],
    screenshots: [
      "/projects/agentic-ai/1.png",
      "/projects/agentic-ai/2.png",
    ],
  },
  {
    title: "Healthcare AI Assistant",
    description:
      "Domain-focused AI assistant with retrieval and reasoning workflows for knowledge-heavy use cases.",
    github: "https://github.com/rgrohit",
    live: "",
    techStack: ["RAG", "LLMs", "Python", "FastAPI"],
    category: "Applied AI",
    featured: false,
    problem:
      "Healthcare and medical workflows require accurate retrieval and structured knowledge support.",
    approach:
      "Built an assistant pattern around retrieval, prompt control, and domain-focused response generation.",
    outcome:
      "Demonstrated how AI can support knowledge-heavy workflows in regulated and high-context domains.",
    features: [
      "Retrieval pipeline",
      "Domain-focused prompting",
      "Structured response flow",
      "Backend API support",
    ],
    screenshots: [
      "/projects/healthcare-ai/1.png",
      "/projects/healthcare-ai/2.png",
    ],
  },
];
