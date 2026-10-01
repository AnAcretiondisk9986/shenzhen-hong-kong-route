import { trip } from "./data/trip.js";

const MAP_STYLE_LIGHT = "https://tiles.openfreemap.org/styles/positron";
const MAP_STYLE_DARK = "https://tiles.openfreemap.org/styles/dark";

const dayColors = Object.fromEntries(
  Object.entries(trip.days).map(([day, meta]) => [day, meta.color])
);

const state = {
  activeDay: 0,
  weather: "dry",
  selectedId: trip.stops[0].id,
  theme: getInitialTheme(),
  mapReady: false,
  styleReady: false
};

const dayTabs = document.getElementById("day-tabs");
const routeList = document.getElementById("route-list");
const routeSummary = document.getElementById("route-summary");
const weatherNote = document.getElementById("weather-note");
const ticketList = document.getElementById("ticket-list");
const stayList = document.getElementById("stay-list");
const mapLoading = document.getElementById("map-loading");
const mapDayDot = document.getElementById("map-day-dot");
const mapDayTitle = document.getElementById("map-day-title");
const mapDayMeta = document.getElementById("map-day-meta");
const selectionDay = document.getElementById("selection-day");
const selectionName = document.getElementById("selection-name");
const selectionTime = document.getElementById("selection-time");
const selectionNote = document.getElementById("selection-note");
const selectionTags = document.getElementById("selection-tags");
const selectionTransport = document.getElementById("selection-transport");
const totalStopCount = document.getElementById("total-stop-count");
const fitRouteButton = document.getElementById("fit-route");
const themeToggle = document.getElementById("theme-toggle");

document.documentElement.dataset.theme = state.theme;

function getInitialTheme() {
  const saved = localStorage.getItem("route-map-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function mapStyle() {
  return state.theme === "dark" ? MAP_STYLE_DARK : MAP_STYLE_LIGHT;
}

function stopById(id) {
  return trip.stops.find((stop) => stop.id === id);
}

function isVisible(stop) {
  if (state.weather === "wet" && stop.rain === "skip") return false;
  return true;
}

function visibleStops() {
  return trip.stops.filter((stop) => {
    if (state.activeDay !== 0 && stop.day !== state.activeDay) return false;
    return isVisible(stop);
  });
}

function stopsForDay(day) {
  return trip.stops.filter((stop) => stop.day === day && isVisible(stop));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTickets() {
  ticketList.innerHTML = trip.tickets
    .map(
      (ticket) => `
        <article class="ticket-card">
          <div class="ticket-card-header">
            <span class="ticket-code">${escapeHtml(ticket.code)} · ${escapeHtml(ticket.date)}</span>
            <span class="ticket-seat">${escapeHtml(ticket.seat)}</span>
          </div>
          <p class="ticket-route">${escapeHtml(ticket.route)}</p>
        </article>
      `
    )
    .join("");
}

function renderHotels() {
  stayList.innerHTML = trip.hotels
    .map(
      (hotel) => `
        <article class="stay-row">
          <i data-lucide="hotel" aria-hidden="true"></i>
          <span>
            <strong>${escapeHtml(hotel.name)}</strong>
            <small>${escapeHtml(hotel.dates)} · ${escapeHtml(hotel.address)}</small>
          </span>
        </article>
      `
    )
    .join("");
}

function renderDayTabs() {
  const items = [
    { day: 0, label: "全部", color: "var(--text)" },
    ...Object.entries(trip.days).map(([day, meta]) => ({
      day: Number(day),
      label: meta.label,
      color: meta.color
    }))
  ];

  dayTabs.innerHTML = items
    .map(
      (item) => `
        <button
          class="day-tab"
          type="button"
          data-day="${item.day}"
          aria-pressed="${item.day === state.activeDay}"
        >
          <span class="day-dot" style="background:${item.color}"></span>
          ${escapeHtml(item.label)}
        </button>
      `
    )
    .join("");

  dayTabs.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeDay = Number(button.dataset.day);
      const next = visibleStops()[0];
      if (next) state.selectedId = next.id;
      renderAll();
      updateMapData();
      fitVisibleStops();
    });
  });
}

function stopNumber(stop) {
  return trip.stops.findIndex((item) => item.id === stop.id) + 1;
}

