import { useState, useEffect } from 'react';
import * as S from './MostraComputadores.styles';
import Button from 'react-bootstrap/Button'
import { useHistory, Link } from 'react-router-dom';


const MostraComputadores = () => {
  const [api, setApi] = useState([]);
  const [ apiChegou, setApichegou] = useState(false);
  const history = useHistory();

     useEffect(() => {
      fetch('https://blooming-tundra-90089.herokuapp.com/computadores')
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result)
              setApi(result)
              setApichegou(true)
          })
     }, []);

     const exclui = async (patrimonio) => {
      await fetch(`https://blooming-tundra-90089.herokuapp.com/computadores/${patrimonio}`,
        {
          method: 'DELETE',
          headers: {
            'Access-Control-Allow-Origin':
              'https://blooming-tundra-90089.herokuapp.com',
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
        }
      );
      history.push('/computadores')
    };

    return (
        <>
        <S.Body>
          <S.Container>
            <S.Menu>
        <h1>Computadores</h1>
        <Button onClick={() => history.push('/novocomputador')}>Cadastrar computador</Button> 
        <S.Tabela>
          <p>NÚMERO DO PATRIMÔNIO</p>
          <p>ESPECIFICAÇÃO</p>
        </S.Tabela>
        </S.Menu>
      {
        !!api && apiChegou ? (
            api.map((item) => {
                 return  <S.Tabela> 
                    <div>{item.NUMERO_DO_PATRIMONIO}</div>
                    <div>{item.ESPECIFICACAO} </div>

                    <S.Btn>
                    <Button 
                     variant="danger" 
                     size="sm"
                      onClick={() => exclui(item.NUMERO_DO_PATRIMONIO)}>
                        Excluir</Button>
                    <Link to={'/editacomputador/' + item.NUMERO_DO_PATRIMONIO} >
                        <Button 
                        variant="warning" 
                        size="sm">Editar</Button>
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

export default MostraComputadores 

