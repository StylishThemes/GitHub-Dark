import {base} from "stylelint-config-silverwind";

export default base({
  rules: {
    "at-rule-no-vendor-prefix": null,
    "selector-no-deprecated": [true, {ignoreSelectors: ["tt"]}],
  },
});
