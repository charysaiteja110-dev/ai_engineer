import { Project, SkillCategory, JourneyMilestone, ExperienceCard } from '../types';

export const PERSONAL_INFO = {
  name: 'Sai Teja Chary',
  status: 'B.Tech 1st Semester Student',
  headline: 'Aspiring AI Engineer | Python & Web Development Beginner | Gen AI Enthusiast',
  shortIntro:
    'I’m a B.Tech student beginning my journey in Artificial Intelligence, Python, and Web Development. I enjoy building practical projects, participating in hackathons and ideathons, and continuously exploring how technology and Generative AI can solve real-world problems.',
  careerGoal:
    'To grow into a skilled AI Engineer by continuously learning, experimenting, and building meaningful technology.',
  learningHighlights: [
    'Python',
    'Web Development',
    'Generative AI',
    'AI Fundamentals',
  ],
  links: {
    github: 'https://github.com/charysaiteja110-dev',
    linkedin: 'https://www.linkedin.com/in/sai-teja-chary-6433543a1/',
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'voter-eligibility',
    title: 'Voter Eligibility Checker',
    subtitle: 'Conditional decision-making & validation logic',
    category: 'Python Project',
    technology: 'Python',
    description:
      'A Python-based project that checks whether a person meets the required age criteria for voting eligibility.',
    keyConcepts: [
      'Conditional Branching (if-else)',
      'Input Type Validation',
      'Edge-Case Handling',
    ],
    pythonCode: `# Voter Eligibility Checker
# Created by Sai Teja Chary

def check_voting_eligibility():
    print("=== National Voter Eligibility Verification ===")
    try:
        user_name = input("Enter your full name: ").strip()
        user_age = int(input("Enter your age in years: "))
        has_citizenship = input("Are you a registered citizen? (yes/no): ").strip().lower()
        
        if user_age < 0 or user_age > 120:
            print("Invalid age entered. Please verify your input.")
            return

        if user_age >= 18 and has_citizenship in ['yes', 'y']:
            print(f"Status: ELIGIBLE")
            print(f"Congratulations {user_name}, you are legally eligible to vote!")
        elif user_age < 18:
            years_left = 18 - user_age
            print(f"Status: NOT YET ELIGIBLE")
            print(f"You will be eligible to register to vote in {years_left} year(s).")
        else:
            print("Status: CITIZENSHIP REQUIREMENT UNMET")
            print("Valid citizenship registration is required for voter eligibility.")

    except ValueError:
        print("Error: Age must be entered as a whole integer.")

if __name__ == "__main__":
    check_voting_eligibility()`,
    demoType: 'voter',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    subtitle: 'Arithmetic operations & interaction loops',
    category: 'Beginner Project',
    technology: 'Python / Web Technologies',
    description:
      'A beginner-friendly calculator project created to practice programming logic, arithmetic operations, and user interaction.',
    keyConcepts: [
      'Arithmetic Operators',
      'Error Handling (ZeroDivision)',
      'Interactive User Flow',
    ],
    pythonCode: `# Interactive Terminal Calculator
# Practice project for basic arithmetic and defensive programming

def calculate(num1, operator, num2):
    if operator == '+':
        return num1 + num2
    elif operator == '-':
        return num1 - num2
    elif operator == '*':
        return num1 * num2
    elif operator == '/':
        if num2 == 0:
            raise ZeroDivisionError("Cannot divide by zero.")
        return num1 / num2
    elif operator == '%':
        return num1 % num2
    elif operator == '^' or operator == '**':
        return num1 ** num2
    else:
        raise ValueError(f"Unsupported operator: {operator}")

def run_calculator():
    print("--- Python Arithmetic Logic Engine ---")
    try:
        n1 = float(input("Enter first number: "))
        op = input("Enter operator (+, -, *, /, %, ^): ").strip()
        n2 = float(input("Enter second number: "))
        
        result = calculate(n1, op, n2)
        print(f"Result: {n1} {op} {n2} = {result}")
    except ZeroDivisionError as zde:
        print(f"Calculation Error: {zde}")
    except ValueError as ve:
        print(f"Input Error: {ve}")

if __name__ == "__main__":
    run_calculator()`,
    demoType: 'calculator',
  },
  {
    id: 'atm-management',
    title: 'ATM Management System',
    subtitle: 'Stateful banking flow & transaction verification',
    category: 'Python Project',
    technology: 'Python',
    description:
      'A Python-based ATM management project designed to simulate basic banking operations and strengthen programming fundamentals.',
    keyConcepts: [
      'Account State Management',
      'PIN Security Verification',
      'Transaction Logging',
    ],
    pythonCode: `# ATM Management System Simulation
# Python fundamentals: Loops, conditionals, balance tracking

class SimpleATM:
    def __init__(self, initial_pin="1234", initial_balance=5000.0):
        self.pin = initial_pin
        self.balance = initial_balance
        self.transactions = [f"Initial deposit: \${initial_balance:.2f}"]

    def authenticate(self, entered_pin):
        return self.pin == entered_pin

    def check_balance(self):
        return self.balance

    def deposit(self, amount):
        if amount <= 0:
            return False, "Deposit amount must be positive."
        self.balance += amount
        self.transactions.append(f"Deposited: \${amount:.2f}")
        return True, f"Successfully deposited \${amount:.2f}. New balance: \${self.balance:.2f}"

    def withdraw(self, amount):
        if amount <= 0:
            return False, "Withdrawal amount must be greater than zero."
        if amount > self.balance:
            return False, "Insufficient funds in your account."
        self.balance -= amount
        self.transactions.append(f"Withdrawn: \${amount:.2f}")
        return True, f"Successfully withdrawn \${amount:.2f}. Remaining balance: \${self.balance:.2f}"

# Initialized for interactive experimentation`,
    demoType: 'atm',
  },
  {
    id: 'grade-calculator',
    title: 'Student Grade Calculator',
    subtitle: 'Multi-subject grading & performance scoring',
    category: 'Python Project',
    technology: 'Python',
    description:
      'A simple application that calculates student grades based on entered marks and helps practice conditional logic and calculations.',
    keyConcepts: [
      'List Aggregation & Averages',
      'Conditional Grade Ranges',
      'Performance Reporting',
    ],
    pythonCode: `# Student Grade Calculator
# Computes percentage, GPA tier, and academic summary

def calculate_grade(marks_list):
    total = sum(marks_list)
    max_total = len(marks_list) * 100
    percentage = (total / max_total) * 100
    
    if percentage >= 90:
        grade, remark = 'A+', 'Outstanding Performance'
    elif percentage >= 80:
        grade, remark = 'A', 'Excellent Work'
    elif percentage >= 70:
        grade, remark = 'B', 'Good Understanding'
    elif percentage >= 60:
        grade, remark = 'C', 'Satisfactory Progress'
    elif percentage >= 50:
        grade, remark = 'D', 'Pass — Needs Practice'
    else:
        grade, remark = 'F', 'Needs Improvement'
        
    return {
        'total': total,
        'percentage': round(percentage, 2),
        'grade': grade,
        'remark': remark
    }

# Ready for testing across diverse subject inputs`,
    demoType: 'grade',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    subtitle: 'Core languages I am practicing daily to build logical reasoning and computational thinking.',
    skills: [
      {
        name: 'Python',
        level: 'Active Learning',
        description: 'Variables, loops, functions, lists, data structures, and algorithmic logic.',
      },
      {
        name: 'HTML',
        level: 'Foundations',
        description: 'Semantic markup, accessibility standards, document hierarchy, and clean structure.',
      },
      {
        name: 'CSS',
        level: 'Foundations',
        description: 'Box model, Flexbox, responsive layouts, color systems, and modern styling.',
      },
      {
        name: 'JavaScript',
        level: 'Beginner',
        description: 'Basic DOM interaction, event listeners, variables, and procedural logic.',
      },
    ],
  },
  {
    title: 'AI & Emerging Technology',
    subtitle: 'Foundational concepts and practical workflows driving my pursuit of AI Engineering.',
    skills: [
      {
        name: 'Generative AI',
        level: 'Exploring & Experimenting',
        description: 'Large language model concepts, generative pipelines, and modern developer tooling.',
      },
      {
        name: 'AI Fundamentals',
        level: 'Foundations',
        description: 'Understanding machine learning concepts, classification, training intuition, and mathematical baselines.',
      },
      {
        name: 'Prompt Engineering',
        level: 'Practicing',
        description: 'Crafting structured context, role prompt design, zero-shot/few-shot techniques, and deterministic outputs.',
      },
    ],
  },
  {
    title: 'Development',
    subtitle: 'Essential developer tools and web principles for shipping clean, maintainable projects.',
    skills: [
      {
        name: 'Web Development',
        level: 'Building Small Projects',
        description: 'Creating responsive web layouts, component architecture, and clean user interfaces.',
      },
      {
        name: 'Git & GitHub',
        level: 'Active Version Control',
        description: 'Repository management, branching, commit discipline, and open-source collaboration.',
      },
    ],
  },
];

