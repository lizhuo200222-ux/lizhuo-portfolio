import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 目录型页面统一带尾斜杠：/about -> /about/
// 预览服务器是 SPA fallback，少斜杠会被回落到首页，所以在服务器层先做 301。
const PRETTY = { '/about': '/about/', '/contact': '/contact/', '/work/portfolio': '/#portfolio', '/work/portfolio/': '/#portfolio' };

const prettyUrls = () => ({
  name: 'pretty-urls-redirect',
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const path = (req.url || '').split('?')[0];
      const target = PRETTY[path];
      if (target) {
        const tail = (req.url || '').slice(path.length);
        res.writeHead(301, { Location: target + tail });
        res.end();
        return;
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), prettyUrls()],
  server: {
    host: '127.0.0.1',
    port: 4173,
    allowedHosts: ['.lhr.life'],
  },
});
