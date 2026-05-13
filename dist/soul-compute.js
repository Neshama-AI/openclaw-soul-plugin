import axios from 'axios';
export interface OCEANConfig {
    openness?: number;
    conscientiousness?: number;
    extraversion?: number;
    agreeableness?: number;
    neuroticism?: number;
}
export interface SoulComputeParams {
    message: string;
    ocean?: OCEANConfig;
    traits?: string[];
    session_id?: string;
    user_id?: string;
    api_key?: string;
}
export interface SoulComputeResponse {
    emotion_state: {
        current: string;
        intensity: number;
        valence: number;
        arousal: number;
        history: Array<{ emotion: string; valence: number; arousal: number }>;
    };
    context_for_llm: string;
    suggested_temperature: number;
    suggested_tone: string;
    behavior_tendency: {
        action: string;
        confidence: number;
    };
}
const DEFAULT_API_KEY = 'nsh_public_beta_2026';
const API_ENDPOINT = 'https://api.neshama.pw/v1/soul/compute';
const DEFAULT_OCEAN = {
    openness: 0.7,
    conscientiousness: 0.6,
    extraversion: 0.8,
    agreeableness: 0.7,
    neuroticism: 0.3,
};
export async function soulCompute(params) {
    const apiKey = params.api_key || DEFAULT_API_KEY;
    const ocean = Object.assign(Object.assign({}, DEFAULT_OCEAN), params.ocean);
    const requestBody = {
        personality_config: {
            ocean: {
                openness: ocean.openness ?? 0.7,
                conscientiousness: ocean.conscientiousness ?? 0.6,
                extraversion: ocean.extraversion ?? 0.8,
                agreeableness: ocean.agreeableness ?? 0.7,
                neuroticism: ocean.neuroticism ?? 0.3,
            },
            traits: params.traits || [],
            behavior_rules: [],
        },
        message: params.message,
        context: {
            session_id: params.session_id || 'default',
            user_id: params.user_id || 'anonymous',
        },
    };
    try {
        const response = await axios.post(API_ENDPOINT, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey,
            },
            timeout: 10000,
        });
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error('API Key 无效或已过期');
            }
            if (error.response?.status === 429) {
                throw new Error('API 请求过于频繁，请稍后再试');
            }
            throw new Error(`API 调用失败: ${error.message}`);
        }
        throw error;
    }
}
export function generatePersonalityPrompt(response) {
    return `【人格提示词】
${response.context_for_llm}

【建议语气】
${response.suggested_tone}

【建议温度】
${response.suggested_temperature}`;
}
