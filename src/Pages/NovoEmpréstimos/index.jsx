import React from 'react';
import Input from '../../components/Form/Input';
import Button from 'react-bootstrap/Button';
import * as S from './Emprestimo.styles';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const Emprestimos = () => {
    const [ matricula, setMatricula] = useState('');
    const [ patrimonio, setPatrimonio] = useState('');
    const [ inicio, setInicio] = useState('');
    const [ fim, setFim] = useState('');
    const [status, setStatus] = useState({
        type:'',
        mensagem:''
    });
    const history = useHistory();

    let data = {
        "MATRICULA_ESTUDANTE": matricula,
        "NUM_PATRIMONIO_COMPUTADOR": patrimonio,
        "INICIO_EMPRESTIMO": inicio,
        "FIM_EMPRESTIMO": fim
    }
    const inclui = async () => {
      
        await fetch('https://blooming-tundra-90089.herokuapp.com/emprestimos',{
            method: 'POST',            
            headers: {
                "Access-Control-Allow-Origin": "https://blooming-tundra-90089.herokuapp.com/emprestimos",
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
            label="Matricula do Estudante"
             margin="10px" 
            value={matricula}
            onChange={ e => setMatricula(e.target.value)}/>
            <Input
             label="Número do patrimônio do computador" 
             margin="10px"
            value={patrimonio}
            onChange={ e => setPatrimonio(e.target.value)}/>
            <Input
             label="Inicio do empréstimo"
              type="date"
               margin="10px"
            value={inicio}
            onChange={ e => setInicio(e.target.value)}/>
            <Input
             label="Término do empréstimo"
              type="date"
               margin="10px"
            value={fim}
            onChange={ e => setFim(e.target.value)}/>
            <S.Btn>
            <Button 
                variant="warning"
                onClick={() => history.push('/emprestimos')}> Voltar </Button>
            <Button 
            variant="warning"
            onClick={inclui}> Incluir </Button>
            </S.Btn>
        </S.Main>
        </>
    )
}

export default Emprestimos
