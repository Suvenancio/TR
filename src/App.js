import './App.css';
import Computador from './Pages/NovoComputador';
import Emprestimos from './Pages/NovoEmpréstimos';
import Estudante from './Pages/NovoEstudante';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditaComputador from './Pages/EditaComputador';
import MostraComputadores from './Pages/MostraComputadores';
import MostraEstudante from './Pages/MostraEstudante';
import MostraEmprestimos from './Pages/MostraEmprestimos';
import Header from './components/Header';
import EditaEstudante from './Pages/EditaEstudante';
import EditaEmprestimo from './Pages/EditaEmprestimo';
import Home from './Pages/Home'

function App() {
  return (
    <>
   
   <BrowserRouter>
     
      <Header/>
      
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/estudantes" component={MostraEstudante} exact/>
          <Route path="/emprestimos" component={MostraEmprestimos} exact/>
          <Route exact path="/computadores" component={MostraComputadores} />
          <Route exact path="/novoemprestimo" component={Emprestimos} />
          <Route exact path="/novoestudante" component={Estudante} />
          <Route exact path="/novocomputador" component={Computador} />
          <Route exact path="/editacomputador/:numpatrimonio" component={EditaComputador} />
          <Route exact path="/editaemprestimo/:id" component={EditaEmprestimo} />
          <Route exact path="/editaestudante/:matricula" component={EditaEstudante} />
        </Switch>

      </BrowserRouter>
   
    </>
  );
}

export default App;
