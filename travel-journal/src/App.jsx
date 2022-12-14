import './App.scss'
import Card from './components/Card/Card.jsx'
import Header from './components/Header/Header.jsx'
import data from './data/locations.js'

const App = () => {
    
    return (
        <>
            <Header/>

            <main className="articlesContainer">
                {
                    data.map((item, index) => {
                        return (
                            <Card key={index} item={item}/>
                        )
                    })
                }
            </main>

        </>
    )

}

export default App
