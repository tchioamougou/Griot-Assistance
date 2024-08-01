export const NO_PASSWORD_MATCH = 'les mot de pass ne sont corresponde pas';
export const INTERVIEW_ERROR = "assistance_error";




export const INTERVIEW_ENTER = (title, description) => {
    return `
"Je souhaite me préparer à un entretien d'embauche pour le poste de "${title}",
${description ? ('dont la description est la suivante:' + description) : ''}


Pour m'aider à m'entraîner, pourrais-tu simuler un entretien avec moi ?

Voici comment je souhaiterais que cela se déroule :

Présentation de l'intervieweur : Tu te présenteras en tant que Griot, recruteur chez Griot Assistance.
Démarrage de l'entretien : Tu me demanderas de commencer en disant "start".
Questions et réponses : Tu me poseras un maximum de 20 questions liées au poste et à mon profil. Je te répondrai du mieux que je peux.
Évaluation : À la fin de l'entretien simulé, tu me fourniras une évaluation globale de mes réponses et des pistes d'amélioration.
Pourrais-tu commencer par te présenter et me demander de démarrer l'entretien ?"
`;
}
export const INTERVIEW_ENTER_ENG = (title, description) => {
    return `I would like to prepare for a job interview for the position of ${title},
${description ? ('with the following description:' + description) : ''}


To help me practise, could you simulate an interview with me ?

    Here's how I'd like it to go:

Introducing the interviewer: You'll introduce yourself as Griot, recruiter at Griot Assistance.
Starting the interview: You'll ask me to start by saying "start".
Questions and answers: You'll ask me a maximum of 20 questions related to the job and my profile. I'll answer as best I can.
    Evaluation: At the end of the mock interview, you will provide me with an overall evaluation of my answers and suggestions for improvement.
Could you start by introducing yourself and asking me to start the interview ? "
`;
}

export const LEARN_ENTER_FR = (tile, description) => {
    return `
    Je souhaite créer un programme de cours sur le thème ${tile},
    ${description ? ('dont la description est la suivante:' + description) : ''}
    
    Veuillez me proposer une structure de cours incluant des modules et des leçons. Chaque module et leçon doit avoir un titre, une description et un objectif.
    chaque modules doit avoir aumoins deux lessons
    Le résultat attendu est un format JSON suivant cette structure :
    {
  "title": "Titre du cours",
  "description": "Description du cours",
  "level": "Niveau du cours",
  "time": "Durée du cours",
  "modules": [
    {
      "title": "Titre du module",
      "description": "Description du module",
      "goal": "Objectif du module",
      "lessons": [
        {
          "title": "Titre de la leçon",
          "description": "Description de la leçon",
          "goal": "Objectif de la leçon"
        },
      ]
    },
  ]
}
    `;
}

export const LEARN_ENTER_ENG = (tile, description) => {
    return `
    I would like to create a course programme on the theme ${tile},
    ${description ? ('whose description is as follows:' + description) : ''}
    Please propose a course structure including modules and lessons. Each module and lesson must have a title, a description and an objective.
    Each modules must have at lease 2 modules
    The expected result is a JSON format following this structure:
    {
  "title": "Course title",
  "description": "Course description",
  "level": "Level of the course",
  "time": "Course duration",
  "modules": [
    {
      "title": "Module title",
      "description": "Module description",
      "goal": "Objective of the module",
      "lessons": [
        {
          "title": "Lesson title",
          "description": "Lesson description",
          "goal": "Objective of the lesson".
        },
      ]
    },
  ]
}
    `;
}


export const COURSE_ENTER_FR = (tile) => {
    return `
        Générer une structure de cours au format JSON.
        Le cours doit s'intituler ${tile}.
        Chaque module doit contenir une liste de leçons.
        Pour chaque module et leçon, inclure un nom, une description et des objectifs.

        Format JSON attendu :

        {
        "title": "Titre du cours",
  "description": "Description du cours",
  "level": "Niveau du cours",
  "time": "Durée du cours",
  modules: [
            {
                "name": "Module 1",
                "description": "Description du module",
                "objectives": ["Objectif 1", "Objectif 2", ...],
                "lessons": [
                {
                    "name": "Leçon 1",
                    "description": "Description de la leçon",
                    "objectives": ["Objectif 1", "Objectif 2", ...]
                },
                // ...
                ]
            },
  // ...
]
        }
       
    `}


export const COURSE_ENTER_EN = (tile) => {
    return `
        Generate a course structure in JSON format.
        The course must be called ${tile}.
        Each module must contain a list of lessons.
        For each module and lesson, include a name, description and objectives.

        Expected JSON format:
        {
       "title": "Course title",
  "description": "Course description",
  "time": "Course duration",
         "modules":[
            {
                "name": "Module 1",
                "description": "Module description",
                "objectives": ["Objective 1", "Objective 2", ...],
                "lessons": [
                {
                    "name": "Lesson 1",
                    "description": "Lesson description",
                    "objectives": ["Objective 1", "Objective 2", ...]
                },
                // ...
                ]
            },
  // ...
]
        }
    `}