import { LitElement, css, html } from "lit";

import { customElement, state } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
    }>;
  }
}

interface SepticCardConfig extends LovelaceCardConfig {
  entity: string;
}

@customElement("cistern-card")
export class SepticElement extends LitElement implements LovelaceCard {
  @state()
  private _config?: SepticCardConfig;
  static styles = css`
    ha-card {
      padding: 16px;
    }

    .tank-ball {
      width: clamp(120px, 20vw, 25vw);
      aspect-ratio: 1;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      background: #e6e6e6;
      border: 2px solid #9e9e9e;
      box-sizing: border-box;
    }

    .water {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: calc(var(--level) * 1%);
      background: linear-gradient(to top, #0066cc, #1e90ff);
      transition: height 0.6s ease;
      box-sizing: border-box;
    }

    .water-line {
      position: absolute;
      top: 0;
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.6);
      box-sizing: border-box;
    }

    .center-label {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font-size: 1.6rem;
      font-weight: bold;
      color: #003366;
      pointer-events: none;
    }

    .scale {
      z-index: 1;
      box-sizing: border-box;
      position: absolute;
      inset: 0 45%;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .mark-critical {
      position: absolute;
      left: -25%;
      bottom: calc(var(--critical) * 1% - 0.7rem);
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 0.7rem;
      color: #e32636;
      box-sizing: border-box;
      white-space: nowrap;
    }
    .mark {
      position: absolute;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 0.7rem;
      color: #87b4d9;
      box-sizing: border-box;
      white-space: nowrap;
    }

    .mark::before {
      content: "";
      width: 8px;
      height: 1px;
      background: #666;
    }

    .mark[data-value="90"] {
      top: calc(10% - 0.7rem / 2);
    }
    .mark[data-value="80"] {
      top: calc(20% - 0.7rem / 2);
    }
    .mark[data-value="70"] {
      top: calc(30% - 0.7rem / 2);
    }
    .mark[data-value="60"] {
      top: calc(40% - 0.7rem / 2);
    }
    .mark[data-value="50"] {
      top: calc(50% - 0.7rem / 2);
    }
    .mark[data-value="40"] {
      top: calc(60% - 0.7rem / 2);
    }
    .mark[data-value="30"] {
      top: calc(70% - 0.7rem / 2);
    }
    .mark[data-value="20"] {
      top: calc(80% - 0.7rem / 2);
    }
    .mark[data-value="10"] {
      top: calc(90% - 0.7rem / 2);
    }
    .mark.active {
      color: #94cfff;
      font-weight: 600;
    }

    .mark.critical-mark::before {
      background: #e32636;
    }

    .flex {
      display: flex;
      gap: 10px;
    }
    good-value {
      color: green;
    }
    bad-value {
      color: red;
    }

    .statistic-card {
      display: block;
      min-width: 8rem;
      max-width: 12rem;
      cursor: pointer;
      align-self: stretch;
      padding: 8px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 10px;
      background-color: var(--card-background-color);
    }
    .statistic-card:last-child {
      margin-bottom: 0;
    }
    .statistic-card:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `;

  private get septicLevel() {
    const value = Number(this.hass?.states["sensor.uroven_zhidkosti_septika"]?.state);
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  private get criticalLevel() {
    const value = Number(this.hass?.states["sensor.kriticheskii_uroven_septika"]?.state);
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  private renderTank() {
    const level = this.septicLevel;
    const critical = this.criticalLevel;
    const marks = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    return html`
      <div class="tank-ball" style="--level: ${level}; --critical: ${critical}">
        <div class="scale">
          ${marks.map(
            (mark) => html`
              <div
                class="mark ${level >= mark ? "active" : ""} ${mark === critical ? "critical-mark" : ""}"
                data-value="${mark}"
              >
                &mdash;${mark}%&mdash;
              </div>
            `,
          )}
          ${html` <div class="mark-critical">&mdash;${critical}%&mdash;</div> `}
        </div>
        <div class="water">
          <div class="water-line"></div>
        </div>
      </div>
    `;
  }

  private _openMoreInfo(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  firstUpdated() {
    this.renderTank();
  }

  setConfig(config: SepticCardConfig) {
    if (!config.entity) throw new Error("Entity must be defined");
    this._config = config;
  }

  getCardSize(): number {
    return 1;
  }

  hass?: HomeAssistant;

  render() {
    if (!this._config) return html`<ha-card>Loading...</ha-card>`;
    const uroven_zhidkosti_septika = "sensor.uroven_zhidkosti_septika";
    const temperatura_septika = "sensor.temperatura_septika";
    const davlenie_septika = "sensor.davlenie_septika";
    const kriticheskii_uroven_septika = "sensor.kriticheskii_uroven_septika";
    const prevyshen_kriticheskii_uroven_septika = "sensor.prevyshen_kriticheskii_uroven_septika";
    return html`
      <ha-card>
        <h2>Септик</h2>
        <div class="flex">
        <div>
          ${this.renderTank()}
        </div>
          <statistic-box>
          <ha-card class="statistic-card" @click=${() => this._openMoreInfo(prevyshen_kriticheskii_uroven_septika)}>
              ${
                this.hass?.states?.[prevyshen_kriticheskii_uroven_septika].state === "Нет"
                  ? html`<good-value>Уровень септика не превышен</good-value> `
                  : html`<bad-value>Превышен уровень септика</bad-value>`
              }
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(kriticheskii_uroven_septika)}>
              Критический уровень септика:
              ${this.hass?.states?.[kriticheskii_uroven_septika].state} %
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(uroven_zhidkosti_septika)}>
              Уровень жидкости септика:
              ${this.hass?.states?.[uroven_zhidkosti_septika].state} %
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(temperatura_septika)}>
              <ha-icon icon="mdi:thermometer"></ha-icon>
              ${
                Number(this.hass?.states?.[temperatura_septika].state) > 0
                  ? html`<good-value>+${this.hass?.states?.[temperatura_septika].state} &deg;C</good-value>`
                  : html`<bad-value>${this.hass?.states?.[temperatura_septika].state}&deg;C</bad-value>`
              }
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(davlenie_septika)}>
                <ha-icon icon="mdi:gauge"></ha-icon>
                ${this.hass?.states?.[davlenie_septika].state}
                mbar
            </ha-card>
          </div>
        </div>
      </ha-card>
    `;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "cistern-card",
  name: "My Element",
  description: "Minimal Lit 3 card for Home Assistant",
});
