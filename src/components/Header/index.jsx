
import React from 'react';
import * as S from './Header.styles';
import { useHistory } from 'react-router';
import logo from '../../assets/resilia.jpeg';

const Header = () => {
    const history = useHistory()
    return (
        <>
        <S.Header>
            <img src={logo} />  
            <S.Link onClick={() => history.push('/estudantes')}>Estudante</S.Link>
            <S.Link onClick={() => history.push('/computadores')}>Computadores</S.Link>
            <S.Link onClick={() => history.push('/emprestimos')}>Emprestimos</S.Link>
        </S.Header>
            
        </>
    )
}

export default Header
