import Action from './action';

export const importSVG = Action.createSync((svgFile) => {
  return {svgFile: svgFile};
});
