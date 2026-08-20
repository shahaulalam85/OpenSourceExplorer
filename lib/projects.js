export const projects = [
  {
    id: 1,
    name: "Next.js",
    description: "The React Framework for the Web. Used by some of the world's largest companies, Next.js enables you to create high-quality web applications by enabling React Server Components and dynamic routing.",
    domain: "Web Development",
    technologies: ["Next.js", "React", "TypeScript", "Webpack"],
    difficulty: "Intermediate",
    stars: 125000,
    beginnerFriendly: false,
    githubUrl: "https://github.com/vercel/next.js",
    language: "TypeScript",
    issues: 1240,
    license: "MIT"
  },
  {
    id: 2,
    name: "React",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.",
    domain: "Web Development",
    technologies: ["React", "JavaScript", "JSX", "HTML/CSS"],
    difficulty: "Advanced",
    stars: 224000,
    beginnerFriendly: false,
    githubUrl: "https://github.com/facebook/react",
    language: "JavaScript",
    issues: 980,
    license: "MIT"
  },
  {
    id: 3,
    name: "VS Code",
    description: "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications. It features code completion, debugging, Git integration, and extensibility.",
    domain: "Web Development",
    technologies: ["TypeScript", "Electron", "Node.js", "HTML"],
    difficulty: "Advanced",
    stars: 165000,
    beginnerFriendly: false,
    githubUrl: "https://github.com/microsoft/vscode",
    language: "TypeScript",
    issues: 4500,
    license: "MIT"
  },
  {
    id: 4,
    name: "PyTorch",
    description: "An open-source machine learning framework that accelerates the path from research prototyping to production deployment. PyTorch provides tensor computation with strong GPU acceleration.",
    domain: "AI/ML",
    technologies: ["Python", "C++", "CUDA", "NumPy"],
    difficulty: "Advanced",
    stars: 82000,
    beginnerFriendly: false,
    githubUrl: "https://github.com/pytorch/pytorch",
    language: "Python",
    issues: 3200,
    license: "BSD 3-Clause"
  },
  {
    id: 5,
    name: "Fastify",
    description: "An efficient and low-overhead web framework for Node.js, designed to provide the best developer experience with minimal overhead and a powerful plugin architecture.",
    domain: "Backend",
    technologies: ["Node.js", "JavaScript", "Schema", "HTTP"],
    difficulty: "Beginner",
    stars: 31000,
    beginnerFriendly: true,
    githubUrl: "https://github.com/fastify/fastify",
    language: "JavaScript",
    issues: 45,
    license: "MIT"
  },
  {
    id: 6,
    name: "Svelte",
    description: "A radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step.",
    domain: "Web Development",
    technologies: ["Svelte", "HTML", "CSS", "Compiler"],
    difficulty: "Beginner",
    stars: 78000,
    beginnerFriendly: true,
    githubUrl: "https://github.com/sveltejs/svelte",
    language: "TypeScript",
    issues: 350,
    license: "MIT"
  },
  {
    id: 7,
    name: "Deno",
    description: "A simple, modern, and secure runtime for JavaScript, TypeScript, and WebAssembly that uses V8 and is built in Rust. It has built-in testing, linting, and formatting tools.",
    domain: "Backend",
    technologies: ["Rust", "TypeScript", "V8", "WebAssembly"],
    difficulty: "Intermediate",
    stars: 95000,
    beginnerFriendly: false,
    githubUrl: "https://github.com/denoland/deno",
    language: "Rust",
    issues: 720,
    license: "MIT"
  },
  {
    id: 8,
    name: "Ansible",
    description: "A radically simple IT automation system that handles configuration management, application deployment, cloud provisioning, ad-hoc task execution, and multi-node orchestration.",
    domain: "DevOps",
    technologies: ["Python", "YAML", "Shell", "Linux"],
    difficulty: "Intermediate",
    stars: 61000,
    beginnerFriendly: true,
    githubUrl: "https://github.com/ansible/ansible",
    language: "Python",
    issues: 1800,
    license: "GPL-3.0"
  },
  {
    id: 9,
    name: "Docker Moby",
    description: "The Moby Project is an open-source project created by Docker to enable and accelerate software containerization. It provides a library of components, a framework, and reference designs.",
    domain: "DevOps",
    technologies: ["Go", "Containerd", "Linux", "OS"],
    difficulty: "Advanced",
    stars: 69000,
    beginnerFriendly: false,
    githubUrl: "https://github.com/moby/moby",
    language: "Go",
    issues: 1100,
    license: "Apache-2.0"
  },
  {
    id: 10,
    name: "Tiptap",
    description: "A headless, extendable, and rich-text editor framework for React, Vue, and vanilla JavaScript. Build custom editors with full control over design and behavior.",
    domain: "Web Development",
    technologies: ["JavaScript", "ProseMirror", "Editor", "TypeScript"],
    difficulty: "Beginner",
    stars: 23000,
    beginnerFriendly: true,
    githubUrl: "https://github.com/ueberdosis/tiptap",
    language: "TypeScript",
    issues: 120,
    license: "MIT"
  }
];

export function getProject(id) {
  const numericId = parseInt(id, 10);
  return projects.find((p) => p.id === numericId) || null;
}

export function formatStars(n) {
  if (n >= 1000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return n.toString();
}
