import { model } from "."

export const hasQuestion = async (question) => {
    console.log('init')
    const result = (await model.generateContent(question));
    console.log(result);
    const res = result.response;
    console.log(res)
    const text = (await res.text());
    return text;
}