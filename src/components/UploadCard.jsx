const UploadCard = ({ Title, onChange }) => {
  return (
    <div className="p-4 flex justify-center flex-1">
      <div className="flex flex-col justify-between p-4 text-center w-1/2 rounded-xl shadow-md h-full">

        <div className="bg-white w-full p-4 text-center rounded-lg border border-dashed border-gray-300 hover:border-yellow-600 transition">
          <input
            type="file"
            onChange={onChange}
            className="text-center w-full cursor-pointer text-sm text-gray-600 p-2"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="font-semibold text-gray-700">{Title}</p>

          <button className="px-4 py-1.5 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition shadow">
            View
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadCard
