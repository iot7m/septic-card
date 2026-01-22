import { LitElement, css, html } from "lit";

import { customElement } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

import { GSpepticCardEditorConfig } from "@/types/cards";

import { CISTERN_CARD_EDITOR_NAME, CISTERN_CARD_NAME } from "@/const";

@customElement(CISTERN_CARD_EDITOR_NAME)
export class CisternCardEditor extends LitElement implements LovelaceCardEditor {
  private _config: GSpepticCardEditorConfig = {
    type: `custom:${CISTERN_CARD_EDITOR_NAME}`,
  };
  private _hass?: HomeAssistant;

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
  }

  public get hass(): HomeAssistant {
    return this._hass!;
  }

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
      type: config.type ?? `custom:${CISTERN_CARD_NAME}`,
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
    if (!this._config || !this._hass) return html``;

    return html`
      <ha-form
        .hass=${this._hass}
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
      type: `custom:${CISTERN_CARD_NAME}`,
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
