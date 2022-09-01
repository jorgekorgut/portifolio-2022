import "../pages_css/loading.css"
import "../assets/js/transition";
import Transitions from "../assets/js/transition";

export function Loading() {
    return <Transitions className="transition">
        <div className="circular_wrapper">
            <div className="sphere"></div>
            <h1>Loading ...</h1>
        </div>
    </Transitions>

}