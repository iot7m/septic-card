import { LitElement, css, html } from "lit";

import { customElement, property } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

import { EntityCardConfig } from "@/types/cards";

import { CARD_PREFIX } from "@/const";

export const CARD_NAME = `${CARD_PREFIX}-cistern-card-editor` as const;

@customElement(CARD_NAME)
export class CisternCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) private _config!: EntityCardConfig;

  setConfig(config: EntityCardConfig) {
    this._config = {
      ...config,
      type: config.type ?? `custom:${CARD_NAME}`,
    };
  }

  private _valueChanged(ev: CustomEvent) {
    const value = ev.detail.value;

    this._config = {
      ...this._config,
      entity: value,
    };

    this._fireConfigChanged();
  }

  private _fireConfigChanged() {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    if (!this.hass) {
      return html`<p>HASS not loaded</p>`;
    }

    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${this._config.entity ?? ""}
        label="Основная сущность"
        @value-changed=${this._valueChanged}
      >
      </ha-entity-picker>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;
}
