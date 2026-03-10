
const InfoCard = (Name,Content) => {
  return (
    <div>
        <div className='shadow-xl rounded-xl p-2'>
            <div className='bg-green-100 h-auto w-full text-center'>img</div>
            <div className='flex flex-col'>
                <span className="text-md">@name</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo sit suscipit quasi temporibus numquam.</p>
            </div>
        </div>
    </div>
  )
}

export default InfoCard