import { LitElement, css, html } from "lit";

import { customElement } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

import type { GSeptikCardConfig } from "@/types/cards";

import { getCriticalLevel } from "@/utils/gseptik";

import { CARD_PREFIX } from "@/const";

export const CARD_NAME = `${CARD_PREFIX}-tile-card` as const;

interface GspeptikDialogueElement extends HTMLElement {
  hass?: HomeAssistant;
  entity: string;
}

@customElement(CARD_NAME)
export class TileCard extends LitElement implements LovelaceCard {
  private _config?: GSeptikCardConfig;

  hass?: HomeAssistant;

  setConfig(config: GSeptikCardConfig) {
    if (
      !config.entities?.level ||
      !config.entities.temp ||
      !config.entities.pressure ||
      !config.entities.x_level ||
      !config.entities.exceeds_x_level ||
      !config.entities.error_name
    ) {
      throw new Error("All entities must be defined: level, temp, pressure, x_level, exceeds_x_level, error_name");
    }
    this._config = config;
    this.requestUpdate();
  }

  getCardSize(): number {
    return 1;
  }

  private _openDialog() {
    const dialog = document.createElement("gspeptik-dialogue") as GspeptikDialogueElement;
    dialog.hass = this.hass;
    dialog.entity = this._config!.entity;
    document.body.appendChild(dialog);
  }

  private get septicLevel() {
    const value = Number(this.hass?.states["sensor.uroven_zhidkosti_septika"]?.state);
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  private get criticalLevel() {
    const value = Number(this.hass?.states["sensor.kriticheskii_uroven_septika"]?.state);
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  render() {
    const criticalLevel = getCriticalLevel(this.hass, this._config!.entities.x_level);

    return html`
      <ha-card @click=${this._openDialog}>
        <h2>Септик</h2>
        <div class="tank-ball" style="--level:${criticalLevel}">
          <div class="water"></div>
          <div class="center-label">${criticalLevel}%</div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      padding: 16px;
    }

    .tank-ball {
      width: 60px;
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
      font-weight: bold;
      color: #003366;
      pointer-events: none;
    }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: "G-Septik Tile",
  description: "Compact tile card for G-Septik septic sensor",
});
