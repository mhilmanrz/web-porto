/** @type {Array<import('./types').Project>} */
export const projects = [
  {
    slug: 'learning-planner-ai',
    title: 'Learning Planner AI',
    tags: ['Product', 'Bootcamp'],
    summary:
      'AI-powered personalized learning planner built during Dicoding Bootcamp Batch 12. Helps learners create structured study plans aligned with their goals using Google Gemini.',
    problem:
      'Learners often struggle to create structured, realistic study plans that align with their personal goals, available time, and learning pace. Generic templates fail to account for individual context.',
    approach:
      'Designed a Human-in-the-Loop recommendation flow where AI suggests a plan and the user refines it. Implemented Zod-validated LLM output with automatic retry logic to ensure structured responses. Applied privacy-first AI context sanitization to avoid sending sensitive user data to the model.',
    impact:
      'Capstone project selected as a showcase project. Delivered as a collaborative effort by a team of 4, demonstrating end-to-end product thinking from problem definition to deployment.',
    techStack: ['React 19', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Google Gemini 2.5 Flash'],
    liveUrl: '',
    githubUrl: '',
    coverImage: null,   // base64 string or null
    gallery: [],        // array of base64 strings
  },
  {
    slug: 'hospital-information-system',
    title: 'Hospital Information System (RSUPN Cipto Mangunkusumo)',
    tags: ['Dev', 'Internship'],
    summary:
      'Web-based module built during internship at RSUPN Cipto Mangunkusumo via Maganghub. Streamlined hospital administrative workflows with a modern web interface.',
    problem:
      'Existing hospital admin processes relied on manual or legacy systems that were slow and error-prone, impacting staff efficiency and data accuracy.',
    approach:
      'Built a web-based module using Laravel MVC pattern with a relational MySQL database. Applied Tailwind CSS for a responsive, accessible UI that integrates with the hospital\'s existing data infrastructure.',
    impact:
      'Delivered a functional internal tool during the internship period that improved workflow efficiency for the administrative unit. Gained hands-on experience with enterprise-grade healthcare software requirements.',
    techStack: ['Laravel', 'MySQL', 'Tailwind CSS'],
    liveUrl: '',
    githubUrl: '',
    coverImage: null,
    gallery: [],
  },
]
