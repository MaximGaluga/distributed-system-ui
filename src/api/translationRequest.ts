import axios from 'axios';

export async function translationRequest(text: string): Promise<string> {
    const res = await axios.post('https://api.nlpcloud.io/v1/nllb-200-3-3b/translation', {
            "text": text,
            "source":"eng_Latn",
            "target":"rus_Cyrl"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + "7e95d17aef3085552bdf78d9c8b8db9e7b529653"
            }
        }
    );

    return res.data.translation_text;
}