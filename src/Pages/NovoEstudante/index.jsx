import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Input from '../../components/Form/Input';
import * as S from './Estudante.styles';
import { useHistory } from "react-router-dom";

const Estudante = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [status, setStatus] = useState({
            type:'',
            mensagem:''
    });
    const history = useHistory();

    let data = {
        "nome": nome,
        "email": email,
        "data_de_nascimento": nascimento
    }

    const inclui = async () => {
        console.log(nome, email, nascimento)
          await fetch('https://blooming-tundra-90089.herokuapp.com/estudantes',{
              method: 'POST',            
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
            {status.type == 'success'? <p>Cadastro incluído com sucesso</p>:""}
            {status.type == 'error'? <p>Falha ao cadastrar, tente novamente!</p>:""}
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
            onClick={inclui}> Incluir </Button>
            </S.Btn>.
        </S.Main>
        </>
    )
}

export default Estudante
