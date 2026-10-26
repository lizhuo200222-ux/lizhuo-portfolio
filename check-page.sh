#!/bin/bash

echo "=== 检查页面渲染与功能 ==="
echo ""

# 检查HTML中的关键DOM元素
echo "1. 检查Services部分..."
curl -s http://127.0.0.1:4173/ | grep -o 'data-framer-name="Services"' && echo "✓ Services部分存在" || echo "✗ Services部分未找到"

# 检查能力卡片
echo ""
echo "2. 检查能力卡片..."
curl -s http://127.0.0.1:4173/ | grep -c 'framer-14miuru-container' && echo "✓ 第一个能力卡片HTML存在" || echo "✗ 未找到"

# 检查personalize脚本
echo ""
echo "3. 检查脚本加载..."
curl -s http://127.0.0.1:4173/ | grep -o 'portfolio-personalize.js' && echo "✓ portfolio-personalize.js已加载" || echo "✗ 脚本未加载"

# 检查视频资源
echo ""
echo "4. 检查视频资源可访问性..."
for video in \
  "assets/portfolio/generation-workbench/video/FORMA_三种生图方式_自然配音精剪.mp4" \
  "assets/portfolio/video-workflow/01-reference-recreation.mp4" \
  "assets/portfolio/video-workflow/02-ai-generation-edit.mp4"
do
  status=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/"$video")
  if [ "$status" = "200" ]; then
    echo "✓ $video - 200"
  else
    echo "✗ $video - $status"
  fi
done

echo ""
echo "✓ 页面检查完成"
