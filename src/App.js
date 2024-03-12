import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import User from "./components/User/User";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className='content'>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/user/:username" element={<User/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
