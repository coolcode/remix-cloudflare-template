import { useLoaderData } from "@remix-run/react"

export async function loader() {
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]
}

export default function Users() {
  const data = useLoaderData()
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
