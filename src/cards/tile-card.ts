import { LitElement, css, html } from "lit";

import { customElement } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

import type { GSeptikCardConfig } from "@/types/cards";

import { assertAllEntities } from "@/utils/asserts";
import { getCriticalLevel } from "@/utils/extractors";

import { GSEPTIK_DIALOGUE_NAME, TILE_CARD_NAME } from "@/const";

interface GspeptikDialogueElement extends HTMLElement {
  _hass?: HomeAssistant;
  entity: string;
}

@customElement(TILE_CARD_NAME)
export class TileCard extends LitElement implements LovelaceCard {
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

  private _openDialog() {
    if (!this._config?.entity) {
      return;
    }

    const dialog = document.createElement(GSEPTIK_DIALOGUE_NAME) as GspeptikDialogueElement;

    dialog._hass = this._hass;
    dialog.entity = this._config.entity;

    document.body.appendChild(dialog);
  }

  render() {
    if (!this._config || !this._hass) return html``;

    const criticalLevel = getCriticalLevel(this._hass, this._config!.entities.x_level);

    return html`
      <ha-card @click=${this._openDialog}>
        <h2>Септик</h2>
        <div class="tile" style="--level:${criticalLevel}">
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

    .tile {
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
  type: TILE_CARD_NAME,
  name: "G-Septik Tile",
  description: "Compact tile card for G-Septik septic sensor",
});
