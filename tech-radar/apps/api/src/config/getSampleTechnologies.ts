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
      publishedAt: null,
      published: false
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
      name: 'Reactive Programming',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Adopt,
      description: 'Implement systems that react to change with asynchronous data streams.',
      publishedAt: new Date('2023-01-04'),
      published: true
    },
    {
      name: 'Test-Driven Development',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Adopt,
      description: 'Write tests before coding to improve quality and design.',
      publishedAt: new Date('2023-01-05'),
      published: true
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
    {
      name: 'Chaos Engineering',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Assess,
      description: 'Test the resilience of systems by introducing controlled failure.',
      publishedAt: new Date('2023-02-04'),
      published: true
    },
    {
      name: 'Shift-Left Testing',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Assess,
      description: 'Integrate testing early in the software development lifecycle.',
      publishedAt: new Date('2023-02-05'),
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
    {
      name: 'Waterfall Model',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Hold,
      description: 'A linear sequential software development process that lacks flexibility.',
      publishedAt: new Date('2023-03-02'),
      published: true
    },
    {
      name: 'Legacy Integration Patterns',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Hold,
      description: 'Outdated integration methods that hinder modernization efforts.',
      publishedAt: new Date('2023-03-03'),
      published: true
    },
    {
      name: 'Big Ball of Mud',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Hold,
      description: 'An unstructured, haphazardly assembled software architecture.',
      publishedAt: new Date('2023-03-04'),
      published: true
    },
    {
      name: 'Manual Code Reviews',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Hold,
      description: 'Time-consuming review processes that are prone to human error.',
      publishedAt: null,
      published: false
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
    {
      name: 'AI-Driven Development',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Trial,
      description: 'Explore using artificial intelligence to assist in code generation and testing.',
      publishedAt: new Date('2023-04-02'),
      published: true
    },
    {
      name: 'Blockchain for Business',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Trial,
      description: 'Evaluate blockchain technology for secure, decentralized business processes.',
      publishedAt: null,
      published: false
    },
    {
      name: 'Low-Code Development',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Trial,
      description: 'Experiment with platforms that allow rapid application development with minimal coding.',
      publishedAt: new Date('2023-04-04'),
      published: true
    },
    {
      name: 'Edge Computing',
      category: TechnologyCategory.Techniques,
      maturity: TechnologyMaturity.Trial,
      description: 'Trial processing data closer to its source to reduce latency.',
      publishedAt: new Date('2023-04-05'),
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
    {
      name: 'Azure',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Adopt,
      description: 'Microsoft Azure offers a robust set of cloud services and solutions.',
      publishedAt: new Date('2023-05-02'),
      published: true
    },
    {
      name: 'Google Cloud Platform',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Adopt,
      description: 'Google Cloud provides scalable and reliable cloud computing services.',
      publishedAt: null,
      published: false
    },
    {
      name: 'IBM Cloud',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Adopt,
      description: 'IBM Cloud delivers enterprise-grade cloud solutions.',
      publishedAt: new Date('2023-05-04'),
      published: true
    },
    {
      name: 'Oracle Cloud',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Adopt,
      description: 'Oracle Cloud offers a complete suite of cloud applications and services.',
      publishedAt: new Date('2023-05-05'),
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
      name: 'Heroku',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Assess,
      description: 'A platform as a service (PaaS) that enables quick app deployment.',
      publishedAt: new Date('2023-06-02'),
      published: true
    },
    {
      name: 'Alibaba Cloud',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Assess,
      description: 'Alibaba Cloud provides a broad suite of global cloud computing services.',
      publishedAt: new Date('2023-06-03'),
      published: true
    },
    {
      name: 'Linode',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Assess,
      description: 'Offering simplified cloud infrastructure with a focus on developers.',
      publishedAt: null,
      published: false
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
      name: 'VMware vSphere',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Hold,
      description: 'A virtualization platform for building and managing virtual infrastructures.',
      publishedAt: new Date('2023-07-02'),
      published: true
    },
    {
      name: 'Citrix Cloud',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Hold,
      description: 'Cloud services from Citrix that focus on virtual applications and desktops.',
      publishedAt: new Date('2023-07-03'),
      published: true
    },
    {
      name: 'Rackspace Managed Cloud',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Hold,
      description: 'Managed cloud services with a focus on enterprise solutions.',
      publishedAt: new Date('2023-07-04'),
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
      name: 'Google Anthos',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Trial,
      description: 'Manage hybrid and multi-cloud environments with Anthos.',
      publishedAt: null,
      published: false
    },
    {
      name: 'AWS Outposts',
      category: TechnologyCategory.Platforms,
      maturity: TechnologyMaturity.Trial,
      description: 'Extend AWS infrastructure and services to on-premise locations.',
      publishedAt: new Date('2023-08-04'),
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
      name: 'Git',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Adopt,
      description: 'The most widely used distributed version control system.',
      publishedAt: new Date('2023-09-03'),
      published: true
    },
    {
      name: 'Jenkins',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Adopt,
      description: 'An automation server for continuous integration and delivery.',
      publishedAt: new Date('2023-09-04'),
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
    {
      name: 'Grafana',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Assess,
      description: 'Visualization and analytics software for monitoring metrics.',
      publishedAt: new Date('2023-10-04'),
      published: true
    },
    {
      name: 'ELK Stack',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Assess,
      description: 'A combination of Elasticsearch, Logstash, and Kibana for log analysis.',
      publishedAt: new Date('2023-10-05'),
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
    {
      name: 'Ant',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Hold,
      description: 'A Java-based build tool that has been superseded by more modern solutions.',
      publishedAt: new Date('2023-11-04'),
      published: true
    },
    {
      name: 'Nagios',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Hold,
      description: 'A monitoring system that has given way to newer tools.',
      publishedAt: new Date('2023-11-05'),
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
    {
      name: 'Helm',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Trial,
      description: 'A package manager for Kubernetes applications.',
      publishedAt: new Date('2023-12-04'),
      published: true
    },
    {
      name: 'SonarQube',
      category: TechnologyCategory.Tools,
      maturity: TechnologyMaturity.Trial,
      description: 'A tool for continuous code quality inspection and security analysis.',
      publishedAt: new Date('2023-12-05'),
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
      name: 'Vue.js',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Adopt,
      description: 'A progressive JavaScript framework for building modern interfaces.',
      publishedAt: new Date('2024-01-03'),
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
    {
      name: 'Spring Boot',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Adopt,
      description: 'Simplify Java development with convention-over-configuration.',
      publishedAt: new Date('2024-01-05'),
      published: true
    },

    // --- LanguagesAndFrameworks - Assess
    {
      name: 'Svelte',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Assess,
      description: 'A compiler that generates highly efficient JavaScript code.',
      publishedAt: new Date('2024-02-01'),
      published: true
    },
    {
      name: 'Flutter',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Assess,
      description: 'A UI toolkit for building natively compiled applications for mobile, web, and desktop.',
      publishedAt: new Date('2024-02-02'),
      published: true
    },
    {
      name: 'Next.js',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Assess,
      description: 'A React framework for production that enables server-side rendering and static site generation.',
      publishedAt: new Date('2024-02-03'),
      published: true
    },
    {
      name: 'Quarkus',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Assess,
      description: 'A Kubernetes-native Java framework tailored for GraalVM and OpenJDK HotSpot.',
      publishedAt: new Date('2024-02-05'),
      published: true
    },

    // --- LanguagesAndFrameworks - Hold
    {
      name: 'Backbone.js',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Hold,
      description: 'An early MVC framework for structuring JavaScript applications.',
      publishedAt: new Date('2024-03-01'),
      published: true
    },
    {
      name: 'jQuery',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Hold,
      description: 'A fast, small, and feature-rich JavaScript library that has fallen out of favor.',
      publishedAt: new Date('2024-03-02'),
      published: true
    },
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
      name: 'SvelteKit',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Trial,
      description: 'The official framework for building Svelte applications.',
      publishedAt: new Date('2024-04-01'),
      published: true
    },
    {
      name: 'Remix',
      category: TechnologyCategory.LanguagesAndFrameworks,
      maturity: TechnologyMaturity.Trial,
      description: 'A full stack web framework for building dynamic and performant web applications.',
      publishedAt: new Date('2024-04-02'),
      published: true
    },
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
