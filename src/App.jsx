import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
import LoginPage from './pages/Login'
import RegistrationForm from './pages/Registration'
import Footer from './components/Footer'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/*" element={<Home />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<RegistrationForm />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App
