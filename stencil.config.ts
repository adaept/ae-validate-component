import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "aevalidatecomponent",
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www",
      serviceWorker: null
    }
  ]
};
