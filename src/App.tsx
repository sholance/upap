import { FC } from 'react'
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';



const App: FC = () => {
    return (
        <>
            <div className='App'>
                <Navbar />
                <Footer />
            </div>
        </>
    )
}

export default App