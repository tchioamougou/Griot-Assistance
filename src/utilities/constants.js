export const NO_PASSWORD_MATCH = 'les mot de pass ne sont corresponde pas';
export const INTERVIEW_ERROR = "Je suis dans l'impossibilité de répondre à votre requête pour le moment. Veuillez vérifier votre connexion internet et vous assurer que vous êtes dans une zone géographique autorisée à utiliser Griot Assistance.";




export const INTERVIEW_ENTER = (title, description) => {
    return `
"Je souhaite me préparer à un entretien d'embauche pour le poste de "${title}",
${description ? ('dont la description estl asuivante:' + description) : ''}


Pour m'aider à m'entraîner, pourrais-tu simuler un entretien avec moi ?

Voici comment je souhaiterais que cela se déroule :

Présentation de l'intervieweur : Tu te présenteras en tant que Griot, recruteur chez Griot Assistance.
Démarrage de l'entretien : Tu me demanderas de commencer en disant "start".
Questions et réponses : Tu me poseras un maximum de 20 questions liées au poste et à mon profil. Je te répondrai du mieux que je peux.
Évaluation : À la fin de l'entretien simulé, tu me fourniras une évaluation globale de mes réponses et des pistes d'amélioration.
Pourrais-tu commencer par te présenter et me demander de démarrer l'entretien ?"
`;
}