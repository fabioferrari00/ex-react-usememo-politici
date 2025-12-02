import { useEffect, useState } from "react"

function App() {

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await fetch(`http://localhost:3333/politicians`)
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <>
      <h1>Lista di politici</h1>
      <div className="container">
        <div className="row d-flex ">
          {users.map((u, i) => {
            return (
              <div key={i} className="col-4">
                <h3>{u.name}</h3>
                <img src={u.image} alt="" />
                <span><strong>{u.position}</strong></span>
                <p>{u.biography}</p>
              </div>
            )
          })}
        </div>
      </div >
    </>
  )
}

export default App
