import { Splide, SplideSlide } from '@splidejs/react-splide'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Popular() {
    const [popular, setPopular] = useState([])

    useEffect(() => {
        getPopular()

    }, [])


    const getPopular = async () => {
        const check = localStorage.getItem("popular")
        console.log(check)
        if (check) {
            setPopular(JSON.parse(check))
        } else {
            const apiKey = process.env.REACT_APP_RECIPE_API_KEY
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`)
            const data = await api.json()
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes)
            console.log(apiKey)
        }
    }
    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide options={{
                    perPage: 4,
                    breakpoints: {
                        1980: {
                            perPage: 4,

                        },
                        1024: {
                            perPage: 3,

                        },
                        948: {
                            perPage: 2,

                        },
                        640: {
                            perPage: 1,

                        }
                    },
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem'
                }}>
                    {popular?.map((recipe) => {
                        return (

                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Gradient>
                                        <Link to={`/recipe/${recipe.id}`} >
                                            <p>{recipe.title}</p>
                                            <img src={recipe.image} alt={recipe.title} />
                                        </Link >
                                    </Gradient>
                                </Card>

                            </SplideSlide>
                        )
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
margin: 4rem 0rem`
const Card = styled.div`
min-height: 20rem;
border-radius: 2rem;
overflow : hidden;
position : relative; 
img {
    border-radius: 2rem;
    position : absolute;
    left:0 ; 
    width :100%;
    height: 100%; 
    object-fit: cover;
}
p{
    position : absolute; 
    z-index: 10; 
    left: 50%;
    bottom: 0%;
    transform: translate(-50%,0%);
    color:white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`
const Gradient = styled.div`
z-index: 3;
postion: absolute;
width: 100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`
export default Popular
