import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SuccessPage, VerificationPage } from './pages';

const PageNotFound = () => <h1>404, this page doesn't exist</h1>;

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route exact path='/' component={VerificationPage}/>
        <Route exact path='/success' component={SuccessPage}/>
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </div>
);

export default App;
