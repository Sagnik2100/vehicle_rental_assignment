import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import NameScreen from '../pages/NameScreen';
import WheelsScreen from '../pages/WheelScreen';
import TypeScreen from '../pages/TypeScreen';
import ModelScreen from '../pages/ModelScreen';
import DateScreen from '../pages/DateScreen';
import ReviewScreen from '../pages/ReviewScreen';


export default function AppRouter(){
    return (
        <Router>
            <Routes>
                <Route path = "/" element={<NameScreen/>}/>
                <Route path = "/wheels" element={<WheelsScreen/>}/>
                <Route path = "/type" element={<TypeScreen/>}/>
                <Route path = "/model" element={<ModelScreen/>}/>
                <Route path = "/date" element={<DateScreen/>}/>
                <Route path = "/review" element={<ReviewScreen/>}/>
            </Routes>
        </Router>
    )
}