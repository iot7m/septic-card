import { LitElement, css, html } from "lit";

import { customElement } from "lit/decorators.js";

import { SpepticCardEditorConfig } from "@/types/cards";
import type { HomeAssistant, LovelaceCardEditor } from "@/types/hass";

import { localize } from "@/utils/localize";

import { TANK_CARD_EDITOR_NAME, TANK_CARD_NAME } from "@/const";

@customElement(TANK_CARD_EDITOR_NAME)
export class TankCardEditor extends LitElement implements LovelaceCardEditor<SpepticCardEditorConfig> {
  private _config: SpepticCardEditorConfig = {
    type: `custom:${TANK_CARD_EDITOR_NAME}`,
  };
  private _hass?: HomeAssistant;

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();
  }

  public get hass(): HomeAssistant {
    return this._hass!;
  }

  private get _schema() {
    if (!this._hass) return [];

    const lang = this._hass.language;

    return [
      {
        name: "level",
        label: localize("card.entities.level", lang),
        selector: {
          entity: {},
        },
      },
      {
        name: "temp",
        label: localize("card.entities.temp", lang),
        selector: {
          entity: {},
        },
      },
      {
        name: "pressure",
        label: localize("card.entities.pressure", lang),
        selector: {
          entity: {},
        },
      },
      {
        name: "x_level",
        label: localize("card.entities.x_level", lang),
        selector: {
          entity: {},
        },
      },
      {
        name: "exceeds_x_level",
        label: localize("card.entities.exceeds_x_level", lang),
        selector: {
          entity: {},
        },
      },
      {
        name: "sdt",
        label: localize("card.entities.sdt", lang),
        selector: {
          entity: {},
        },
      },
      {
        name: "error_name",
        label: localize("card.entities.error_name", lang),
        selector: {
          entity: {},
        },
      },
    ];
  }

  setConfig(config: SpepticCardEditorConfig) {
    this._config = {
      ...config,
      type: config.type ?? `custom:${TANK_CARD_NAME}`,
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
      type: `custom:${TANK_CARD_NAME}`,
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
