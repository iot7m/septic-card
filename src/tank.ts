import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";
interface SepticCardConfig extends LovelaceCardConfig {
  entity: string;
}

@customElement("tank-card")
export class SepticElement extends LitElement implements LovelaceCard {
  @state()
  private _config?: SepticCardConfig;
  static styles = css`
    ha-card {
      padding: 16px;
    }

    .tank {
      position: relative;
      width: clamp(10rem, 15vw, 15rem);
      height: 100%;
      border: 2px solid #9e9e9e;
      border-radius: 8px;
      background: #dce1ea;
      overflow: hidden;
      box-sizing: border-box;
    }
    .fill {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0%;
      background: linear-gradient(#c5d0e6 5%, #007fff 95%);
      transition: height 0.6s ease;
      overflow: hidden;
    }

    @keyframes bubble {
      0% {
        bottom: -30%;
        opacity: 0;
        transform: translateX(0);
      }
      10% {
        opacity: 0.3;
      }
      100% {
        bottom: 100%;
        opacity: 0;
        transform: translateX(15px);
      }
    }

    @keyframes sideWays {
      0% {
        margin-left: 0px;
      }
      100% {
        margin-left: 20px;
      }
    }
    .bubble {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      position: absolute;
      background-color: white;
      bottom: -30%;
      opacity: 0.2;
      animation: bubble 10s ease-in-out infinite,
        sideWays 4s ease-in-out infinite alternate;
    }

    .bubble--1 {
      left: 10%;
      animation-delay: 0.5s;
      animation-duration: 16s;
      opacity: 0.2;
    }

    .bubble--2 {
      width: 15px;
      height: 15px;
      left: 40%;
      animation-delay: 1s;
      animation-duration: 10s;
      opacity: 0.1;
    }

    .bubble--3 {
      width: 10px;
      height: 10px;
      left: 30%;
      animation-delay: 5s;
      animation-duration: 20s;
      opacity: 0.3;
    }

    .bubble--4 {
      width: 25px;
      height: 25px;
      left: 40%;
      animation-delay: 8s;
      animation-duration: 17s;
      opacity: 0.2;
    }

    .tank.critical {
      background: #e32636;
    }

    .critical-line {
      position: absolute;
      width: 100%;
      border-top: 2px dashed #ff5252;
      left: 0;
    }

    .value-label {
      position: absolute;
      width: 100%;
      text-align: center;
      font-weight: bold;
      color: #000;
      bottom: 8px;
      pointer-events: none;
    }

    .flex {
      display: flex;
      gap: 10px;
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
      max-width: 12rem;
      cursor: pointer;
      align-self: stretch;
      padding: 8px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 10px;
      background-color: var(--card-background-color);
    }
    .statistic-card:last-child {
      margin-bottom: 0;
    }
    .statistic-card:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `;

  private get septicLevel() {
    const value = Number(
      this.hass?.states["sensor.uroven_zhidkosti_septika"]?.state
    );
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  private get criticalLevel() {
    const value = Number(
      this.hass?.states["sensor.kriticheskii_uroven_septika"]?.state
    );
    return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  }

  private renderTank() {
    const level = this.septicLevel;
    const critical = this.criticalLevel;
    const isCritical = level >= critical;
    const showBubbles = level > 10;

    return html`
      <div class="tank ${isCritical ? "critical" : ""}">
        <div class="fill" style="height: ${level}%">
          ${showBubbles
            ? html`
                <div class="bubble bubble--1"></div>
                <div class="bubble bubble--2"></div>
                <div class="bubble bubble--3"></div>
                <div class="bubble bubble--4"></div>
              `
            : null}
        </div>

        <div class="critical-line" style="bottom: ${critical}%"></div>

        <div class="value-label">Уровень септика: ${level}%</div>
      </div>
    `;
  }

  private _openMoreInfo(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      })
    );
  }

  firstUpdated() {
    this.renderTank();
  }

  setConfig(config: SepticCardConfig) {
    if (!config.entity) throw new Error("Entity must be defined");
    this._config = config;
  }

  getCardSize(): number {
    return 1;
  }

  hass?: any;

  render() {
    if (!this._config) return html`<ha-card>Loading...</ha-card>`;
    const uroven_zhidkosti_septika = "sensor.uroven_zhidkosti_septika";
    const temperatura_septika = "sensor.temperatura_septika";
    const davlenie_septika = "sensor.davlenie_septika";
    const kriticheskii_uroven_septika = "sensor.kriticheskii_uroven_septika";
    const prevyshen_kriticheskii_uroven_septika =
      "sensor.prevyshen_kriticheskii_uroven_septika";
    const stateObj = this.hass?.states?.[uroven_zhidkosti_septika];
    const value = stateObj ? stateObj.state : "unknown";
    return html`
      <ha-card>
        <h2>Септик</h2>
        <div class="flex">
        <div>
          ${this.renderTank()}
        </div>
          <statistic-box>
          <ha-card class="statistic-card" @click=${() =>
            this._openMoreInfo(prevyshen_kriticheskii_uroven_septika)}>
              ${this.hass?.states?.[prevyshen_kriticheskii_uroven_septika]
                  .state === "Нет"
                  ? html`<good-value>Уровень септика не превышен</good-value> `
                  : html`<bad-value>Превышен уровень септика</bad-value>`
              }
            </ha-card>
            <ha-card class="statistic-card" @click=${() =>
              this._openMoreInfo(kriticheskii_uroven_septika)}>
              Критический уровень септика:
              ${this.hass?.states?.[kriticheskii_uroven_septika].state} %
            </ha-card>
            <ha-card class="statistic-card" @click=${() =>
              this._openMoreInfo(temperatura_septika)}>
              <ha-icon icon="mdi:thermometer"></ha-icon>
              ${this.hass?.states?.[temperatura_septika].state > 0
                  ? html`<good-value
                      >+${this.hass?.states?.[temperatura_septika].state}
                      &deg;C</good-value
                    >`
                  : html`<bad-value
                      >${this.hass?.states?.[temperatura_septika]
                        .state}&deg;C</bad-value
                    >`
              }
            </ha-card>
            <ha-card class="statistic-card" @click=${() =>
              this._openMoreInfo(davlenie_septika)}>
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

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "tank-card",
  name: "My Element",
  description: "Minimal Lit 3 card for Home Assistant",
});
