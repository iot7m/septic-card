# GSeptik

GSeptik is a set of custom Lovelace cards for **Home Assistant** designed to visualize septic tank data in a clear and intuitive way. The project focuses on visual level representation, not on historical charts or complex controls. The goal is to offer simple, readable, and domain-specific UI elements instead of generic gauges or charts.

GSeptik provides visual components to display:

- Septic tank fill level
- Critical level thresholds
- Related sensor data (temperature, pressure, errors)

## Installation

### HACS (planned)

HACS support is planned but not yet available.


### Manual installation

1. Download the latest `gseptik.js` file from the releases page.
2. Copy the file into your Home Assistant `www` directory:

   ```
   /config/www/gseptik/gseptik.js
   ```

3. Add the resource to Home Assistant:

#### Using UI
- Go to **Settings → Dashboards → Resources**
- Click **Add Resource**
- URL:
  ```
  /local/gseptik/gseptik.js
  ```
- Resource type: **JavaScript Module**

#### Using YAML
```yaml
resources:
  - url: /local/gseptik/gseptik.js
    type: module
```

## Usage

After installation, the cards will be available in the dashboard editor as:

- `Custom: GSeptik Tank Card`
- `Custom: GSeptik Column Card`

Each card is configured using YAML.

## Development

### Home Assistant server

```sh
npm run start:hass
```

Home Assistant will be available at http://localhost:8123

### Development server

```sh
npm install
npm start
```

Dev server runs on http://localhost:4000. To use it in Home Assistant, add resource to configuration.yaml:

```
frontend:
  themes: !include_dir_merge_named themes
  extra_module_url:
    - http://host.docker.internal:4000/gseptik.js
```


## Build

```sh
npm run build
```

Output:

```
dist/gseptik.js
```

## License

MIT
