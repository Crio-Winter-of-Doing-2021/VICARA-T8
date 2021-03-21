import Header from './component/header/Header';
import Main from './component/landing/Main';
import Footer from './component/footer/Footer';
import Login from './component/auth/Login';
const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Main></Main>
      <Login></Login>
      <Footer></Footer>
    </div>
  );
};

export default App;
