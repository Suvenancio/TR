import React, { useState } from 'react';
import Input from '../../components/Form/Input';
import * as S from './Computador.styled';
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom';

const Computador = (props) => {
    const [ patrimonio, setPatrimonio] = useState('');
    const [ especificacao, setEspecificacao] = useState('');
    const [status, setStatus] = useState({
        type:'',
        mensagem:''
});
const history = useHistory();

    let data ={
        "numero_do_patrimonio": patrimonio,
        "especificacao": especificacao  
    }
    const inclui = async () => {
      console.log(patrimonio, especificacao)
        await fetch('https://blooming-tundra-90089.herokuapp.com/computadores',{
            method: 'POST',            
            headers: {
                "Access-Control-Allow-Origin": "https://blooming-tundra-90089.herokuapp.com/computadores",
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
            {status.type == 'success'? <p>Cadastro incluído com sucesso</p>:""}
            {status.type == 'error'? <p>Falha ao cadastrar, tente novamente!</p>:""}    
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
                onClick={inclui}> Incluir </Button>
            </S.Btn>
        </S.Main>

        </>
    )
}

export default Computador
