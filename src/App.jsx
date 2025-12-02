import React, { useEffect, useState, useMemo } from "react"

const UserCard = React.memo(({ name, image, position, biography }) => {
  console.log("prova" + name)
  return (
    <div className="col-4">
      <img src={image} alt="" />
      <h3>{name}</h3>
      <span><strong>{position}</strong></span>
      <p>{biography}</p>
    </div>
  );
})
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
        <div className="row gy-3 d-flex">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cerca politico..."
          />
          {filteredUsers.map(u => {
            return (
              <UserCard key={u.id} {...u} />
            )
          })}
        </div>
      </div >
    </>
  )
}

export default App
