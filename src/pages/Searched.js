import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([])
    const params = useParams();

    useEffect(()=>{
      getSearched(params.search)
      console.log(params.search)
      console.log(searchedRecipes)
  },[params.search])

    const getSearched = async (name) =>{
        console.log('api search for ', name)
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${process.env.REACT_APP_RECIPE_API_KEY}`)
        const recipes = await data.json()
        setSearchedRecipes(recipes.results)
    }

  return (
    <div>
        <p>You Searched for '{params.search}' </p>
       
       <br />
       {
        searchedRecipes? <Grid>
            {searchedRecipes.length>0? searchedRecipes.map((item)=>{
                return(
                    <Card key={item.id} >
                        <Link to={`/recipe/${item.id}`} >
                        <img src={item.image} alt='' />
                        <h4> {item.title}</h4>
                        </Link>
                    </Card>
                )
            }):<>No Results Found</>}
        </Grid>: <TokenTimeOutError />
       }
    </div>
  ) 
}


function TokenTimeOutError() {
  return (
    <div>
      Token reached out of limit
    </div>
  )
}


const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit,minmax(20rem, 1fr));
grid-gap: 3rem;`

const Card = styled.div`
img{
    width: 100%;
    border-radius: 2rem;

}
a{
    text-decoration: none ; 

}
h4{
    text-align: center;
    padding: 1rem ; 
}`

export default Searched
