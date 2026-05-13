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
export declare const openclaw: {
    compat: {
        pluginApi: string;
    };
    build: {
        openclawVersion: string;
    };
};
export interface SoulToolParams {
    message: string;
    ocean?: {
        openness?: number;
        conscientiousness?: number;
        extraversion?: number;
        agreeableness?: number;
        neuroticism?: number;
    };
    traits?: string[];
    session_id?: string;
    user_id?: string;
}
export declare function registerSoulTool(api: {
    registerTool: (name: string, config: {
        description: string;
        parameters: Record<string, unknown>;
        handler: (params: SoulToolParams) => Promise<{
            context_for_llm: string;
            emotion_state: SoulComputeResponse['emotion_state'];
            suggested_temperature: number;
            suggested_tone: string;
        }>;
    }) => void;
}): void;
export { soulCompute, SoulComputeResponse } from './soul-compute';
export default registerSoulTool;
