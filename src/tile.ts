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

interface GspeptikDialogueElement extends HTMLElement {
  hass?: HomeAssistant;
  entity: string;
}

@customElement("tile-card")
export class SepticElement extends LitElement implements LovelaceCard {
  @state()
  private _config?: SepticCardConfig;
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

  private get septicLevel() {
    const value = Number(this.hass?.states["sensor.uroven_zhidkosti_septika"]?.state);
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  private get criticalLevel() {
    const value = Number(this.hass?.states["sensor.kriticheskii_uroven_septika"]?.state);
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  setConfig(config: SepticCardConfig) {
    if (!config.entity) throw new Error("Entity must be defined");
    this._config = config;
  }

  getCardSize(): number {
    return 1;
  }

  hass?: HomeAssistant;

  private _openDialog() {
    const dialog = document.createElement("gspeptik-dialogue") as GspeptikDialogueElement;
    dialog.hass = this.hass;
    dialog.entity = this._config!.entity;
    document.body.appendChild(dialog);
  }

  render() {
    const level = this.septicLevel;

    return html`
      <ha-card @click=${this._openDialog}>
        <h2>Септик</h2>
        <div class="tank-ball" style="--level:${level}">
          <div class="water"></div>
          <div class="center-label">${level}%</div>
        </div>
      </ha-card>
    `;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tile-card",
  name: "My Element",
  description: "Minimal Lit 3 card for Home Assistant",
});
