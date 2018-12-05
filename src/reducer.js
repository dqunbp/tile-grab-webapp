export const taskAppInitialState = {
  newTask: undefined,
  polygon: undefined
};

export const SET_NEW_TASK = "SET_NEW_TASK";
export const SET_POLYGON = "SET_POLYGON";
export const RESET_NEW_TASK = "RESET_NEW_TASK";

export const setNewTask = newTask => ({
  type: SET_NEW_TASK,
  newTask
});
export const setPolygon = polygon => ({
  type: SET_POLYGON,
  polygon
});
export const resetNewTask = () => ({
  type: RESET_NEW_TASK
});

export function taskAppReducer(state, action) {
  switch (action.type) {
    case SET_NEW_TASK:
      const { newTask } = action;
      console.log(action);
      return {
        ...state,
        newTask: {
          ...state.newTask,
          ...newTask
        }
      };
    case SET_POLYGON:
      const { polygon } = action;
      console.log(action);
      return {
        ...state,
        polygon
      };
    case RESET_NEW_TASK:
      console.log(action);
      return {
        ...state,
        newTask: undefined,
        polygon: undefined
      };

    default:
      return state;
  }
}
