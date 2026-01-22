import { LitElement, css, html } from "lit";

import { customElement } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

import type { GSeptikCardConfig } from "@/types/cards";
import { GSEPTIK_ENTITY_DEFS } from "@/types/defs";

import { assertAllEntities } from "@/utils/asserts";
import {
  getCriticalLevel,
  getEntityId,
  getFriendlyName,
  getLevel,
  getLevelEntityId,
  getStateObj,
  getUnitOfMeasure,
} from "@/utils/extractors";

import { CISTERN_CARD_EDITOR_NAME, CISTERN_CARD_NAME } from "@/const";

@customElement(CISTERN_CARD_NAME)
export class CisternCard extends LitElement implements LovelaceCard {
  private _config?: GSeptikCardConfig;
  private _hass?: HomeAssistant;

  setConfig(config: GSeptikCardConfig) {
    assertAllEntities(config);
    this._config = config;
    this.requestUpdate();
  }

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
  }

  public get hass(): HomeAssistant {
    return this._hass!;
  }

  getCardSize(): number {
    return 1;
  }

  static getStubConfig() {
    return {
      type: `custom:${CISTERN_CARD_NAME}`,
      entities: Object.fromEntries(GSEPTIK_ENTITY_DEFS.map((d) => [d.key, getEntityId(String(d.key))])),
    };
  }

  static async getConfigElement() {
    await import("@/cards/cistern-card-editor");
    return document.createElement(`${CISTERN_CARD_EDITOR_NAME}`);
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
    if (!this._config || !this._hass) return html``;

    return html`
      <ha-card>
        <h1 class="card-header">Септик</h1>
        <div class="card-box">${this.renderCistern()} ${this.renderEntities()}</div>
      </ha-card>
    `;
  }

  private renderCistern() {
    if (!this._hass || !this._config) return html``;
    const level = getLevel(this._hass, this._config.entities.level);
    const criticalLevel = getCriticalLevel(this._hass, this._config.entities.x_level);
    const levelEntityId = getLevelEntityId(this._config.entities.level);
    const isCritical = level >= criticalLevel;

    const marks = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    return html`
      <div
        class="cistern"
        style="--level: ${level}; --critical: ${criticalLevel}; --is-critical: ${isCritical ? 1 : 0}"
        @click=${() => this._openMoreInfo(levelEntityId)}
      >
        <div class="scale">
          ${marks.map(
            (mark) => html`
              <div
                class="mark ${level >= mark ? "active" : ""} ${mark === criticalLevel ? "critical-mark" : ""}"
                data-value="${mark}"
              >
                &mdash;${mark}%&mdash;
              </div>
            `,
          )}
          <div class="mark-critical">&mdash;${criticalLevel}%&mdash;</div>
        </div>
        <div class="center-label">${Math.round(level)}%</div>
        <div class="water ${isCritical ? "water-critical" : ""}">
          <div class="water-line"></div>
        </div>
      </div>
    `;
  }

  private renderEntities() {
    if (!this.hass || !this._config) return html``;
    return html`
      <div class="entities">
        ${GSEPTIK_ENTITY_DEFS.map((def) => {
          const configured = this._config!.entities[def.key];
          const entityId = getEntityId(configured);
          const stateObj = getStateObj(this.hass, configured);
          if (!stateObj) return null;

          const uom = getUnitOfMeasure(stateObj);
          const name = getFriendlyName(stateObj, def.label);

          return html`
            <div class="entity-row" @click=${() => this._openMoreInfo(entityId)}>
              <ha-icon class="entity-icon" icon=${def.icon}></ha-icon>
              <div class="entity-name">${name}</div>
              <div class="entity-state">${stateObj.state} ${uom}</div>
            </div>
          `;
        })}
      </div>
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

      background: var(--secondary-background-color);
      border: 2px solid var(--divider-color);
      box-sizing: border-box;
    }

    .card-box {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      min-width: 0;
    }

    .center-label {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font-family: var(--ha-font-family-heading);
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 1;
      color: var(--primary-text-color);
      pointer-events: none;
      z-index: 4;
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

    .water-critical {
      background: linear-gradient(to top, var(--error-color, #d32f2f));
    }

    .scale {
      z-index: 3;
      box-sizing: border-box;
      position: absolute;
      inset: 0 62% 0 12%;
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
  type: CISTERN_CARD_NAME,
  name: "G-Septik Cistern",
  description: "Cistern card for G-Septik septic sensor",
});
