export function convertirTexteEnHTML(text) {

    // Replace ***text*** with <p>text</p>
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<p>$1</p>');
    // Replace **text** with <b>text</b>
    text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Replace ```text``` with <pre><code>text</code></pre>
    text = text.replace(/```(.*?)```/g, '<p><pre><code>$1</code></pre></p>');
    text = text.replaceAll('* ', '<br/>');
    text = text.replaceAll('###', '<p></p>');

    return text;
}


export function convertText(text) {
    // Replace ***text*** with <p>text</p>
    //text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<p>$1</p>');
    // Replace **text** with <b>text</b>
    text = text.replaceAll('**Note**', '<br/>**Note**');
    text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Replace ```text``` with <pre><code>text</code></pre>
    //text = text.replace(/```(.*?)```/g, '<p><pre><code>$1</code></pre></p>');
    //text = text.replaceAll('* ', '<br/>');
    text = text.replaceAll('##', '<p></p>');

    return text;
}