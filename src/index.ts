import { soulCompute, SoulComputeResponse } from './soul-compute';

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

export function registerSoulTool(api: {
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
}): void {
  api.registerTool('soul_compute', {
    description: '调用 Neshama Soul API 获取人格提示词和情绪状态。基于 OCEAN 人格模型，为 AI Agent 生成符合人格设定的回复建议。',
    parameters: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: '用户的消息或当前对话内容',
        },
        ocean: {
          type: 'object',
          description: 'OCEAN 人格配置（可选，使用默认值）',
          properties: {
            openness: { type: 'number', description: '开放性：好奇心、创造力 (0-1)' },
            conscientiousness: { type: 'number', description: '尽责性：条理性、自律性 (0-1)' },
            extraversion: { type: 'number', description: '外向性：社交能力、活力 (0-1)' },
            agreeableness: { type: 'number', description: '宜人性：合作性、同理心 (0-1)' },
            neuroticism: { type: 'number', description: '神经质：情绪稳定性 (0-1)' },
          },
        },
        traits: {
          type: 'array',
          items: { type: 'string' },
          description: '人格特征列表（可选）',
        },
        session_id: {
          type: 'string',
          description: '会话 ID（可选，用于情绪状态追踪）',
        },
        user_id: {
          type: 'string',
          description: '用户 ID（可选）',
        },
      },
      required: ['message'],
    },
    handler: async (params: SoulToolParams) => {
      try {
        const result = await soulCompute({
          message: params.message,
          ocean: params.ocean,
          traits: params.traits,
          session_id: params.session_id,
          user_id: params.user_id,
        });

        return {
          context_for_llm: result.context_for_llm,
          emotion_state: result.emotion_state,
          suggested_temperature: result.suggested_temperature,
          suggested_tone: result.suggested_tone,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : '未知错误';
        throw new Error(`Soul Compute 失败: ${message}`);
      }
    },
  });
}

export { soulCompute, SoulComputeResponse } from './soul-compute';

export default registerSoulTool;