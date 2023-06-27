import { compose,createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";

const loggerMiddelware = (store) => (next) => (action) => {
	if(!action.type) {
		return next(action)
	}
	next(action)
}
const middleWares = [loggerMiddelware];
const composeEnhancers = compose(applyMiddleware(...middleWares))
export const store = createStore(rootReducer, undefined, composeEnhancers);