function renderRouteList() {
  const groups = state.activeDay === 0 ? [1, 2, 3, 4] : [state.activeDay];
  const rows = [];

  groups.forEach((day) => {
    const dayStops = stopsForDay(day);
    if (dayStops.length === 0) return;
    rows.push(`
      <li class="route-day-label">
        <span class="day-dot" style="background:${trip.days[day].color}"></span>
        ${escapeHtml(trip.days[day].label)}
      </li>
    `);

    dayStops.forEach((stop, index) => {
      const classes = [
        "route-stop",
        index === 0 ? "is-first" : "",
        index === dayStops.length - 1 ? "is-last" : ""
      ]
        .filter(Boolean)
        .join(" ");

      rows.push(`
        <li>
          <button
            class="${classes}"
            type="button"
            data-stop-id="${escapeHtml(stop.id)}"
            aria-pressed="${stop.id === state.selectedId}"
          >
            <span class="stop-index" style="background:${trip.days[day].color}">
              ${String(stopNumber(stop)).padStart(2, "0")}
            </span>
            <span class="stop-copy">
              <span class="stop-line">
                <span class="stop-name">${escapeHtml(stop.name)}</span>
                <span class="stop-time">${escapeHtml(stop.time)}</span>
              </span>
              <span class="stop-transport">${escapeHtml(stop.transport)}</span>
            </span>
          </button>
        </li>
      `);
    });
  });

  routeList.innerHTML = rows.join("");
  routeList.querySelectorAll("[data-stop-id]").forEach((button) => {
    button.addEventListener("click", () => selectStop(button.dataset.stopId, true));
  });
}

function renderWeatherControls() {
  document.querySelectorAll("[data-weather]").forEach((button) => {
    const selected = button.dataset.weather === state.weather;
    button.setAttribute("aria-pressed", String(selected));
  });

  weatherNote.textContent =
    state.weather === "dry"
      ? "晴天版保留完整路线。"
      : "雨天版会缩短莲花山和深圳湾海边，优先商场、CBD 与街区活动。";
}

function renderSummary() {
  const stops = visibleStops();
  const dayLabel = state.activeDay === 0 ? "全部日期" : trip.days[state.activeDay].label;
  routeSummary.textContent = `${dayLabel} · ${stops.length} 个站点`;
  mapDayTitle.textContent = state.activeDay === 0 ? "全部路线" : trip.days[state.activeDay].label;
  mapDayMeta.textContent = `${stops.length} 个站点`;
  mapDayDot.style.background = state.activeDay === 0 ? "var(--text)" : trip.days[state.activeDay].color;
}

function selectedTags(stop) {
  const tags = [...stop.tags];
  if (state.weather === "wet" && stop.rain === "short") tags.push("当前缩短");
  return tags.filter((tag, index) => tags.indexOf(tag) === index);
}

function updateSelectionCard(stop) {
  selectionDay.textContent = trip.days[stop.day].label;
  selectionDay.style.background = `color-mix(in srgb, ${trip.days[stop.day].color} 16%, var(--panel))`;
  selectionDay.style.color = trip.days[stop.day].color;
  selectionName.textContent = stop.name;
  selectionTime.textContent = stop.time;
  selectionNote.textContent = stop.note;
  selectionTags.innerHTML = selectedTags(stop)
    .map((tag) => `<span>${escapeHtml(tag)}</span>`)
    .join("");
  selectionTransport.textContent = stop.transport;
}

function renderAll() {
  totalStopCount.textContent = String(trip.stops.length);
  renderHotels();
  renderDayTabs();
  renderWeatherControls();
  renderRouteList();
  renderSummary();
  const stop = stopById(state.selectedId) || visibleStops()[0] || trip.stops[0];
  state.selectedId = stop.id;
  updateSelectionCard(stop);
  updateThemeButton();
  window.lucide?.createIcons({ attrs: { width: 16, height: 16 } });
}

function updateThemeButton() {
  themeToggle.innerHTML =
    state.theme === "dark"
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';
  window.lucide?.createIcons({ attrs: { width: 18, height: 18 } });
}

function routeLineData() {
  const stops = visibleStops();
  const features = [];

  for (let index = 0; index < stops.length - 1; index += 1) {
    const from = stops[index];
    const to = stops[index + 1];
    if (from.day !== to.day) continue;
    features.push({
      type: "Feature",
      id: `${from.id}-${to.id}`,
      properties: {
        day: from.day,
        kind: to.kind
      },
      geometry: {
        type: "LineString",
        coordinates: [from.coordinates, to.coordinates]
      }
    });
  }

  return {
    type: "FeatureCollection",
    features
  };
}

