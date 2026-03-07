import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className='w-full bg-blue-200 h-1/4'>     
         <Header />   
      </div>
      <div className="flex flex-1">
        <Sidebar />
      </div>
    </div>
  );
};

export default App;