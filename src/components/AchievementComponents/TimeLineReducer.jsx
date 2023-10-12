const { createContext } = require("react");

// const structure = {
//     id:12,
//     date:"date obj",
//     title:'title',
//     description:'description'
// }
export const ADD_TIMELINE = "ADD_TIMELINE";
export const REMOVE_TIMELINE = "REMOVE_TIMELINE";
export const UPDATE_TIMELINE = "UPDATE_TIMELINE";
const timeLineReducer = (state, action) => {
  switch (action.type) {
    case "SET_TIMELINE":
      const newInitState = action.payload;
      newInitState.sort(sortItemsFromTheirDate);
      console.log(newInitState);
      return newInitState;
    case "ADD_TIMELINE":
      const newState = [
        ...state,
        { ...action.payload, id: getNextIdForItem(state) },
      ];
      console.log("new state: ", newState);
      newState.sort(sortItemsFromTheirDate);
      return newState;
    case "REMOVE_TIMELINE":
      return state.filter((i) => i.id !== action.payload);

    case "UPDATE_TIMELINE":
      const existingStateIndex = state.findIndex(
        (a) => a.id === action.payload.id
      );
      if (existingStateIndex < 0)
        throw new Error("Timeline item not found to update");
      state[existingStateIndex] = action.payload;
      return [...state.sort(sortItemsFromTheirDate)];
  }
};

const sortItemsFromTheirDate = (a, b) => {
  if (a.date < b.date) return -1;
  if (a.date === b.date) return 0;
  else return +1;
};

const getNextIdForItem = (items = []) => {
  if (items.length === 0) return 1;
  const item = items.map((i) => i.id).sort()[items.length - 1];
  console.log("item: ", item);
  return item + 1;
};

const TimeLineContext = createContext(null);

export default timeLineReducer;
export { TimeLineContext };
