import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// 密碼驗證中間件
const passwordAuth = (req, res, next) => {
  const { password } = req.body;
  if (password === process.env.ACCESS_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: '訪問密碼錯誤' });
  }
};

// 圖像生成 API 路由
app.post('/api/generate-image', passwordAuth, async (req, res) => {
  const { apiKey, baseUrl, model, prompt, n, size, style, quality } = req.body;

  if (!apiKey || !prompt) {
    return res.status(400).json({ error: '缺少必要的參數' });
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: baseUrl,
    });

    const response = await openai.images.generate({
      model: model,
      prompt: prompt,
      n: parseInt(n, 10),
      size: size,
      style: style,
      quality: quality,
    });

    res.json(response.data);
  } catch (error) {
    console.error('圖像生成失敗:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`後端服務器運行在 http://localhost:${port}`);
});
