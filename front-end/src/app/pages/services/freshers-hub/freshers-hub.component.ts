import { Component, signal } from '@angular/core';

interface TutorialLink {
  name: string;
  url: string;
  description: string;
}

interface InterviewQA {
  question: string;
  answer: string;
}

interface CompanyInterviewSet {
  company: string;
  questions: InterviewQA[];
}

@Component({
  selector: 'app-freshers-hub',
  standalone: true,
  templateUrl: './freshers-hub.component.html'
})
export class FreshersHubComponent {
  activeTab = signal<'tutorials' | 'interview-prep'>('tutorials');

  tutorials: TutorialLink[] = [
    {
      name: 'Java Learning Tutorial',
      url: 'https://dev.java/learn/',
      description: "Oracle's official, actively maintained guide to learning Java from the basics onward."
    },
    {
      name: 'Python Tutorial',
      url: 'https://docs.python.org/3/tutorial/',
      description: 'The official Python documentation tutorial — the most reliable starting point for the language.'
    }
  ];

  // Framed as practice/preparation material, not verified verbatim
  // questions actually asked — these are commonly seen fresher-level
  // technical and HR questions for these companies.
  companies: CompanyInterviewSet[] = [
    {
      company: 'TCS',
      questions: [
        {
          question: 'Tell me about yourself.',
          answer: 'Structure it in three parts: your education background, a project or skill you\'re proud of, and what you\'re looking for in this role. Keep it under a minute.'
        },
        {
          question: 'What is the difference between an array and a linked list?',
          answer: 'An array stores elements in contiguous memory with fixed size and O(1) index access. A linked list stores elements as nodes with pointers, allowing dynamic size but only O(n) access by position.'
        },
        {
          question: 'Explain OOPs concepts with examples.',
          answer: 'The four pillars are Encapsulation (bundling data and methods, e.g. a class with private fields and public getters), Abstraction (hiding implementation details behind an interface), Inheritance (a subclass reusing a parent class\'s behavior), and Polymorphism (the same method behaving differently depending on the object, e.g. method overriding).'
        }
      ]
    },
    {
      company: 'Infosys',
      questions: [
        {
          question: 'What is normalization in DBMS? Explain with an example.',
          answer: 'Normalization organizes data to reduce redundancy — e.g. splitting a table with repeating "customer name" per order into a separate Customers table linked by customer ID, so the name is stored once.'
        },
        {
          question: 'Write an approach to check if a string is a palindrome.',
          answer: 'Compare the string to its reverse (e.g. using two pointers from each end moving inward, checking characters match at each step) — if they\'re equal, it\'s a palindrome.'
        },
        {
          question: 'What are your strengths and weaknesses?',
          answer: 'Pick a genuine strength relevant to the role with a brief example, and a real weakness paired with what you\'re actively doing to improve it — avoid clichés like "I\'m a perfectionist."'
        }
      ]
    },
    {
      company: 'Wipro',
      questions: [
        {
          question: 'Explain the SDLC (Software Development Life Cycle).',
          answer: 'The typical phases are: Requirement gathering, Design, Implementation (coding), Testing, Deployment, and Maintenance — often followed iteratively in Agile rather than strictly in sequence.'
        },
        {
          question: 'What is the difference between a process and a thread?',
          answer: 'A process is an independent program with its own memory space; a thread is a lightweight unit of execution within a process that shares that process\'s memory with other threads.'
        },
        {
          question: 'Why do you want to join Wipro?',
          answer: 'Mention something specific — a project area, technology focus, or value of theirs that genuinely aligns with your goals — rather than a generic answer that could apply to any company.'
        }
      ]
    },
    {
      company: 'Accenture',
      questions: [
        {
          question: 'What is polymorphism? Give a real-world example.',
          answer: 'Polymorphism lets one interface represent different underlying behaviors — e.g. a "Shape" class with a draw() method, where Circle and Square each implement draw() differently, but calling code just calls shape.draw() without knowing which.'
        },
        {
          question: 'How would you handle a conflict with a team member?',
          answer: 'Describe listening to understand their perspective first, focusing the conversation on the shared goal rather than being "right," and escalating to a manager only if a direct conversation doesn\'t resolve it.'
        },
        {
          question: 'Explain the difference between SQL and NoSQL databases.',
          answer: 'SQL databases are relational, with fixed schemas and tables (e.g. PostgreSQL, MySQL) — good for structured data with relationships. NoSQL databases (e.g. MongoDB) are schema-flexible, often storing documents/key-values — good for rapidly changing or unstructured data.'
        }
      ]
    },
    {
      company: 'Cognizant',
      questions: [
        {
          question: 'What is exception handling in Java?',
          answer: 'A mechanism (try/catch/finally) to handle runtime errors gracefully instead of crashing the program — e.g. catching a NullPointerException and showing a user-friendly message instead.'
        },
        {
          question: 'Explain the difference between a stack and a queue.',
          answer: 'A stack is LIFO (Last In, First Out) — like a stack of plates. A queue is FIFO (First In, First Out) — like a line of people waiting.'
        },
        {
          question: 'Where do you see yourself in 5 years?',
          answer: 'Show realistic ambition tied to growing within the company — e.g. taking on more technical ownership or moving toward a specialization — rather than an unrelated or overly vague goal.'
        }
      ]
    }
  ];

  selectedCompany = signal<string>(this.companies[0].company);

  selectedCompanyQuestions() {
    return this.companies.find((c) => c.company === this.selectedCompany())?.questions ?? [];
  }
}
