import React, { useState , useEffect} from 'react';
import Input from '../../components/Form/Input';
import * as S from './Edita.styles';
import Button from 'react-bootstrap/Button'
import { useParams, useHistory } from 'react-router-dom';

const EditaEmprestimo = (props) => {
  const [ matricula, setMatricula] = useState('');
  const [ patrimonio, setPatrimonio] = useState('');
  const [ inicio, setInicio] = useState('');
  const [ fim, setFim] = useState('');
  const [status, setStatus] = useState({
    type:'',
    mensagem:''
});
  const { id } = useParams();
  const history= useHistory();
    console.log(id)

    useEffect(() => {
        fetch(
          `https://blooming-tundra-90089.herokuapp.com/emprestimos/${id}`)
          .then((res) => res.json())
          .then((result) => {
            setMatricula(result[0].MATRICULA_ESTUDANTE);
            setPatrimonio(result[0].NUM_PATRIMONIO_COMPUTADOR);
            setInicio(result[0].INICIO_EMPRESTIMO);
            setFim(result[0].FIM_EMPRESTIMO)
            console.log(result[0])
           
          });
      }, []);

      let data ={
        "MATRICULA_ESTUDANTE": matricula,
        "NUM_PATRIMONIO_COMPUTADOR": patrimonio,
        "INICIO_EMPRESTIMO": inicio,
        "FIM_EMPRESTIMO": fim
      }

    const edita = async () => {
      
        await fetch(`https://blooming-tundra-90089.herokuapp.com/emprestimos/${id}`,{
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
              onClick={edita}> Alterar </Button>
            </S.Btn>
        </S.Main>
        </>
    )
}

export default EditaEmprestimo
