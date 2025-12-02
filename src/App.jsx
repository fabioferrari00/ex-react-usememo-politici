import { useEffect, useState, useMemo } from "react"

function App() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("")

  const loadUsers = async () => {
    const res = await fetch(`http://localhost:3333/politicians`)
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const searchByName = user.name.toLowerCase().includes(search.toLowerCase());
      const searchByBio = user.biography.toLowerCase().includes(search.toLowerCase());
      return searchByName || searchByBio;
    })
  }, [users, search])

  return (
    <>
      <h1>Lista di politici</h1>
      <div className="container">
        <div className="row d-flex ">
          <input type="text" name="" id="" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cerca politico..." />
          {filteredUsers.map((u, i) => {
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
