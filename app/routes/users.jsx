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
    <div className="space-y-4">
      <h1 className="text-4xl">Create</h1>
      <Form method="post" className="">
        <div className="mb-4">
          <label className="label">Name</label>
          <input className="w-100 text mt-2 text-xl" type="text" name="id" placeholder="user id" />
        </div>
        <div className="mb-4">
          <label className="label">Words</label>
          <input className="w-100 text mt-2 text-xl" type="text" name="name" placeholder="user name" />
        </div>
        <button className="button primary text-xl" type="submit">
          Create User
        </button>
      </Form>
      <hr />
      <h1 className="text-4xl">Users</h1>
      <ul className="mt-4">
        {data.map((user) => (
          <li className="py-2" key={user.id}>
            <span className="">#{user.id}</span>
            <a className="ml-4 border-b-2 border-primary-500" href={`/user/${user.id}`}>
              {user.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
