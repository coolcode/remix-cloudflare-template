export async function loader({ context, params }) {
  const { env } = context
  const user = await env.DB.prepare("SELECT * FROM users WHERE id =?").bind(params.id).first()
  console.info("user:", user)
  return user
}
