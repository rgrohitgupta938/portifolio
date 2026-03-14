export default function AboutSkills() {
  const skillGroups = [
    {
      title: "AI / ML",
      items: [
        "Machine Learning",
        "Deep Learning",
        "LLMs",
        "RAG",
        "Prompt Engineering",
        "Model Evaluation",
      ],
    },
    {
      title: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "MongoDB",
        "FastAPI",
        "Authentication",
      ],
    },
    {
      title: "Frontend",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Responsive UI",
        "Modern Web Apps",
      ],
    },
    {
      title: "Cloud / Tools",
      items: [
        "AWS",
        "Docker",
        "GitHub",
        "Deployment",
        "Postman",
        "MongoDB Atlas",
      ],
    },
  ];

  return (
    <section className="mt-24 border-t border-white/10 pt-16">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            About Me
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Building practical AI products with full-stack execution.
          </h2>

          <p className="mt-6 text-base leading-8 text-zinc-300">
            I work across machine learning, LLM applications, backend systems,
            and modern frontend development. My focus is not just prototypes,
            but useful products that can be deployed, tested, and presented
            professionally.
          </p>

          <p className="mt-5 text-base leading-8 text-zinc-300">
            I am currently building projects around AI engineering, portfolio
            platforms, data-driven applications, agentic workflows, and modern
            product delivery using Next.js, Node.js, Express, and MongoDB.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              Production-Oriented
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              Problem Solving
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              Full-Stack Delivery
            </span>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-xl font-semibold text-white">{group.title}</h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
