import * as Yup from 'yup';

export const updateTutorSchema = Yup.object().shape({
  name: Yup.string().required('User Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const Countries = [
  {name: 'Syria', cities: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama']},
  {
    name: 'USA',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
  },
  {
    name: 'Canada',
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  },
  {name: 'France', cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice']},
  {
    name: 'Germany',
    cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'],
  },
  {name: 'Italy', cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence']},
  {name: 'Japan', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Fukuoka']},
  {
    name: 'Australia',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  },
  {
    name: 'Brazil',
    cities: [
      'Sao Paulo',
      'Rio de Janeiro',
      'Brasilia',
      'Salvador',
      'Fortaleza',
    ],
  },
  {
    name: 'India',
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai'],
  },
  // You can add even more cities for each country as needed
];

export const Qualifications = [
  "Bachelor's Degree in Mathematics",
  "Master's Degree in Science",
  'PhD in History',
  'Teaching Certification (General)',
  'Teaching Certification (Special Education)',
  'Professional Experience in Engineering',
  'Tutoring Experience in English',
  'Certifications in Computer Science',
  'Language Proficiency in Spanish',
  'Published Research in Economics',
  'Awards in Music Education',
  'Continuing Education Courses in Psychology',
  'Volunteer Work in Environmental Science',
  "Membership in Teachers' Association",
  'Relevant Workshops in Physics',
];
export const TeachingStyles = [
  'Interactive and Hands-On',
  'Visual and Multimedia',
  'Problem-Solving Approach',
  'Collaborative Learning',
  'Student-Centered',
  'Lecture-Based',
  'Inquiry-Based',
  'Project-Based',
  'Socratic Method',
  'Practical Examples',
  'Peer Teaching',
  'Flipped Classroom',
  'Gamification',
  'Experiential Learning',
  'Demonstration and Practice',
];

export const SubjectsTaught = [
  'Math',
  'Science',
  'English',
  'History',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Geography',
  'Economics',
  'Art',
  'Music',
  'Physical Education',
  'Foreign Languages',
  'Social Studies',
];

export const TeachingLevels = [
  'Elementary School',
  'Middle School',
  'High School',
  'Undergraduate',
  'Graduate',
  'PhD',
  'Special Education',
  'Language Learning',
  'Adult Education',
  'Online Courses',
  'Professional Development',
  'Vocational Training',
  'Homeschooling',
  'Test Preparation',
  'Life Skills Education',
];
