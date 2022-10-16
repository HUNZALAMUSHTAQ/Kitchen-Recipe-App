import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function Recipe() {
    const params = useParams()
    const [details, setDetails] = useState('')
    const [active, setActive] = useState('instructions')
    const [labelData, setLabelData] = useState('')

    const fetchDetails = async (id) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}`)
        const detailData = await data.json()
        setDetails(detailData)
        setLabelData(`https://api.spoonacular.com/recipes/${id}/nutritionLabel.png?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}`) 
        
    }

    useEffect(() => {
        const id = params.name
        fetchDetails(id)
        console.log('Showing Details for the -> ', id)
    }, [params.name])
    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt='' />
                <br />
                <br />
                <h4>Nutritions Values :</h4>
                <br />
                <br />
                <img src={labelData} alt='Nutrition Values'/>
            </div>
            <FlexDiv>
            <Info>
                <Button className={active === 'instructions' ? 'active' : ''} onClick={() => setActive('instructions')}>Instructions</Button>
                <Button className={active === 'ingredients' ? 'active' : ''} onClick={() => setActive('ingredients')}>Ingredients</Button>
            </Info>
            {active === 'instructions' && (
                <div>
                    <h2>Summary:</h2>
                    <br />
                    <h3 dangerouslySetInnerHTML={{__html: details.summary}} ></h3>
                    <h2>Instructions:</h2>
                    <br />
                    <h3 dangerouslySetInnerHTML={{__html: details.instructions}} ></h3>

                </div>
            )}
            {active === 'ingredients' && (
                <>
                <h2>Ingredients :</h2>

                <ul>
                    {details.extendedIngredients.map((ingredients) =>(
                        <li key={ingredients.id}>{ingredients.original}</li>
                    ))}
                </ul>
                </>
            )}
            </FlexDiv>
        </DetailWrapper>
    )
}


const FlexDiv = styled.div`
margin-left: 5rem;
    display: flex;
    justify-content: flex-start;
    align-content: stretch;
    flex-direction: column;`
const DetailWrapper = styled.div`
margin-bottom: 5rem;
display: flex;

.active{
    background: linear-gradient(35deg, #494949, #393939 );
    color: white;
}
h2{
    margin-bottom: 2rem;

}
li{
    font-size: 1.2rem ;
    line-height: 2.5rem;

}
ul{
    margin-top: 2rem;

}
`

const Button = styled.button`
padding: 1rem 2rem;
color: #313131;
background: white; 
border: 2px solid black;
margin-right: 2rem ; 
font-weight: 600;`

const Info = styled.div`
display: flex;
margin-bottom: 2rem;
`
export default Recipe
