import React, { useState , useEffect} from 'react';
import Input from '../../components/Form/Input';
import * as S from './EditaEstudante.styles';
import Button from 'react-bootstrap/Button'
import { useParams, useHistory } from 'react-router-dom';

const EditaEstudante = (props) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    type:'',
    mensagem:''
});
  const [nascimento, setNascimento] = useState("");
    const { matricula} = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`https://blooming-tundra-90089.herokuapp.com/estudantes/${matricula}`)
          .then((res) => res.json())
          .then((result) => {
            setNome(result[0].NOME);
            setEmail(result[0].EMAIL);
            setNascimento(result[0].DATA_DE_NASCIMENTO)
            console.log(result)
          });
      }, []);

      let data = {
        "nome": nome,
        "email": email,
        "data_de_nascimento": nascimento
    };
    const altera = async () => {
        await fetch(`https://blooming-tundra-90089.herokuapp.com/estudantes/${matricula}`,{
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
            <Input label="Nome" 
            name="NOME" 
            width="400px"
              margin="10px"
              value={nome}
            onChange={ e => setNome(e.target.value)} />
            <Input label="Email" 
            name="EMAIL" 
              width="400px" 
              margin="10px"
              value={email}
            onChange={ e => setEmail(e.target.value)} />
            <Input label="Data de Nascimento" 
            name="DATA_DE_NASCIMENTO" 
            type="date"
              width="150px"
                margin="10px"
                value={nascimento}
            onChange={ e => setNascimento(e.target.value)} />
            <S.Btn>
            <Button 
                  variant="warning"
                  onClick={() => history.push('/estudantes')}> Voltar </Button>
            <Button 
            variant="warning"
            onClick={altera}> Alterar </Button>
            </S.Btn>
    </S.Main>
        </>
    )
}

export default EditaEstudante
