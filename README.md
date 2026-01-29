# Septic

Septic is a set of custom Lovelace cards for **Home Assistant** designed to visualize septic tank data in a clear and intuitive way. The project focuses on visual level representation rather than historical charts or complex controls. The goal is to provide simple, readable, and domain-specific UI elements instead of generic gauges or charts.

Septic provides visual components to display:

- Septic tank fill level
- Critical level thresholds
- Related sensor data (temperature, pressure, errors)

![G-Septik](assets/septic.png)

## Table of contents

- [Installation](#installation)
  - [HACS installation](#hacs-installation)
  - [Manual installation](#manual-installation)
    - [Using the UI](#using-the-ui)
    - [Using YAML](#using-yaml)
- [Usage](#usage)
  - [Using the UI (Visual editor)](#using-the-ui-visual-editor)
  - [Using YAML (Raw configuration)](#using-yaml-raw-configuration)
- [Configuration](#configuration)
  - [Entities](#entities)
  - [Display options](#display-options)
  - [Example configuration](#example-configuration)
- [Development](#development)
  - [Build module](#build-module)
  - [Run development server](#run-development-server)
  - [Run Home Assistant server](#run-home-assistant-server)
  - [Configure Home Assistant server](#configure-home-assistant-server)
  - [Use ui-septic dashboard](#use-ui-septic-dashboard)
- [Release workflow](#release-workflow)

## Installation

### HACS installation

HACS support is in progress but not yet available.


### Manual installation

First, download the latest `septic-card.js` file from the releases page and copy it to your Home Assistant `www` directory: `/config/www/septic/septic-card.js`. Then add the resource to Home Assistant using one of the following methods.

#### Using the UI

1. Go to Settings → Dashboards → Resources
2. Click Add Resource
3. Set the URL to: `/local/septic/septic-card.js`
4. Select **JavaScript Module** as the resource type

#### Using YAML

Add the following to your Lovelace configuration:

```yaml
resources:
  - url: /local/septic/septic-card.js
    type: module
```

Restart the browser or clear cache if the card does not appear immediately.

## Usage

Septic cards can be added to a Home Assistant dashboard using either the visual editor (UI) or manual YAML configuration.

The following cards are available:
- **Septic Cistern Card** (`custom:septic-cistern-card`)
- **Septic Tile Card** (`custom:septic-tile-card`)
- **Septic Badge** (`custom:septic-badge`)

### Using the UI (Visual editor)

1. Open any dashboard in Home Assistant
2. Click **Edit dashboard**
3. Click **Add card**
4. Select **Manual card**
5. Paste the configuration below and save

Basic/Minimal? Example configuration:

```yaml
type: custom:septic-cistern-card
entities:
  level: uroven_zhidkosti_septika
  temp: temperatura_septika
  pressure: davlenie_septika
  x_level: kriticheskii_uroven_septika
  exceeds_x_level: prevyshen_kriticheskii_uroven_septika
  error_name: oshibka_septika
```

### Using YAML (Raw configuration)

If you are using dashboards in YAML mode, add the card configuration directly to your view definition:

```yaml
views:
  - title: Home
    cards:
      - type: custom:septic-cistern-card
        entities:
          level: uroven_zhidkosti_septika
          temp: temperatura_septika
          pressure: davlenie_septika
          x_level: kriticheskii_uroven_septika
          exceeds_x_level: prevyshen_kriticheskii_uroven_septika
          error_name: oshibka_septika
```

Save the dashboard configuration. The card will appear immediately after saving.

## Configuration

Display entities in a predefined logical order.
Use domain-specific icons.
Hide the error_name entity when no error is present.

This section describes all available configuration options for Septic cards. New parameters may be added in future versions.

### Entities

Each entity represents a specific septic tank parameter and may define a custom icon.

| Key | Entity example | Icon | Description |
|----|---------------|------|-------------|
| `level` | `sensor.uroven_zhidkosti_septika` | `mdi:water-percent` | Current septic tank fill level |
| `temp` | `sensor.temperatura_septika` | `mdi:thermometer` | Septic tank temperature |
| `pressure` | `sensor.davlenie_septika` | `mdi:gauge` | Internal pressure |
| `x_level` | `sensor.kriticheskii_uroven_septika` | `mdi:water-alert` | Critical level threshold |
| `exceeds_x_level` | `sensor.prevyshen_kriticheskii_uroven_septika` | `mdi:alert-octagon-outline` | Indicates critical level exceeded |
| `error_name` | `sensor.oshibka_septika` | `mdi:alert-circle-outline` | Error state or error description |

### Display options

The section specifies the properties of displaying entities on the card.

| Parameter | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `header` | object | ✖ | — | Card header configuration |
| `pressure` | object | ✖ | — | Pressure entity display options |
| `x_level` | object | ✖ | — | Critical level threshold display options |
| `level` | object | ✖ | — | Current level display options |
| `temp` | object | ✖ | — | Temperature display options |
| `exceeds_x_level` | object | ✖ | — | Critical level exceeded indicator options |
| `error_name` | object | ✖ | — | Error display options |

Header configuration

| Parameter | Type    | Required | Default | Description              |
| --------- | ------- | -------- | ------- | ------------------------ |
| `label`   | string  | ✖        | —       | Header text              |
| `show`    | boolean | ✖        | `false` | Show or hide card header |

Example:

```yaml
header:
  label: Septic system
  show: true
```

Entity display configuration

Each entity (pressure, level, temp, etc.) supports the same configuration options.

| Parameter | Type    | Required | Default        | Description       |
| --------- | ------- | -------- | -------------- | ----------------- |
| `show`| boolean | ✖ | `true`| Show or hide the entity |
| `label`| string| ✖ | entity friendly name | Custom label |
| `icon`| string| ✖ | card default icon | Custom icon |

Example:

```yaml
pressure:
  show: true
  label: Pressure
  icon: mdi:gauge
```

Error entity behavior (error_name)

The error_name entity has special behavior.

It is displayed only when an error is present, even if show is set to true.

The entity is automatically hidden when its state is:

- ok
- ок
- unknown
- unavailable

Example:

```yaml
error_name:
  show: true
  label: Error
  icon: mdi:alert-circle-outline

```

### Full example configuration

```yaml
type: custom:gseptik-cistern-card
entities:
  level: uroven_zhidkosti_septika
  temp: temperatura_septika
  pressure: davlenie_septika
  x_level: kriticheskii_uroven_septika
  exceeds_x_level: prevyshen_kriticheskii_uroven_septika
  error_name: oshibka_septika
header:
  show: true
  label: My Septic
level:
  show: true
  icon: mdi:water-percent
  label: Water level
temp:
  show: true
  label: Water temperature
  icon: mdi:coolant-temperature
pressure:
  show: true
  label: Water pressure
  icon: mdi:gauge
x_level:
  show: true
  label: Critical water level
  icon: mdi:water-alert
exceeds_x_level:
  show: true
  label: Exceeding the water level
  icon: mdi:alert-octagon-outline
error_name:
  show: true
  label: Error
  icon: mdi:alert-circle-outline
```

### Multiple cards

Multiple Septic cards can be used on the same dashboard:


```yaml
type: custom:gseptik-cistern-card
entities:
  level: uroven_zhidkosti_septika_1
  temp: temperatura_septika_1
  pressure: davlenie_septika_1
  x_level: kriticheskii_uroven_septika_1
  exceeds_x_level: prevyshen_kriticheskii_uroven_septika_1
  error_name: oshibka_septika_1
header:
  show: true
  label: My Septic 1

type: custom:gseptik-cistern-card
entities:
  level: uroven_zhidkosti_septika_2
  temp: temperatura_septika_2
  pressure: davlenie_septika_2
  x_level: kriticheskii_uroven_septika_2
  exceeds_x_level: prevyshen_kriticheskii_uroven_septika_2
  error_name: oshibka_septika_2
header:
  show: true
  label: My Septic 2
```
Each card operates independently.

### Notes

All configuration blocks are optional unless marked as Required

Unconfigured entities are automatically ignored

The card remains functional even if only level is provided

## Development

## Build module

Run the build process using the command `npm run build`. The compiled JavaScript module will be located in the `dist` directory.

### Run development server

Install Node.js dependencies using the command `npm install`. Start the development server with the command `npm start`. The development server runs at http://localhost:4000.

### Run Home Assistant server

Start the Home Assistant server using the command `npm run start:hass`. Home Assistant will be available at http://localhost:8123. The Home Assistant configuration includes the following module URL:


```
frontend:
  themes: !include_dir_merge_named themes
  extra_module_url:
    - http://localhost:4000/septic-card.js
```

This demo setup also uses REST sensors defined in `rests.yaml`. In `configuration.yaml` it is included as:


```
# Include extra configuration
rest: !include rests.yaml
```

The REST sensors use a public endpoint like `https://data.septic.ru/Api/public/v2/home-assistant/readings/<TOKEN>`. If you need your own token, you can get it from the Septic personal account at https://septic.ru/. The website also supports “login as guest” for a quick demo.

### Configure Home Assistant server

You can add the cards in two ways: using the UI or by editing Lovelace YAML. In UI mode, add a new card and choose Manual.  For YAML mode, select any dashboard, take control if necessary, open the Raw configuration editor (YAML mode), and add the cards to your view, for example:

```yaml
views:
  - path: default_view
    title: Home
    cards:
      - type: custom:septic-cistern-card
        entities:
          level: uroven_zhidkosti_septika
          temp: temperatura_septika
          pressure: davlenie_septika
          x_level: kriticheskii_uroven_septika
          exceeds_x_level: prevyshen_kriticheskii_uroven_septika
          error_name: oshibka_septika
      - type: custom:septic-tile-card
        entities:
          level: uroven_zhidkosti_septika
          temp: temperatura_septika
          pressure: davlenie_septika
          x_level: kriticheskii_uroven_septika
          exceeds_x_level: prevyshen_kriticheskii_uroven_septika
          error_name: oshibka_septika
```

Save the dashboard. If the development server is running on port 4000, the cards should render immediately using the live development build.


### Use ui-septic dashboard

To try the demo dashboard, [install HACS](https://blog.iot7m.ru/how-to-setup-hacs?utm_source=github&utm_medium=readme) in your Home Assistant config directory (`.hass`). After installing HACS, install the following frontend cards via HACS:
- card-mod
- gauge-card-pro
- stack-in-card

Then copy the contents of `.hass/ui-septic.yaml` and paste it into any dashboard using the Raw configuration editor (YAML mode).


## Release workflow

- update version in package.json and run npm run build
- add or update changelog files in docs (changelogs/vX.Y.Z)
- update version in antora.yml to the release version (vX.Y.Z)
- commit all changes to main and create release vX.Y.Z
- update antora.yml version in main to latest and push it
