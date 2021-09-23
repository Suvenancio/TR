import React, { useState , useEffect} from 'react';
import Input from '../../components/Form/Input';
import * as S from './Edita.styles';
import Button from 'react-bootstrap/Button'
import { useParams, useHistory } from "react-router-dom";


const EditaComputador = (props) => {
    const [ patrimonio, setPatrimonio] = useState('');
    const [ especificacao, setEspecificacao] = useState('');
    const {numpatrimonio} = useParams();
    const [status, setStatus] = useState({
      type:'',
      mensagem:''
  });
    const history = useHistory();

    console.log(numpatrimonio)
    let data ={
      "numero_do_patrimonio": patrimonio,
      "especificacao": especificacao  
  }
    useEffect(() => {
        fetch(
          `https://blooming-tundra-90089.herokuapp.com/computadores/${numpatrimonio}`
        )
          .then((res) => res.json())
          .then((result) => {
            setPatrimonio(result[0].NUMERO_DO_PATRIMONIO);
            setEspecificacao(result[0].ESPECIFICACAO);
            console.log(result[0].ESPECIFICACAO)
          });
      }, []);

    const edita = async () => {
      console.log(patrimonio, especificacao)
        await fetch(`https://blooming-tundra-90089.herokuapp.com/computadores/${numpatrimonio}`,{
            method: 'PUT',            
            headers: {
                "Access-Control-Allow-Origin": "https://blooming-tundra-90089.herokuapp.com",
                "Accept" : "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((result) => result.json())
        .then((response) => {
           if(response.erro){
               setStatus({
                   type:'error',
                   mensagem: response.mensagem
               });
           }else{
              setStatus({
                  type:'success',
                  mensagem: response.mensagem
              });
           }
        }).catch(() =>{
          setStatus({
              type:'success',
              mensagem: "Não editado"
          });
        })
        
    };

    return (
        <>

        <S.Main>
        {status.type == 'success'? <p>Cadastro alterado com sucesso</p>:""}
        {status.type == 'error'? <p>Falha ao alterar, tente novamente!</p>:""}  
            <Input 
            label="Número de patrimônio"
             margin="10px"
             value={patrimonio}
            onChange={ e => setPatrimonio(e.target.value)} />
            <Input 
            label="Especificação" 
            margin="10px"
            value={especificacao}
            onChange={ e => setEspecificacao(e.target.value)}/>
            <S.Btn>
              <Button 
                  variant="warning"
                  onClick={() => history.push('/computadores')}> Voltar </Button>
              <Button
              variant="warning"
              onClick={edita}> ALTERAR </Button>
            </S.Btn>
        </S.Main>
        </>
    )
}

export default EditaComputador
