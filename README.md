# 深圳 × 香港路线图

深圳与香港国庆三日路线的静态网页。地图使用 MapLibre GL 和 OpenFreeMap 矢量瓦片，路线、站点和交互全部由 GeoJSON 驱动，缩放时保持清晰。

在线访问：<https://blog.acretiondisk.top/shenzhen-hong-kong-route/>

## 功能

- 按日期筛选：全部、10/1 夜游、10/2 深圳、10/3 香港、10/4 返程
- 晴天完整版和雨天替代版
- 23 个路线站点与交通提示
- 住宿锚点：城市主题酒店（深圳北站店）
- D2281、D2424 两张车票信息
- 亮色、暗色主题
- 移动端和桌面端响应式布局

## 本地运行

项目没有构建步骤。任选一个静态服务器：

```bash
python3 -m http.server 4175
```

或：

```bash
npx --yes serve . -l 4175
```

然后打开 `http://localhost:4175`。

## 数据与地图

- 地图样式与矢量瓦片：[OpenFreeMap](https://openfreemap.org/)
- 地图数据：OpenStreetMap contributors
- 地图渲染：[MapLibre GL JS](https://maplibre.org/)
- 行程数据：[`data/trip.js`](./data/trip.js)

页面会请求 OpenFreeMap 的公共矢量瓦片服务。正式商用或高流量部署前，请确认其服务条款或自托管瓦片。

## 部署

仓库包含 GitHub Pages Actions 工作流。推送到 `main` 后，在仓库 Settings → Pages 中选择 **GitHub Actions** 即可。

## License

MIT
