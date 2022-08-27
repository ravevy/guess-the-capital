import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios";

const ListContext = createContext();

export const ListProvider = ({children}) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [countryList, setCountryList] = useState()


  useEffect(() => {
    axios
    .get("https://restcountries.com/v2/all?fields=name,capital")
    .then(res => setData(res.data.filter(data => data.capital)))
    .catch((e)=>{console.log(e)})
    .finally(()=>{setLoading(false)})
  }, [])

  useEffect(()=>{
    if(data){
    const countries = data.filter((data)=>{return data.name.length < 23})
    const countryList = []
    const capitalList = data.map((data)=>{return data.capital})
  
    for(let i = 0; countryList.length < 10; i++){
      let newItem = countries[Math.floor(Math.random()*countries.length)]
      if(!countryList.includes(newItem)){
        countryList.push({name: newItem.name, capitals: [newItem.capital], correct: newItem.capital})
      }
    }
  
    countryList.forEach((data)=>{
      for(let i = 0; i < 3; i++){
        let spareCapital = capitalList[Math.floor(Math.random()*capitalList.length)]
        if(!data.capitals.includes(spareCapital)){
          data.capitals.push(spareCapital)
        }
        else{
          i--
        }
      }
      data.capitals.sort(() => Math.random() - 0.5)
    })

    setCountryList(countryList)}
  }, [data])

  const values = {data, setData, loading, setLoading, countryList}
 
  return <ListContext.Provider value={values}>{children}</ListContext.Provider>
}

export const useList = () => useContext(ListContext)
