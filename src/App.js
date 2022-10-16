import {  GiAbstract077 } from 'react-icons/gi';
import { BrowserRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Category from './components/Category';
import Search from './components/Search';
import Pages from './pages/Pages';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Nav>
          <GiAbstract077 />
          <Logo to={'/'} >
            Cook mee..
          </Logo>
        </Nav>
        <Search />
        <Category />
        <Pages />
        <Footer>- Made by <a href='https://www.linkedin.com/in/hunzala-mushtaq/'>Hunzala Mushtaq </a>❤️</Footer>
      </BrowserRouter>
    </div>
  );
}
const Logo = styled(Link)`
text-decoration: none;
font-size: 1.5rem;
font-weight: 400;
font-family: "Lobster Two" , cursive ;`
const Footer = styled.div`
margin-top: 6rem;
background: linear-gradient(65deg, #eecda3, #EF629F);
height: 3rem;
border-radius: 5rem 5rem 0rem 0rem;
text-align: center;
padding-top: 1rem;
font-size: 15px;
font-weight: 900;
font-family: inherit;
width: 100%;`
const Nav = styled.div`
padding: 4rem 0rem ; 
display: flex; 
justify-content: flex-start ; 
align-items: center; 
svg{
  font-size : 2rem ; 
}`


export default App;