function stopPointData() {
  return {
    type: "FeatureCollection",
    features: visibleStops().map((stop) => ({
      type: "Feature",
      id: stop.id,
      properties: {
        id: stop.id,
        day: stop.day,
        number: String(stopNumber(stop)).padStart(2, "0"),
        name: stop.name
      },
      geometry: {
        type: "Point",
        coordinates: stop.coordinates
      }
    }))
  };
}

function addRouteLayers() {
  if (map.getSource("route-lines")) return;

  map.addSource("route-lines", {
    type: "geojson",
    data: routeLineData(),
    promoteId: "id"
  });

  map.addSource("route-stops", {
    type: "geojson",
    data: stopPointData(),
    promoteId: "id"
  });

  map.addLayer({
    id: "route-lines-casing",
    type: "line",
    source: "route-lines",
    paint: {
      "line-color": state.theme === "dark" ? "#11161d" : "#ffffff",
      "line-opacity": 0.9,
      "line-width": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        8,
        6
      ]
    },
    layout: {
      "line-cap": "round",
      "line-join": "round"
    }
  });

  map.addLayer({
    id: "route-lines",
    type: "line",
    source: "route-lines",
    paint: {
      "line-color": ["match", ["get", "day"], 1, dayColors[1], 2, dayColors[2], 3, dayColors[3], 4, dayColors[4], "#2f7bf6"],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        6,
        3.5
      ]
    },
    layout: {
      "line-cap": "round",
      "line-join": "round"
    }
  });

  map.addLayer({
    id: "route-stops-halo",
    type: "circle",
    source: "route-stops",
    paint: {
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        13,
        9
      ],
      "circle-color": ["match", ["get", "day"], 1, dayColors[1], 2, dayColors[2], 3, dayColors[3], 4, dayColors[4], "#2f7bf6"],
      "circle-opacity": 0.18
    }
  });

  map.addLayer({
    id: "route-stops",
    type: "circle",
    source: "route-stops",
    paint: {
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        9,
        6.5
      ],
      "circle-color": ["match", ["get", "day"], 1, dayColors[1], 2, dayColors[2], 3, dayColors[3], 4, dayColors[4], "#2f7bf6"],
      "circle-stroke-color": state.theme === "dark" ? "#11161d" : "#ffffff",
      "circle-stroke-width": 2
    }
  });

  map.addLayer({
    id: "route-stop-labels",
    type: "symbol",
    source: "route-stops",
    layout: {
      "text-field": ["get", "number"],
      "text-font": ["Noto Sans Bold"],
      "text-size": 10,
      "text-allow-overlap": true,
      "text-ignore-placement": true
    },
    paint: {
      "text-color": "#ffffff"
    }
  });

  map.on("click", "route-stops", (event) => {
    const id = event.features?.[0]?.properties?.id;
    if (id) selectStop(id, false);
  });

  for (const layer of ["route-stops", "route-stop-labels"]) {
    map.on("mouseenter", layer, () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", layer, () => {
      map.getCanvas().style.cursor = "";
    });
  }

  syncFeatureState();
}

function removeRouteLayers() {
  const layers = [
    "route-stop-labels",
    "route-stops",
    "route-stops-halo",
    "route-lines",
    "route-lines-casing"
  ];
  layers.forEach((layer) => {
    if (map.getLayer(layer)) map.removeLayer(layer);
  });
  ["route-stops", "route-lines"].forEach((source) => {
    if (map.getSource(source)) map.removeSource(source);
  });
}

function updateMapData() {
  if (!state.mapReady || !state.styleReady) return;
  const lineSource = map.getSource("route-lines");
  const stopSource = map.getSource("route-stops");
  if (lineSource) lineSource.setData(routeLineData());
  if (stopSource) stopSource.setData(stopPointData());
  syncFeatureState();
}

function syncFeatureState() {
  if (!state.mapReady || !state.styleReady) return;
  const stops = visibleStops();

  for (const stop of stops) {
    map.setFeatureState(
      { source: "route-stops", id: stop.id },
      { selected: stop.id === state.selectedId }
    );
  }

  for (let index = 0; index < stops.length - 1; index += 1) {
    const from = stops[index];
    const to = stops[index + 1];
    if (from.day !== to.day) continue;
    map.setFeatureState(
      { source: "route-lines", id: `${from.id}-${to.id}` },
      { selected: from.id === state.selectedId }
    );
  }
}

