import {Routes, Route} from 'react-router-dom'
import {Home} from './pages/home'
import {SignIn} from './pages/signin'
import {SignUp} from './pages/signup'

export default function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/create" element={<SignUp />} />
        </Routes>
    )
}