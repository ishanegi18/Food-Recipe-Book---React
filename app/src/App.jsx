import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResults/SearchResult';


export const BASE_URL = 'http://localhost:9000';

const App = () => {

const [data, setdata] = useState(null)
const[filteredData, setfilteredData] = useState(null)
const [loading, setloading] = useState(false)
const [error, seterror] = useState(null)
const[selectBtn, setselectedBtn] = useState("all")




useEffect(()=>{
const fetchFoodData = async() =>{
  setloading(true)
  try{

const response = await fetch(BASE_URL)
  const json = await response.json()
 // console.log(json)
  setdata(json);
  setfilteredData(json)
   setloading(false);
  }
  catch(error){
seterror("Unable to fetch data")

  }
  
}

fetchFoodData()
},[])


const searchFood = (e) =>{
  const searchValue = e.target.value;
  console.log(searchValue)
  if (searchValue === ""){
    setfilteredData(null);
  }
  const filter = data?.filter((food) =>
    food.name.toLowerCase().includes(searchValue.toLowerCase())
);
  setfilteredData(filter);
}

const filterFood =(type) =>{
if(type === "all"){
  setfilteredData(data)
  setselectedBtn("all")
  return

}
 const filter = data?.filter((food) =>
    food.type.toLowerCase().includes(type.toLowerCase())
);
setfilteredData(filter)
setselectedBtn(filter)

}

if (error) return <div>{error}</div>
if (loading) return <div>leading....</div>

  return (

<>
  <Container>
      <TopContainer>
        <div className="logo">
             <img src="./logo.png" alt="logo" width="200px"/>
        </div>
        <div className="search">
          <input onChange={searchFood} type="text" placeholder='Search Your Recipe' />
        </div>
      </TopContainer>
      <FilterContainer>
    <Button onClick={() => filterFood("all")}>All</Button>
    <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
  <Button onClick={() => filterFood("lunch")}>Lunch</Button>
    <Button onClick={() => filterFood("dinner")}> Dinner</Button>
      </FilterContainer>

    
    </Container>
      <SearchResult data={filteredData}/>
</>

  
  )
}

export default App


export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;

    /* background-color: #ECE5DA; */
    /* background-color: #ECE5DA; */



`;
const TopContainer = styled.section`

   min-height: 140px;
   display: flex;
   justify-content: space-between;
   padding: 16px;
   align-items: center;


  .search{
    input{
      background-color: transparent;
      border: 2px solid #000;
      color: #0b0b0b;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      width: 200px;
    }
  }
`;


const FilterContainer= styled.section`
    display: flex;
    justify-content: center;
    gap:12px;
    padding-bottom: 40px;

`;

export const Button= styled.button`
 background-color: #000;
 border: none;
 border-radius: 3px;
 padding: 8px 15px;
 color: #fff;
  &:hover{
    background-color: #944B2C;
    color: #fff;
    cursor: pointer;
  }
`;

