export async function loader({ context, request }) {
  const { env } = context
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")?.trim()
  if (!id) {
    throw new Response("No id", { statue: 404 })
  }
  console.info("user-save->id:", id)
  const name = searchParams.get("name")?.trim()
  const { success } = await env.DB.prepare("insert into users (id, name, created) values (?, ?, ?)").bind(id, name, new Date().toDateString()).run()
  if (success) {
    return { success, id, name }
  } else {
    return { success: false, id, name }
  }
}
