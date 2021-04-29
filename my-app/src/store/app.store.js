import {createStore} from "redux"
import {rootReducer} from "../reducer/index.reducer"

 const store = createStore(rootReducer);

export default store