import ApexCharts from "apexcharts";
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";
import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

interface SepticCardConfig extends LovelaceCardConfig {
  entity: string;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
    }>;
  }
}
@customElement("donut-card")
export class SepticElement extends LitElement implements LovelaceCard {
  @state()
  private _config?: SepticCardConfig;
  private _chart?: ApexCharts;

  static styles = css`
    ha-card {
      padding: 16px;
      border: 1px solid gray;
    }
    .flex {
      display: flex;
    }
    statistic-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
      cursor: pointer;
      align-self: stretch;
      padding: 8px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 8px;
      background-color: var(--card-background-color);
    }
    .statistic-card:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `;

  private _renderChart() {
    const entityId = "sensor.uroven_zhidkosti_septika";
    const criticalId = "sensor.kriticheskii_uroven_septika";
    const oshibka_septika = "sensor.oshibka_septika";

    const stateObj = this.hass?.states?.[entityId];
    const criticalObj = this.hass?.states?.[criticalId];

    if (!stateObj || !criticalObj) return;

    const value = Number(stateObj.state);
    const critical = Number(criticalObj.state);

    if (Number.isNaN(value) || Number.isNaN(critical)) return;

    if (Number.isNaN(value)) return;

    const colorsArr = [];
    if (value > critical) {
      colorsArr.push("#e32636", "#007FFF");
    } else {
      colorsArr.push("#C5D0E6", "#007FFF");
    }

    const endColor = "#ffffff";

    const options = {
      chart: {
        type: "donut",
        height: 450,
      },

      series: [100 - value, value],
      labels: ["Свободно", "Заполнено"],
      states: {
        hover: {
          filter: {
            type: "darken",
          },
        },
      },
      colors: colorsArr,
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Состояние септика",
                formatter: () => `${this.hass?.states?.[oshibka_septika].state}`,
              },
              value: {
                show: true,
                formatter: (val: number) => `${val}%`,
              },
            },
          },
        },
      },

      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: [endColor, "#FFFFFF"],
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    };

    const el = this.shadowRoot?.getElementById("chart");
    if (!el) return;

    if (this._chart) {
      this._chart.destroy();
    }

    el.innerHTML = "";
    this._chart = new ApexCharts(el, options);
    this._chart.render();
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

  firstUpdated() {
    this._renderChart();
  }

  private _updateChart() {
    if (!this._chart) return;

    const entityId = "sensor.uroven_zhidkosti_septika";
    const stateObj = this.hass?.states?.[entityId];
    if (!stateObj) return;

    const value = Number(stateObj.state);
    if (Number.isNaN(value)) return;

    this._chart.updateSeries([value, 100 - value]);
  }

  updated(changedProps: PropertyValues) {
    if (changedProps.has("hass")) {
      this._updateChart();
    }
  }

  setConfig(config: SepticCardConfig) {
    if (!config.entity) throw new Error("Entity must be defined");
    this._config = config;
  }

  getCardSize(): number {
    return 1;
  }

  hass?: HomeAssistant;

  render() {
    if (!this._config) return html`<ha-card>Loading...</ha-card>`;

    const temperatura_septika = "sensor.temperatura_septika";
    const davlenie_septika = "sensor.davlenie_septika";
    const kriticheskii_uroven_septika = "sensor.kriticheskii_uroven_septika";
    const prevyshen_kriticheskii_uroven_septika = "sensor.prevyshen_kriticheskii_uroven_septika";
    return html`
      <ha-card>
        <h2>Септик</h2>
        <div class="flex">
          <div id="chart"></div>
          <statistic-box>
          <ha-card class="statistic-card" @click=${() => this._openMoreInfo(prevyshen_kriticheskii_uroven_septika)}>
              ${
                this.hass?.states?.[prevyshen_kriticheskii_uroven_septika].state === "Нет"
                  ? html`<good-value>Уровень септика не превышен</good-value> `
                  : html`<bad-value>Превышен уровень септика</bad-value>`
              }
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(kriticheskii_uroven_septika)}>
              Критический уровень септика:
              ${this.hass?.states?.[kriticheskii_uroven_septika].state} %
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(temperatura_septika)}>
              <ha-icon icon="mdi:thermometer"></ha-icon>
              ${
                Number(this.hass?.states?.[temperatura_septika].state) > 0
                  ? html`<good-value>+${this.hass?.states?.[temperatura_septika].state} &deg;C</good-value>`
                  : html`<bad-value>${this.hass?.states?.[temperatura_septika].state}&deg;C</bad-value>`
              }
            </ha-card>
            <ha-card class="statistic-card" @click=${() => this._openMoreInfo(davlenie_septika)}>
                <ha-icon icon="mdi:gauge"></ha-icon>
                ${this.hass?.states?.[davlenie_septika].state}
                mbar
            </ha-card>
          </div>
        </div>
      </ha-card>
    `;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "donut-card",
  name: "My Element",
  description: "Minimal Lit 3 card for Home Assistant",
});
