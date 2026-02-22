import { SepticCardConfig, SepticItemConfig, SepticTankConfig } from "@/types/cards";

/**
 * Merges a partial SepticItemConfig with its default values.
 *
 * @param value - Partial item config provided by the user
 * @param defaults - Fully resolved default item config
 * @returns Fully resolved item config with no undefined fields
 */
export function mergeItem(
  value: SepticItemConfig | undefined,
  defaults: SepticItemConfig | undefined,
): SepticItemConfig {
  return {
    show: value?.show ?? defaults?.show,
    icon: value?.icon ?? defaults?.icon,
    label: value?.label ?? defaults?.label,
  };
}

/**
 * Merges a partial SepticTankConfig with default tank config.
 *
 * @param tank - Partial tank config provided by the user
 * @param defaults - Fully resolved tank config
 * @returns Fully resolved tank config with header, level, and scale fields populated
 */
function mergeTank(tank: SepticTankConfig | undefined, defaults: SepticTankConfig | undefined): SepticTankConfig {
  return {
    header: {
      show: tank?.header?.show ?? defaults?.header?.show,
      label: tank?.header?.label ?? defaults?.header?.label,
    },
    level: {
      show: tank?.level?.show ?? defaults?.level?.show,
    },
    scale: {
      position: tank?.scale?.position ?? defaults?.scale?.position ?? "left",
    },
  };
}

/**
 * Resolves a partial SepticCardConfig into a fully normalized configuration.
 *
 * Applies defaults for missing fields and normalizes all tank/item configs.
 *
 * @param input - Partial card config provided by the user
 * @param defaults - Fully resolved default card config
 * @returns Fully resolved card config ready for runtime usage
 */
export function resolveConfig(input: SepticCardConfig, defaults: SepticCardConfig): SepticCardConfig {
  return {
    type: input.type ?? defaults.type,

    entities: input.entities ?? defaults.entities,

    tank: mergeTank(input.tank, defaults.tank),

    level: mergeItem(input.level, defaults.level),
    temp: mergeItem(input.temp, defaults.temp),
    pressure: mergeItem(input.pressure, defaults.pressure),
    x_level: mergeItem(input.x_level, defaults.x_level),
    exceeds_x_level: mergeItem(input.exceeds_x_level, defaults.exceeds_x_level),
    error_name: mergeItem(input.error_name, defaults.error_name),
  };
}
