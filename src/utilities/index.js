export function convertirTexteEnHTML(texte) {
    // Étapes pour convertir le texte en HTML

    // 1. Diviser le texte en paragraphes et en lignes
    const paragraphes = texte.split('\n\n');
    let html = '';

    // 2. Parcourir chaque paragraphe
    for (const paragraphe of paragraphes) {
        const lignes = paragraphe.split('\n');
        html += '<p>';

        // 3. Parcourir chaque ligne et appliquer le formatage approprié
        for (const ligne of lignes) {
            // Vérifier si la ligne commence par une étoile (*) pour la convertir en titre
            if (ligne.startsWith('*')) {
                const niveauTitre = ligne.slice(1).trim().length;
                const baliseTitre = `h${niveauTitre}`;
                html += `<${baliseTitre}>${ligne.slice(niveauTitre + 1).trim()}</${baliseTitre}>\n`;
            } else {
                // Sinon, convertir la ligne en paragraphe
                html += `<span>${ligne}</span>\n`;
            }
        }

        html += '</p>';
    }
    return html
}