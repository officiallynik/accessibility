import axs from "accessibility-developer-tools/dist/js/axs_testing";

import $ from "jquery";
import error from '../../utils/error';
import snippet from '../../utils/snippet';
import fix from '../../utils/fix';

const ContrastPlugin = () => {
  var errors = [];

  let suggestedColors = (requiredRatio, bgColor, fgColor) => axs.color.suggestColors(
    bgColor,
    fgColor,
    { AA: requiredRatio }).AA;


  $("*").each((i, el) => {
    if (!axs.properties.hasDirectTextDescendant(el)) {
      return;
    }

    if (
      axs.utils.elementIsTransparent(el) ||
      axs.utils.elementHasZeroArea(el)
    ) {
      return;
    }

    let style = getComputedStyle(el);
    let bgColor = axs.utils.getBgColor(style, el);
    let fgColor = axs.utils.getFgColor(style, el, bgColor);
    let contrastRatio = axs.color
      .calculateContrastRatio(fgColor, bgColor)
      .toFixed(2);

    let requiredRatio = axs.utils.isLargeFont(style) ? 3.0 : 4.5;
    if (contrastRatio < requiredRatio) {
      let fixObj= {
        suggestedFgColorHex: `Suggested FgColor in Hex: ${suggestedColors(requiredRatio, bgColor, fgColor).fg}`,
        suggestedBgColorHex: `Suggested BgColor in Hex: ${suggestedColors(requiredRatio, bgColor, fgColor).bg}`,
        suggestedColorsRatio: `Suggested Color Ratio: ${suggestedColors(requiredRatio, bgColor, fgColor).contrast}`
      }

      errors.push({
        rule: 'WCAG 2.1: 1.4.11 & WCAG 2.0: 1.4.3',
          error: error(`Contrast Ratio Required is not Satisfied, Required: ${requiredRatio}, Found: ${contrastRatio}`),
          snippet: snippet(el.outerHTML),
          fix: fix(fixObj)
      })
    }
  });
  return errors;
};

export { ContrastPlugin };
