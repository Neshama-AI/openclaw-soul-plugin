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
export declare const soulCompute: (params: SoulComputeParams) => Promise<SoulComputeResponse>;
export declare const generatePersonalityPrompt: (response: SoulComputeResponse) => string;