import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"

function Cuisine() {
    const params = useParams()
    const [cuisine, setCuisine] = useState([])

    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${name}&apiKey=${process.env.REACT_APP_RECIPE_API_KEY}`)
        const recipe = await data.json()
        setCuisine(recipe.results)
        console.log(recipe)
    }
    useEffect(() => {
        const cuisine_type = params.type
        getCuisine(cuisine_type)
    }, [params.type])

    return (
        <Grid
        animate={{opacity: 1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition= {{duration:0.5}}
        >
            {
                cuisine.map(item =>(
                    <Card key={item.id}>
                        <Link to={`/recipe/${item.id}`} >
                        <img src={item.image} alt="" />
                        <h4>{item.title}</h4>
                        </Link>
                    </Card>
                ))
            }
        </Grid>
    )
}

const Grid = styled(motion.div)`
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

export default Cuisine
