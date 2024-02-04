export default function Button({ text, icon, className, children, ...props }) {
  return (
    <button className={`font-semibold ${!text ? "link" : "button"} ${className}`} {...props}>
      {icon && <i className={`${icon}`}></i>}
      {text && <span className="ml-2">{text}</span>}
      {children}
    </button>
  )
}
