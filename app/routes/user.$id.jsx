import { useLoaderData } from "@remix-run/react"

export async function loader({ context, params }) {
  const { env } = context
  const user = await env.DB.prepare("SELECT * FROM users WHERE id =?").bind(params.id).first()
  console.info("user:", user)
  return user
}

export default function UserDetail() {
  const user = useLoaderData()
  return (
    <div>
      <h1>User</h1>
      <p>id: {user.id}</p>
      <p>name: {user.name}</p>
      <p>created: {user.created}</p>
      <a href="/users">Users</a>
    </div>
  )
}
