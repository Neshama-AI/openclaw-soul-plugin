# Neshama Soul - OpenClaw Plugin

> 给 AI Agent 注入灵魂，赋予独特人格和真实情绪。

---

## 安装

```bash
openclaw plugins install @neshama/openclaw-soul
```

或从 GitHub 安装：

```bash
git clone https://github.com/Neshama-AI/openclaw-soul-plugin.git
cd openclaw-soul-plugin
openclaw plugins install .
```

---

## 功能

### soul_compute 工具

注册一个工具，允许 Agent 调用 Neshama Soul API 获取人格提示词。

**参数**：
- `message` (必需): 用户消息
- `ocean` (可选): OCEAN 人格配置
- `traits` (可选): 人格特征
- `session_id` (可选): 会话 ID

**返回**：
- `context_for_llm`: 人格提示词
- `emotion_state`: 情绪状态
- `suggested_temperature`: 建议温度
- `suggested_tone`: 建议语气

---

## OCEAN 人格模型

| 维度 | 默认值 | 说明 |
|------|--------|------|
| Openness | 0.7 | 开放性：好奇心、创造力 |
| Conscientiousness | 0.6 | 尽责性：条理性、自律性 |
| Extraversion | 0.8 | 外向性：社交能力、活力 |
| Agreeableness | 0.7 | 宜人性：合作性、同理心 |
| Neuroticism | 0.3 | 神经质：情绪稳定性 |

---

## API 配置

- **端点**: `POST https://api.neshama.pw/v1/soul/compute`
- **公共 Key**: `nsh_public_beta_2026`

---

## 相关资源

| 资源 | 链接 |
|------|------|
| 官网 | https://neshama.pw |
| SoulCraft | https://neshama.pw/soulcraft |
| API 文档 | https://api.neshama.pw/docs |

---

MIT License

**© 2026 Neshama AI. All rights reserved.**