export function convertirTexteEnHTML(text) {
        return text.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
}