function selectStop(id, fit) {
  const stop = stopById(id);
  if (!stop || !isVisible(stop)) return;
  state.selectedId = id;
  updateSelectionCard(stop);
  renderRouteList();
  syncFeatureState();
  window.lucide?.createIcons({ attrs: { width: 16, height: 16 } });

  if (fit && map) {
    map.easeTo({
      center: stop.coordinates,
      zoom: Math.max(map.getZoom(), 13.4),
      duration: 650
    });
  }

  localStorage.setItem(
    "route-map-state",
    JSON.stringify({
      activeDay: state.activeDay,
      weather: state.weather,
      selectedId: state.selectedId
    })
  );
}

function fitVisibleStops() {
  if (!map || visibleStops().length === 0) return;
  const stops = visibleStops();
  const bounds = new maplibregl.LngLatBounds();
  stops.forEach((stop) => bounds.extend(stop.coordinates));

  const mobile = window.matchMedia("(max-width: 900px)").matches;
  const maxZoom =
    state.activeDay === 0 ? 11.7 : trip.days[state.activeDay].maxZoom;

  if (stops.length === 1) {
    map.easeTo({ center: stops[0].coordinates, zoom: maxZoom, duration: 650 });
    return;
  }

  map.fitBounds(bounds, {
    padding: mobile
      ? { top: 80, right: 34, bottom: 160, left: 34 }
      : { top: 90, right: 80, bottom: 190, left: 80 },
    maxZoom,
    duration: 700
  });
}

const map = new maplibregl.Map({
  container: "map",
  style: mapStyle(),
  center: trip.center,
  zoom: 11,
  minZoom: 9,
  maxZoom: 17,
  pitch: 0,
  attributionControl: false
});

map.addControl(
  new maplibregl.NavigationControl({
    visualizePitch: false,
    showCompass: true,
    showZoom: true
  }),
  "top-right"
);

map.addControl(
  new maplibregl.ScaleControl({
    maxWidth: 110,
    unit: "metric"
  }),
  "bottom-right"
);

map.addControl(
  new maplibregl.AttributionControl({
    compact: true,
    customAttribution:
      '© <a href="https://openfreemap.org/" target="_blank" rel="noreferrer">OpenFreeMap</a> · © OpenMapTiles · © OpenStreetMap contributors'
  })
);

map.on("styleimagemissing", (event) => {
  if (event.id !== "wood-pattern" || map.hasImage(event.id)) return;
  map.addImage(event.id, {
    width: 1,
    height: 1,
    data: new Uint8Array([128, 128, 128, 0])
  });
});

map.on("load", () => {
  state.mapReady = true;
  state.styleReady = true;
  addRouteLayers();
  mapLoading.classList.add("is-hidden");
  fitVisibleStops();
});

map.on("style.load", () => {
  state.styleReady = true;
  if (!state.mapReady) return;
  addRouteLayers();
  updateMapData();
});

map.on("error", (event) => {
  console.error(event.error || event);
  if (!state.mapReady) {
    mapLoading.innerHTML =
      '<strong>矢量地图加载失败</strong><span>请检查网络后刷新页面。</span>';
  }
});

dayTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-day]");
  if (!button) return;
});

document.querySelectorAll("[data-weather]").forEach((button) => {
  button.addEventListener("click", () => {
    state.weather = button.dataset.weather;
    const stop = stopById(state.selectedId);
    if (!stop || !isVisible(stop)) {
      state.selectedId = visibleStops()[0]?.id || trip.stops[0].id;
    }
    renderAll();
    updateMapData();
    fitVisibleStops();
  });
});

fitRouteButton.addEventListener("click", () => {
  state.activeDay = 0;
  const next = visibleStops()[0];
  if (next) state.selectedId = next.id;
  renderAll();
  updateMapData();
  fitVisibleStops();
});

themeToggle.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = state.theme;
  localStorage.setItem("route-map-theme", state.theme);
  updateThemeButton();
  state.styleReady = false;
  removeRouteLayers();
  map.setStyle(mapStyle(), { diff: false });
});

try {
  const saved = JSON.parse(localStorage.getItem("route-map-state") || "null");
  if (saved) {
    if ([0, 1, 2, 3, 4].includes(saved.activeDay)) state.activeDay = saved.activeDay;
    if (saved.weather === "wet" || saved.weather === "dry") state.weather = saved.weather;
    if (stopById(saved.selectedId)) state.selectedId = saved.selectedId;
  }
} catch {
  localStorage.removeItem("route-map-state");
}

renderTickets();
renderAll();
window.lucide?.createIcons({ attrs: { width: 16, height: 16 } });
