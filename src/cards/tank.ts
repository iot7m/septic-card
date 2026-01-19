import { LitElement, css, html } from "lit";

import { customElement } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

import type { GSeptikCardConfig } from "@/types/cards";

import { assertAllEntities } from "@/utils/asserts";
import { getCriticalLevel, getExceedsCritical, getLevel } from "@/utils/extractors";

import { CARD_PREFIX } from "@/const";

export const CARD_NAME = `${CARD_PREFIX}-tank-card` as const;

@customElement(CARD_NAME)
export class TankCard extends LitElement implements LovelaceCard {
  private _config?: GSeptikCardConfig;

  hass?: HomeAssistant;

  setConfig(config: GSeptikCardConfig) {
    assertAllEntities(config);
    this._config = config;
    this.requestUpdate();
  }

  getCardSize(): number {
    return 1;
  }

  firstUpdated() {
    this.renderTank();
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

  render() {
    if (!this._config) return html`<ha-card>Loading...</ha-card>`;

    const criticalLevel = getCriticalLevel(this.hass, this._config!.entities.x_level);
    const exceedsCritical = getExceedsCritical(this.hass, this._config!.entities.exceeds_x_level);

    return html`
      <ha-card>
        <h2>Септик</h2>
        <div class="flex">
        <div>
          ${this.renderTank()}
        </div>
          <statistic-box>
          <ha-card class="statistic-card" @click=${() => this._openMoreInfo(this._config!.entities.exceeds_x_level)}>
              ${
                exceedsCritical
                  ? html`<good-value>Превышен уровень септика</good-value> `
                  : html`<bad-value>Уровень септика не превышен</bad-value>`
              }
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(this._config!.entities.x_level)}>
              Критический уровень септика: ${criticalLevel} %
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(this._config!.entities.temp)}>
              <ha-icon icon="mdi:thermometer"></ha-icon>
              ${
                Number(this.hass?.states?.[this._config!.entities.temp].state) > 0
                  ? html`<good-value>+${this.hass?.states?.[this._config!.entities.temp].state} &deg;C</good-value>`
                  : html`<bad-value>${this.hass?.states?.[this._config!.entities.temp].state}&deg;C</bad-value>`
              }
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(this._config!.entities.pressure)}>
                <ha-icon icon="mdi:gauge"></ha-icon>
                ${this.hass?.states?.[this._config!.entities.pressure].state}
                mbar
            </ha-card>
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderTank() {
    const level = getLevel(this.hass, this._config!.entities.level);
    const criticalLevel = getCriticalLevel(this.hass, this._config!.entities.x_level);
    const isCritical = level >= criticalLevel;
    const showBubbles = level > 10;

    return html`
      <div class="tank ${isCritical ? "critical" : ""}">
        <div class="fill" style="height: ${level}%">
          ${showBubbles
            ? html`
                <div class="bubble bubble--1"></div>
                <div class="bubble bubble--2"></div>
                <div class="bubble bubble--3"></div>
                <div class="bubble bubble--4"></div>
              `
            : null}
        </div>
        <div class="critical-line" style="bottom: ${criticalLevel}%"></div>
        <div class="value-label">Уровень септика: ${level}%</div>
      </div>
    `;
  }

  static styles = css`
    ha-card {
      padding: 16px;
    }

    .tank {
      position: relative;
      width: 8rem;
      height: 100%;
      border: 2px solid #9e9e9e;
      border-radius: 8px;
      background: #dce1ea;
      overflow: hidden;
      box-sizing: border-box;
    }

    .fill {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0%;
      background: linear-gradient(#c5d0e6 5%, #007fff 95%);
      transition: height 0.6s ease;
      overflow: hidden;
    }

    @keyframes bubble {
      0% {
        bottom: -30%;
        opacity: 0;
        transform: translateX(0);
      }
      10% {
        opacity: 0.3;
      }
      100% {
        bottom: 100%;
        opacity: 0;
        transform: translateX(15px);
      }
    }

    @keyframes sideWays {
      0% {
        margin-left: 0px;
      }
      100% {
        margin-left: 20px;
      }
    }
    .bubble {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      position: absolute;
      background-color: white;
      bottom: -30%;
      opacity: 0.2;
      animation:
        bubble 10s ease-in-out infinite,
        sideWays 4s ease-in-out infinite alternate;
    }

    .bubble--1 {
      left: 10%;
      animation-delay: 0.5s;
      animation-duration: 16s;
      opacity: 0.2;
    }

    .bubble--2 {
      width: 15px;
      height: 15px;
      left: 40%;
      animation-delay: 1s;
      animation-duration: 10s;
      opacity: 0.1;
    }

    .bubble--3 {
      width: 10px;
      height: 10px;
      left: 30%;
      animation-delay: 5s;
      animation-duration: 20s;
      opacity: 0.3;
    }

    .bubble--4 {
      width: 25px;
      height: 25px;
      left: 40%;
      animation-delay: 8s;
      animation-duration: 17s;
      opacity: 0.2;
    }

    .tank.critical {
      background: #e32636;
    }

    .critical-line {
      position: absolute;
      width: 100%;
      border-top: 2px dashed #ff5252;
      left: 0;
    }

    .value-label {
      position: absolute;
      width: 100%;
      text-align: center;
      font-weight: bold;
      color: #000;
      bottom: 8px;
      pointer-events: none;
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
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: "G-Septik Tank",
  description: "Tank card for G-Septik septic sensor",
});
