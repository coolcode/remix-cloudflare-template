export async function loader({ context }) {
  const { env } = context
  const { results } = await env.DB.prepare("SELECT * FROM users LIMIT 5").all()
  return results
}
