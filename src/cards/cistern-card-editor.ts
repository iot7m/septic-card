import { LitElement, css, html } from "lit";

import { customElement, property } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

import { GSpepticCardEditorConfig } from "@/types/cards";

import { CARD_PREFIX } from "@/const";

export const CARD_NAME = `${CARD_PREFIX}-cistern-card-editor` as const;

@customElement(CARD_NAME)
export class CisternCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false })
  private _config: GSpepticCardEditorConfig = {
    type: `custom:${CARD_NAME}`,
  };

  private _schema = [
    {
      name: "level",
      label: "Показатель уровня жидкости",
      selector: {
        entity: {},
      },
    },
    {
      name: "temp",
      label: "Показатель температуры",
      selector: {
        entity: {},
      },
    },
    {
      name: "pressure",
      label: "Показатель давления",
      selector: {
        entity: {},
      },
    },
    {
      name: "x_level",
      label: "Критический уровень",
      selector: {
        entity: {},
      },
    },
    {
      name: "exceeds_x_level",
      label: "Флаг превышения уровня",
      selector: {
        entity: {},
      },
    },
    {
      name: "error_name",
      label: "Сенсор ошибки",
      selector: {
        entity: {},
      },
    },
  ];

  setConfig(config: GSpepticCardEditorConfig) {
    this._config = {
      ...config,
      type: config.type ?? `custom:${CARD_PREFIX}-cistern-card`,
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
        .data=${this._config.entities}
        .schema=${this._schema}
        @value-changed=${this._formChanged}
      >
      </ha-form>
    `;
  }

  private _formChanged(ev: CustomEvent) {
    this._config = {
      ...this._config,
      type: `custom:${CARD_PREFIX}-cistern-card`,
      entities: {
        ...this._config.entities,
        ...ev.detail.value,
      },
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