export const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    title: 'Hackathons',
    category: 'Rapid Prototyping',
    description:
      'Participating in fast-paced problem sprints where participants brainstorm, architect, and prototype working technical solutions under real time limits.',
    highlights: [
      'Transforming problem statements into early workable code',
      'Working under time constraints to deliver functional prototypes',
      'Learning to debug and adapt quickly in dynamic environments',
    ],
  },
  {
    title: 'Ideathons',
    category: 'Innovation & Pitching',
    description:
      'Engaging in structured ideation challenges to evaluate real-world problems, formulate tech-driven concepts, and structure compelling technical presentations.',
    highlights: [
      'Problem framing and feasibility analysis',
      'Exploring how AI and software solve community challenges',
      'Communicating technical ideas clearly and concisely',
    ],
  },
  {
    title: 'Problem Solving',
    category: 'Algorithmic Thinking',
    description:
      'Practicing computational logic through coding exercises, algorithmic puzzles, and step-by-step project debugging.',
    highlights: [
      'Breaking down larger objectives into modular functions',
      'Tracing execution logic and handling edge cases',
      'Writing clean, readable code with descriptive naming',
    ],
  },
  {
    title: 'Team Collaboration',
    category: 'Peer Learning',
    description:
      'Working alongside fellow engineering students, exchanging technical knowledge, reviewing code, and coordinating project roles effectively.',
    highlights: [
      'Dividing responsibilities for balanced execution',
      'Constructive peer feedback and code reviews',
      'Aligning collective efforts toward a unified demo',
    ],
  },
  {
    title: 'Project Building',
    category: 'Hands-on Learning',
    description:
      'Translating academic theory into working software through personal projects, reinforcing syntax and engineering discipline.',
    highlights: [
      'Building small but functional software tools',
      'Iterating based on actual user testing',
      'Documenting code and architecture clearly',
    ],
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    step: '01',
    title: 'Started exploring programming',
    status: 'completed',
    description:
      'Discovered the world of software development, learned basic computational principles, and set up a proper local developer environment.',
  },
  {
    step: '02',
    title: 'Began learning Python',
    status: 'completed',
    description:
      'Dived into Python syntax, data types, conditional branching, loops, and modular functions by building small CLI utilities.',
  },
  {
    step: '03',
    title: 'Started exploring Web Development',
    status: 'completed',
    description:
      'Began learning semantic HTML, CSS layout systems (Flexbox, Grid), and foundational JavaScript to build clean interfaces on the web.',
  },
  {
    step: '04',
    title: 'Exploring Generative AI',
    status: 'in-progress',
    description:
      'Actively experimenting with modern LLM workflows, understanding token mechanics, prompt techniques, and AI-assisted engineering tools.',
  },
  {
    step: '05',
    title: 'Participating in Hackathons & Ideathons',
    status: 'in-progress',
    description:
      'Applying foundational skills in team hackathons, building prototype solutions, and gaining real-time problem-solving experience.',
  },
  {
    step: '06',
    title: 'Working toward becoming an AI Engineer',
    status: 'future',
    description:
      'Steadily advancing through computer science fundamentals, machine learning mathematics, deep learning architectures, and production engineering.',
  },
];
