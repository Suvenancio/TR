import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import * as S from './MostraEstudante.styles';
import { useHistory, Link } from 'react-router-dom';


const MostraEstudante = () => {
  const [api, setApi] = useState([]);
  const [ apiChegou, setApichegou] = useState(false);
  const history = useHistory();

     useEffect(() => {
      fetch('https://blooming-tundra-90089.herokuapp.com/estudantes')
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result)
              setApi(result)
              setApichegou(true)
          })
     }, []);

     const exclui = async (matr) => {
      await fetch(
        `https://blooming-tundra-90089.herokuapp.com/estudantes/${matr}`,
        {
          method: 'DELETE',
          headers: {
            'Access-Control-Allow-Origin':
              'https://blooming-tundra-90089.herokuapp.com/estudantes=',
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
        }
      );
    };


    return (
        <>
    
        <S.Body>
           <S.Container>
            <S.Menu>
              
            <h1>Estudantes</h1>
            <Button onClick={() => history.push('/novoestudante')}>Cadastrar Estudante</Button>   
          <S.Tabela>
              <p> MATRICULA</p>
              <p>  NOME</p>
              <p> EMAIL</p>
              <p> NASCIMENTO</p>
          </S.Tabela>
          </S.Menu>
           {!!api && apiChegou ? (
              api.map((item,i) => {
                  return <S.Tabela>      
                    
                    <div>{item.MATRICULA}</div>
                    <div>{item.NOME}</div>
                    <div> {item.EMAIL}</div>
                    <div> {item.DATA_DE_NASCIMENTO} </div>                      
                    <S.Btn>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => exclui(item.MATRICULA)}>Excluir</Button>
                      <Link to={'/editaestudante/' + item.MATRICULA} >
                        <Button
                          variant="warning" 
                          size="sm"
                        >Editar</Button>
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

export default MostraEstudante
