import { useState, useEffect } from "react"
import style from './Home.module.css'


export default function Home() {

    const [showDropDown, setDropDown] = useState(false)
    const [query, setQuery] = useState('')
    const [result, setResult] = useState([])
    console.log('result', result)

    function fetchData(query) {

        if (!query) return

        fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
            .then(result => {
                if (!result.ok) {
                    throw new Error('nessun personaggio');
                }
                return result.json();
            })
            .then(data => {
                setResult(data.results)
                console.log('API')
            })
            .catch(err => console.error(err))
    }

    const handleChangeEvent = (e) => {
        const queryValue = e.target.value;
        setQuery(queryValue);
        setDropDown(queryValue.length > 0)
    };

    const handleClick = (e) => {
        setDropDown(false)
        setQuery(e.target.innerText)
    }

    useEffect(() => {
        fetchData(query);
    }, [query])

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