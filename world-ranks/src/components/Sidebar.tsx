const Sidebar = () => {
    return (
    <div className="flex items-center justify-center w-full h-full bg-red-400">
        <div className="bg-blue-300 w-[90%] h-[110%] mb-[80px] rounded-t-[30px] overflow-hidden">
                <div className='w-[100%] h-[9.5%] bg-green-600 flex'>
                    <div className="flex w-1/2 bg-blue-100"></div>
                    <div className="flex w-1/2 bg-amber-900"></div>
                </div>
                <div className = 'w-[100%] h-[90.5%] bg-pink-300 flex flex-row'>
                    <div className="w-[25%] bg-yellow h-[100%]"></div>
                    <div className="w-[75%] bg-amber-100"></div>
                </div>
        </div>
     </div>
    )
}

export default Sidebar;