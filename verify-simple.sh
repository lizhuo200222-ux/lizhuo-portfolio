#!/bin/bash

echo "=== 快速验证作品集更新 ==="
echo ""

# 检查portfolio-personalize.js中的关键内容
echo "1. 检查AI视频功能代码..."
if grep -q "setupAIVideoViewer" public/portfolio-personalize.js; then
  echo "✓ setupAIVideoViewer 函数已定义"
else
  echo "✗ setupAIVideoViewer 函数未找到"
fi

if grep -q "ai-video-viewer-dialog" public/portfolio-personalize.js; then
  echo "✓ AI视频Dialog ID已定义"
else
  echo "✗ AI视频Dialog未定义"
fi

if grep -q "capability-video-btn" public/portfolio-personalize.js; then
  echo "✓ 视频按钮类已定义"
else
  echo "✗ 视频按钮类未定义"
fi

echo ""
echo "2. 检查三个视频源..."
if grep -q "FORMA_三种生图方式_自然配音精剪.mp4" public/portfolio-personalize.js; then
  echo "✓ FORMA演示视频已配置"
fi

if grep -q "01-reference-recreation.mp4" public/portfolio-personalize.js; then
  echo "✓ 参考图重建视频已配置"
fi

if grep -q "02-ai-generation-edit.mp4" public/portfolio-personalize.js; then
  echo "✓ AI生成编辑视频已配置"
fi

echo ""
echo "3. 检查AI能力说明..."
if grep -q "智能体搭建 / Skill 编写与封装" public/portfolio-personalize.js; then
  echo "✓ AI能力说明已更新（第一个能力卡片）"
fi

if grep -q "已搭建 7 个.*影刀 RPA.*数据采集机器人" public/portfolio-personalize.js; then
  echo "✓ RPA能力说明已更新（第二个能力卡片）"
fi

echo ""
echo "4. 检查幂等性保护..."
if grep -q "let videoViewerInitialized=false" public/portfolio-personalize.js; then
  echo "✓ 幂等性标志已定义"
fi

if grep -q "if(videoViewerInitialized)return" public/portfolio-personalize.js; then
  echo "✓ 幂等性检查已实现"
fi

echo ""
echo "5. 检查dist构建文件..."
ls -lh dist/index.html dist/assets/*.js 2>/dev/null | tail -3

echo ""
echo "✓ 代码验证完成"
