import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navibar from './components/layout/Navibar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';

import {Col} from 'react-bootstrap'

import Project from './components/pages/Project';




function App() {


  const appStyles = {marginTop: "1.5em", paddingTop: "2em", paddingBottom: "4em"};
  const padding = {padding: "2em"}

  return (
    <Router>
      <Navibar/>
        <Col lg={12} style={appStyles}>
          <div style={padding}>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/company" element={<Company/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/newproject" element={<NewProject/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/project/:id" element={<Project/>}/>
            </Routes>
          </div>
        </Col>
      <Footer/>

    </Router>
  );
}

export default App;


