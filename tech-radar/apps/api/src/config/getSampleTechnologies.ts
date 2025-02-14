import {
  TechnologyCategory,
  TechnologyDTO,
  TechnologyMaturity
} from '../../../../shared/src/lib/models/technology.model';

// generated technologies sourced from chatgpt
export function getSampleTechnologies(): TechnologyDTO[] {
  return [
    {
      name: 'Microservices',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Adopt,
      description: 'Adopt a service-oriented architecture with independently deployable services.',
      publishedAt: new Date('2021-01-03'),
      published: true
    },
    {
      name: 'Domain-Driven Design',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Adopt,
      description: 'Align your software design with business strategy using DDD.',
      publishedAt: null,
      published: false
    },
    {
      name: 'Event-Driven Architecture',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Adopt,
      description: 'Build systems that react to events with asynchronous messaging.',
      publishedAt: new Date('2023-01-03'),
      published: true
    },
    {
      name: 'Test-Driven Development',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Adopt,
      description: 'Write tests before coding to improve quality and design.',
      publishedAt: null,
      published: false
    },

    // --- Techniques - Assess
    {
      name: 'Serverless Architecture',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Assess,
      description: 'Evaluate using managed services to eliminate server management.',
      publishedAt: new Date('2023-02-01'),
      published: true
    },
    {
      name: 'DevOps Culture',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Assess,
      description: 'Assess organizational changes that merge development and operations.',
      publishedAt: new Date('2023-02-02'),
      published: true
    },
    {
      name: 'Infrastructure as Code',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Assess,
      description: 'Manage and provision infrastructure using code and automation tools.',
      publishedAt: new Date('2023-02-03'),
      published: true
    },
    // --- Techniques - Hold
    {
      name: 'Monolithic Architecture',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Hold,
      description: 'A single unified code base that can be hard to scale and maintain.',
      publishedAt: new Date('2023-03-01'),
      published: true
    },

    // --- Techniques - Trial
    {
      name: 'GraphQL APIs',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Trial,
      description: 'Experiment with flexible APIs that allow clients to specify data needs.',
      publishedAt: new Date('2023-04-01'),
      published: true
    },

    // --- Platforms - Adopt
    {
      name: 'AWS',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Adopt,
      description: 'Amazon Web Services, a comprehensive and widely adopted cloud platform.',
      publishedAt: new Date('2023-05-01'),
      published: true
    },

    // --- Platforms - Assess
    {
      name: 'DigitalOcean',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Assess,
      description: 'Cloud infrastructure built for simplicity and efficiency.',
      publishedAt: new Date('2023-06-01'),
      published: true
    },
    {
      name: 'Vultr',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Assess,
      description: 'High performance cloud hosting with a global footprint.',
      publishedAt: new Date('2023-06-05'),
      published: true
    },

    // --- Platforms - Hold
    {
      name: 'OpenStack',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Hold,
      description: 'An open source cloud computing platform often used in private cloud setups.',
      publishedAt: new Date('2023-07-01'),
      published: true
    },
    {
      name: 'Private Cloud Solutions',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Hold,
      description: 'On-premise cloud alternatives for sensitive workloads.',
      publishedAt: new Date('2023-07-05'),
      published: true
    },

    // --- Platforms - Trial
    {
      name: 'Cloud Foundry',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Trial,
      description: 'An open source cloud application platform for deploying and scaling apps.',
      publishedAt: new Date('2023-08-01'),
      published: true
    },
    {
      name: 'Red Hat OpenShift',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Trial,
      description: 'Enterprise Kubernetes platform from Red Hat.',
      publishedAt: new Date('2023-08-02'),
      published: true
    },
    {
      name: 'Serverless Platforms',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Trial,
      description: 'Emerging cloud solutions that abstract away server management.',
      publishedAt: new Date('2023-08-05'),
      published: true
    },

    // --- Tools - Adopt
    {
      name: 'Docker',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Adopt,
      description: 'The industry-standard containerization platform.',
      publishedAt: new Date('2023-09-01'),
      published: true
    },
    {
      name: 'Kubernetes',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Adopt,
      description: 'The leading container orchestration system.',
      publishedAt: new Date('2023-09-02'),
      published: true
    },
    {
      name: 'Maven',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Adopt,
      description: 'A build automation tool primarily for Java projects.',
      publishedAt: new Date('2023-09-05'),
      published: true
    },

    // --- Tools - Assess
    {
      name: 'Terraform',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Assess,
      description: 'Infrastructure as Code tool to provision and manage cloud resources.',
      publishedAt: new Date('2023-10-01'),
      published: true
    },
    {
      name: 'Ansible',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Assess,
      description: 'A powerful automation and configuration management tool.',
      publishedAt: null,
      published: false
    },
    {
      name: 'Prometheus',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Assess,
      description: 'An open-source monitoring and alerting toolkit.',
      publishedAt: new Date('2023-10-03'),
      published: true
    },

    // --- Tools - Hold
    {
      name: 'Puppet',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Hold,
      description: 'A legacy configuration management tool.',
      publishedAt: new Date('2023-11-01'),
      published: true
    },
    {
      name: 'Chef',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Hold,
      description: 'An older automation platform for infrastructure configuration.',
      publishedAt: new Date('2023-11-02'),
      published: true
    },

    // --- Tools - Trial
    {
      name: 'GitLab CI/CD',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Trial,
      description: 'A modern CI/CD tool integrated into GitLab.',
      publishedAt: new Date('2023-12-01'),
      published: true
    },
    {
      name: 'CircleCI',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Trial,
      description: 'A cloud-based continuous integration service.',
      publishedAt: new Date('2023-12-02'),
      published: true
    },
    {
      name: 'ArgoCD',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Trial,
      description: 'A declarative GitOps continuous delivery tool for Kubernetes.',
      publishedAt: new Date('2023-12-03'),
      published: true
    },

    // --- LanguagesAndFrameworks - Adopt
    {
      name: 'Angular',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Adopt,
      description: 'A robust framework for building web applications.',
      publishedAt: new Date('2024-01-01'),
      published: true
    },
    {
      name: 'React',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Adopt,
      description: 'A popular library for building user interfaces.',
      publishedAt: new Date('2024-01-02'),
      published: true
    },
    {
      name: 'Node.js',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Adopt,
      description: 'A JavaScript runtime built on Chrome\'s V8 engine.',
      publishedAt: new Date('2024-01-04'),
      published: true
    },

    // --- LanguagesAndFrameworks - Assess

    {
      name: 'Next.js',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Assess,
      description: 'A React framework for production that enables server-side rendering and static site generation.',
      publishedAt: new Date('2024-02-03'),
      published: true
    },

    // --- LanguagesAndFrameworks - Hold
    {
      name: 'Perl',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Hold,
      description: 'A classic programming language known for its text processing capabilities.',
      publishedAt: new Date('2024-03-05'),
      published: true
    },

    // --- LanguagesAndFrameworks - Trial
    {
      name: 'Nuxt.js',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Trial,
      description: 'A framework for creating Vue.js applications with server-side rendering.',
      publishedAt: new Date('2024-04-03'),
      published: true
    },
  ];
}
