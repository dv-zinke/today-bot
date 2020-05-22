import {Content} from "./Content";
import {Weather} from "./Weather";

export interface PostData {
    Blog?:[Content],
    News?:String,
    Weather?:Weather
}