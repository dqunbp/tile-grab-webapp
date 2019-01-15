export const taskAppInitialState = {
  polygon: undefined
};

export const SET_POLYGON = "SET_POLYGON";
export const RESET_NEW_TASK = "RESET_NEW_TASK";

export const setPolygon = polygon => ({
  type: SET_POLYGON,
  polygon
});
export const resetNewTask = () => ({
  type: RESET_NEW_TASK
});

export function taskAppReducer(state, action) {
  switch (action.type) {
    case SET_POLYGON:
      const { polygon } = action;
      return {
        ...state,
        polygon
      };
    case RESET_NEW_TASK:
      return {
        ...state,
        polygon: undefined
      };

    default:
      return state;
  }
}
