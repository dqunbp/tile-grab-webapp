export const taskAppInitialState = {
  polygon: undefined,
  geoJson: undefined
};

export const SET_POLYGON = "SET_POLYGON";
export const SET_GEOJSON = "SET_GEOJSON";
export const RESET_NEW_TASK = "RESET_NEW_TASK";
export const RESET_ALL = "RESET_ALL";

export const setPolygon = polygon => ({
  type: SET_POLYGON,
  polygon
});
export const setGeoJson = geoJson => ({
  type: SET_GEOJSON,
  geoJson
});
export const resetNewTask = () => ({
  type: RESET_NEW_TASK
});
export const resetAll = () => ({
  type: RESET_ALL
});

export function taskAppReducer(state, action) {
  switch (action.type) {
    case SET_POLYGON:
      const { polygon } = action;
      return {
        ...state,
        polygon
      };
    case SET_GEOJSON:
      const { geoJson } = action;
      return {
        ...state,
        geoJson
      };
    case RESET_NEW_TASK:
      return {
        ...state,
        polygon: undefined
      };
    case RESET_ALL:
      return {
        ...taskAppInitialState
      };

    default:
      return state;
  }
}
