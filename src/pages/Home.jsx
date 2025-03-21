import { useState } from "react"
import style from './Home.module.css'


export default function Home() {

    const [showDropDown, setDropDown] = useState(false)
    const [query, setQuery] = useState('')
    const [result, setResult] = useState([])
    console.log('result', result)

    function fetchData(query) {

        fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
            .then(result => result.json())
            .then(data => {
                setResult(data.results)
                console.log(data.results)
            })
            .catch(err => console.error(err))
    }

    const handleChangeEvent = (e) => {
        const queryValue = e.target.value;
        setQuery(queryValue);

        // Verifica si hay texto en el query
        if (queryValue) {
            setDropDown(true); // Muestra el dropdown
            fetchData(queryValue); // Realiza la búsqueda
        } else {
            setDropDown(false); // Oculta el dropdown si no hay texto
            setResult([]); // Limpia los resultados
        }
    };

    const handleClick = (e) => {
        setDropDown(false)
        setQuery(e.target.innerText)
        fetchData(e.target.innerText)
    }

    return (
        <div className={style.boxInput}>

            <input
                type="text"
                placeholder='cerca'
                value={query}
                onChange={handleChangeEvent}
            />

            {showDropDown && result.length > 0 ? (

                <ul className={style.dropdown}>
                    {result.map(el => (
                        <li
                            onClick={handleClick}
                            className={style.dropdownItem}
                            key={el.id}> {el.name}
                        </li>
                    ))}

                </ul>

            ) : (<div> Nessun risultato </div>)}



        </div>

    )
}