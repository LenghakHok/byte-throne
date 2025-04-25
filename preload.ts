import UnpluginTypia from "@ryoppippi/unplugin-typia/bun";
import { plugin } from "bun";

plugin(
  UnpluginTypia({
    /* options */
    tsconfig: "tsconfig.json",
    typia: {
      functional: true,
      undefined: true,
      finite: true,
    },
  }),
);
