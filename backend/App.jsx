import React, { useState } from 'react';

// ... (省略了 UI 組件和樣式代碼)

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  // ... (其他狀態變量: model, prompt, apiKey 等)

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // ... 將所有表單數據打包
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setImages(data.map(img => img.url));
      } else {
        // ... 處理錯誤
      }
    } catch (error) {
      // ... 處理網絡錯誤
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Flux AI 圖像生成器 (Node.js 版)</h1>
      {/* ... (渲染表單輸入框和按鈕) */}
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? '生成中...' : '生成圖像'}
      </button>
      <div>
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Generated ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
