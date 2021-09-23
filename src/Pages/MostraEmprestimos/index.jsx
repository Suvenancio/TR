import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import * as S from './MostraEmprestimos.styles';


const MostraEmprestimos = () => {
    const history = useHistory()
    const [api, setApi] = useState([]);
    const [ apiChegou, setApichegou] = useState(false);


     useEffect(() => {
      fetch('https://blooming-tundra-90089.herokuapp.com/emprestimos')
      .then(res => res.json())
      .then(
          (result) => {
              setApi(result)
              setApichegou(true)
          })
     }, []);

     const exclui = async (id) => {
        await fetch(
          `https://blooming-tundra-90089.herokuapp.com/emprestimos/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Access-Control-Allow-Origin':
                'https://blooming-tundra-90089.herokuapp.com/emprestimos',
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
          }
        );
        setTimeout(function() {
          history.push('/emprestimos')
        }, 3000)
      };


    return (
        <>
      <S.Body>
        <S.Container>
          <S.Menu>
            <h1>Empréstimos</h1>
            <Button onClick={() => history.push('/novoemprestimo')}>Cadastrar Empréstimo</Button> 
            <S.Tabela>
              <p>MATRICULA ESTUDANTE</p>
              <p>NÚMERO DO PATRIMÔNIO</p>
              <p>INíCIO DO EMPRÉSTIMO</p>
              <p>FIM DO EMPRÉSTIMO</p>
          </S.Tabela>
          </S.Menu>
      {
        !!api && apiChegou ? (
            api.map((item) => {
                 return  <S.Tabela>
                    <div>{item.MATRICULA_ESTUDANTE}</div>
                    <div>{item.NUM_PATRIMONIO_COMPUTADOR}</div>
                    <div>{item.INICIO_EMPRESTIMO}</div>
                    <div>{item.FIM_EMPRESTIMO}</div> 
                   <S.Btn> 
                    <Button  variant="danger" size="sm" onClick={() => exclui(item.ID)}>Excluir</Button>
                    <Link to={'/editaemprestimo/' + item.ID} >
                      <Button variant="warning" size="sm">Editar</Button>
                        </Link>   
                  </S.Btn>
                
                </S.Tabela>    
                                 
                })
            ) : (null)
            }
               
        </S.Container>
        </S.Body>
           
        </>
    )
}

export default MostraEmprestimos 
