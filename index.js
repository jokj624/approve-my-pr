import axios from "axios";

const WEB_HOOK_URL = process.env.WEB_HOOK_URL;
const GITHUB_API_URI = 'https://api.github.com';
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

const members = [process.env.MEMBER1, process.env.MEMBER2, process.env.MEMBER3];

const getPRList = async () => {
    const prUrl = `${GITHUB_API_URI}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls?state=open`;

    try {
        const response = await axios.get(prUrl);

        return response.data;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        }
    }
}

export const handler = async (event) => {
    try {
        const prList = await getPRList();

        let mentionMessage = ``;

        members.forEach(member => {
            mentionMessage += `<@${member}> `;
        });

        let blocks = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "PR을 확인할 시간입니다.",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": mentionMessage,
                }
            },
        ];

        prList.forEach(obj => {
            const section = {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `:ghost: <${obj.html_url}|check this pr> #${obj.number} ${obj.title}`
                }
            };

            const divider = { type: "divider" };
            
            blocks.push(section);
            blocks.push(divider);
        });

        blocks.push({
            "type": "image",
            "image_url": "https://cdn.jjalbot.com/2020/11/-QO1JWITkd/1nDFWXBzF.jpeg",
            "alt_text": "inspiration"
        });

        await axios.post(WEB_HOOK_URL, { blocks });

        return {
            statusCode: 200,
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        }
    }
    
};