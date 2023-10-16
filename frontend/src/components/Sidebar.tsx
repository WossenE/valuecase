import arrow from '../assets/arrow.svg';
import Button from './Button';

interface SidebarProps {
  setInputType: (inputType: 'text' | 'image' | 'editText') => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

function Sidebar({ setInputType, toggleSidebar, isSidebarOpen, setIsModalOpen }: SidebarProps) {

  return (
    <section
      className={`fixed left-0 top-0 bottom-0 bg-gray-800 w-64 duration-500 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      <button
        className={`absolute top-20 duration-500 hover:scale-105 ${
          isSidebarOpen ? 'rotate-180 right-[-2rem]' : 'right-[-3rem]'
        }`}
        onClick={toggleSidebar}
      >
        <img src={arrow} alt="" />
      </button>
      <h1 className="text-3xl text-center text-white py-8 font-bold">
        Valuecase
      </h1>
      <div className="container mt-20 mx-auto p-4 flex flex-col gap-8">
        <Button action={() => {setInputType('text'), setIsModalOpen(true)}} lable="Add Text" />
        <Button action={() => {setInputType('image'), setIsModalOpen(true)}} lable="Add Image" />
      </div>
    </section>
  );
}

export default Sidebar;
