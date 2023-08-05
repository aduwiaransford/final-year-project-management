import { Routes, Route, } from 'react-router-dom';


import Login from './scenes/login'; // Import the login component
import Dashboard from './scenes/dashboard';
import Assign from './scenes/assign';
import Students from './scenes/students';
import Lecturers from './scenes/lecturers';
import AddLecturer from './scenes/addLecturers';
import AddStudent from './scenes/addStudents';
import StudentWithSupervisor from './scenes/students/StudentWithSupervisor';
import PersonalPage from './scenes/students/PersonalPage';
import Categories from './scenes/projects/Categories';

import Layout from './scenes/Layout';

function App() {



  return (

    <div className="app">
      <Routes>

        <Route exact path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assign" element={<Assign />} />
          <Route path="/students" element={<Students />} />
          <Route path="/lecturers" element={<Lecturers />} />
          <Route path="/addlecturer" element={<AddLecturer />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path='/categories' element={<Categories />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/students-with-supervisor" element={<StudentWithSupervisor />} />
          <Route path="/students/:id" element={<PersonalPage />} />
        </Route>
        <Route />
      </Routes>
    </div>

  );
}

export default App;
