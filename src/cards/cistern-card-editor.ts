import { LitElement, css, html } from "lit";

import { customElement, property } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

import { EntityCardEditorConfig } from "@/types/cards";

import { CARD_PREFIX } from "@/const";

export const CARD_NAME = `${CARD_PREFIX}-cistern-card-editor` as const;

@customElement(CARD_NAME)
export class CisternCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false })
  private _config: EntityCardEditorConfig = {
    type: `custom:${CARD_NAME}`,
  };

  setConfig(config: EntityCardEditorConfig) {
    this._config = {
      ...config,
      type: config.type ?? `custom:${CARD_NAME}`,
    };
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
    if (!this.hass) return html``;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[
          {
            name: "entity",
            selector: { entity: {} },
          },
        ]}
        @value-changed=${this._formChanged}
      >
      </ha-form>
    `;
  }

  private _formChanged(ev: CustomEvent) {
    this._config = {
      ...this._config,
      ...ev.detail.value,
    };
    this._fireConfigChanged();
  }

  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;
}
