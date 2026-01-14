import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Nav from './components/Nav';
import Container from './components/Container';
import Footer from './components/Footer';

library.add(fas);

function App() {
  return (
    <div className="App">
      <Nav />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
