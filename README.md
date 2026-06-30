# Chromatic Innovision Advertising Website - Premium Version

Upload these files and folders to the root of the GitHub repository:

- index.html
- style.css
- script.js
- robots.txt
- sitemap.xml
- assets/

Vercel will redeploy automatically after commit.

## 本次更新内容 (SEO / 性能 / 无障碍修复)

1. **Meta / 分享卡片修复**
   - `og:image` 改为绝对网址,补上 `og:url`、`og:type`、`og:locale`、`twitter:card` 等标签
   - 加上 `canonical` 标签
   - title / description 加入中文关键词("怡保数字营销"等),加强本地搜索曝光

2. **结构化数据 (JSON-LD)**
   - 新增 `MarketingAgency` schema,包含地址、电话、创办人等信息,方便 Google 在搜索结果/地图中显示更完整的商家卡片

3. **robots.txt + sitemap.xml**
   - 新增这两个文件,帮助搜索引擎正确抓取与收录网站(之前缺失这两项)
   - ⚠️ 上传后建议到 Google Search Console 重新提交 sitemap

4. **图片加载优化**
   - 首屏 hero 大图设为 `eager` + `fetchpriority="high"`,优先加载
   - 其余图片全部加 `loading="lazy"` + `decoding="async"`,加快首屏速度

5. **无障碍 (Accessibility)**
   - 新增 `:focus-visible` 键盘焦点样式,方便键盘用户导航

6. **3D / 视觉增强**(上一轮已完成)
   - 卡片鼠标跟随倾斜 + 高光扫光
   - Hero 区视差效果
   - 按钮按压触感

## 后续建议(未在本次处理,需要你确认或提供素材后再做)

- About 区块的 "90% Strategy Focus" 这个统计指标意义不够清晰,建议换成更具体的数字(例如服务年限、合作品牌数等)
- Founder's Message 可以再加 1-2 句话,增加真实感
- 两个 WhatsApp 号码建议标注各自用途(例如哪个是业务咨询、哪个是客服)
- 需要你提供 `assets/og-image.jpg` 的实际尺寸确认是否为 1200x630(已在 meta 标签里按此尺寸标注)

