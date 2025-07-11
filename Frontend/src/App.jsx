import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: ""
  });

  const [data, setData] = useState(null)
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const resData = await res.json()
      setData(resData.data)
      setMessage("✅ Data saved successfully!");
      console.log(res.data);
    } catch (error) {
      setMessage("❌ Error saving data.");
      console.error(error);
    }
  };
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">User Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}


        {
        data && (
          <table className='border w-full m-3'>
            <thead >
              <tr>
                <th className=' border-2 '>Name</th>
                <th className=' border-2'>Email</th>
                <th className=' border-2'>Number</th>
              </tr>
            </thead>
            <tbody>
              
              {
                data.map((item, index) => (
                  <tr key={index}>
                    <td className=' border-2'>{item.name}</td>
                    <td className=' border-2'>{item.email}</td>
                    <td className=' border-2'>{item.number}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
      </div>
      
    </>
  )
}

export default App
