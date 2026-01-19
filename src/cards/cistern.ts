import { LitElement, css, html } from "lit";

import { customElement } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

import type { EntityCardConfig } from "@/types/cards";

import { CARD_PREFIX } from "@/const";

export const CARD_NAME = `${CARD_PREFIX}-cistern-card` as const;

@customElement(CARD_NAME)
export class CisternCard extends LitElement implements LovelaceCard {
  private readonly _entities = [
    {
      entity: "sensor.uroven_zhidkosti_septika",
      icon: "mdi:water-percent",
      name: "Уровень жидкости",
    },
    {
      entity: "sensor.temperatura_septika",
      icon: "mdi:thermometer",
      name: "Температура",
    },
    {
      entity: "sensor.davlenie_septika",
      icon: "mdi:gauge",
      name: "Давление",
    },
    {
      entity: "sensor.kriticheskii_uroven_septika",
      icon: "mdi:water-alert",
      name: "Критический уровень",
    },
    {
      entity: "sensor.prevyshen_kriticheskii_uroven_septika",
      icon: "mdi:alert-octagon-outline",
      name: "Превышение уровня",
    },
    {
      entity: "sensor.oshibka_septika",
      icon: "mdi:alert-circle-outline",
      name: "Ошибка",
    },
  ];

  private _config?: EntityCardConfig;

  hass?: HomeAssistant;

  setConfig(config: EntityCardConfig) {
    if (!config.entity) throw new Error("Entity must be defined");
    this._config = config;
    this.requestUpdate();
  }

  getCardSize(): number {
    return 1;
  }

  firstUpdated() {
    this.renderCistern();
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

  private get septicLevel() {
    const value = Number(this.hass?.states["sensor.uroven_zhidkosti_septika"]?.state);
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  private get criticalLevel() {
    const value = Number(this.hass?.states["sensor.kriticheskii_uroven_septika"]?.state);
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  private renderCistern() {
    const level = this.septicLevel;
    const critical = this.criticalLevel;
    const marks = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    return html`
      <div
        class="cistern"
        style="--level: ${level}; --critical: ${critical}"
        @click=${() => this._openMoreInfo(this.hass!.states["sensor.uroven_zhidkosti_septika"].entity_id)}
      >
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

  private renderEntities() {
    if (!this.hass) return html``;

    return html`
      <div class="entities">
        ${this._entities.map((item) => {
          const stateObj = this.hass!.states[item.entity];
          if (!stateObj) return null;

          return html`
            <div class="entity-row" @click=${() => this._openMoreInfo(item.entity)}>
              <ha-icon class="entity-icon" icon=${item.icon}></ha-icon>

              <div class="entity-name">${item.name ?? stateObj.attributes.friendly_name}</div>

              <div class="entity-state">${stateObj.state} ${stateObj.attributes.unit_of_measurement ?? ""}</div>
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    if (!this._config) return html`<ha-card>Loading...</ha-card>`;
    return html`
      <ha-card>
        <h1 class="card-header">Септик</h1>
        <div class="card-box">
        <div class ="cistern-container">
        ${this.renderCistern()}
        </div>
          ${this.renderEntities()}
          <statistic-box>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    .cistern {
      width: 100%;
      max-width: 320px;
      aspect-ratio: 1;
      margin: 0 auto;
      border-radius: 50%;
      position: relative;
      overflow: hidden;

      background: #e6e6e6;
      border: 2px solid #9e9e9e;
      box-sizing: border-box;
    }

    .cistern-container {
      padding: 0 8px;
    }

    .card-box {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      min-width: 0;
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
    .entities {
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      overflow: hidden;
    }

    .entity-row {
      display: grid;
      grid-template-columns: 40px 1fr auto;
      align-items: center;
      gap: 12px;

      padding: 12px 16px;
      cursor: pointer;

      font-family: var(--ha-font-family-body);
      -webkit-font-smoothing: var(--ha-font-smoothing);
      font-size: var(--ha-font-size-m);
      font-weight: var(--ha-font-weight-normal);
      line-height: var(--ha-line-height-normal);
      border-bottom: 1px solid var(--divider-color);
    }

    .entity-row:last-child {
      border-bottom: none;
    }

    .entity-row:hover {
      background: var(--secondary-background-color);
    }

    .entity-name {
      color: var(--primary-text-color);
    }

    .entity-state {
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .entity-icon {
      color: var(--state-icon-color);
    }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: "G-Septik Cistern",
  description: "Cistern card for G-Septik septic sensor",
});
