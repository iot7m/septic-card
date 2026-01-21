export type HassState = {
  state: string;
  attributes?: {
    unit_of_measurement?: unknown;
    friendly_name?: unknown;
    [key: string]: unknown;
  };
};
