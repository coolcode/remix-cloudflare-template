import { redirect } from "@remix-run/cloudflare"
import { Form, useLoaderData } from "@remix-run/react"

export async function action({ context, request }) {
  const { env } = context
  const body = await request.formData()
  const item = {
    id: body.get("id"),
    name: body.get("name"),
    created: new Date().toDateString(),
  }
  console.info("item:", item)
  const { success } = await env.DB.prepare("insert into users (id, name, created) values (?, ?, ?)").bind(item.id, item.name, item.created).run()
  if (success) {
    return redirect(`/user/${item.id}`)
  } else {
    return redirect("error")
  }
}

export async function loader({ context }) {
  const { env } = context
  const { results } = await env.DB.prepare("SELECT * FROM users LIMIT 10").all()
  return results
}

export default function Users() {
  const data = useLoaderData()
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.id},&nbsp;<a href={`/user/${user.id}`}>{user.name}</a>
          </li>
        ))}
      </ul>
      <h1>New</h1>
      <Form method="post">
        <input type="text" name="id" placeholder="user id" />
        <br />
        <input type="text" name="name" placeholder="user name" />
        <br />
        <button type="submit">Create User</button>
      </Form>
      <a href="/">Home</a>
    </div>
  )
}
