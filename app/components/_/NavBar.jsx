import { Link, useLocation } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import Button from "./Button"
import Logo from "./Logo"

const SideBar = ({ links, onChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    window.addEventListener("click", handleClickOutside)

    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const toggleSelect = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (item) => {
    setIsOpen(false)
    onChange(item)
  }

  const linkClassName = () => "pb-2 link hover:border-b-2 active:bg-primary-500"
  return (
    <>
      <div ref={dropdownRef} className="flex justify-end pr-4 font-hand sm:hidden" {...props}>
        <Button className="link h-6 w-6" onClick={toggleSelect}>
          <span className="sr-only">Open sidebar</span>
          <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </Button>
      </div>

      <div
        className={`absolute right-0 top-20 z-[100] flex h-screen transform justify-end bg-gray-700 bg-opacity-70 transition-all duration-200 ease-in-out sm:hidden ${
          isOpen ? "w-full translate-x-0" : "w-0 translate-x-full border-l-0"
        } `}>
        <div
          className={`h-screen border-y-2 border-l-2 border-primary-500 bg-gray-700 bg-opacity-100 shadow-xl ${
            isOpen ? "w-3/4 translate-x-0" : "w-0 translate-x-full border-l-0"
          } `}>
          <ul className={`space-y-4 p-4 text-center text-xl ${isOpen ? "w-full" : "hidden"} `}>
            {links.map((item) => (
              <li key={`sidebar-${item.link}`}>
                <Link to={item.link} className={linkClassName(item.link)} onClick={() => handleItemClick(item)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default function NavBar({ className }) {
  const pathname = useLocation()?.pathname ?? ""
  const pagename = pathname.lastIndexOf("/") > 0 ? `/${pathname.split("/")[1]}` : pathname
  console.info("path:", pathname, "page:", pagename)

  const links = [
    { link: "/", label: "Home" },
    { link: "/users", label: "Users" },
  ]
  const linkClassName = (route) => `${route === pagename ? "border-b-2 border-primary-500" : ""} pb-2 link hover:border-b-2`

  return (
    <div className={`text-md container mx-auto p-2 font-semibold sm:p-4 sm:text-xl ${className}`}>
      <nav className=" flex h-16 items-center justify-between">
        <a className="flex-shrink-0 tracking-wider" href="/">
          <Logo />
        </a>
        <ul className="hidden justify-end font-hand sm:flex">
          {links.map((item) => (
            <li key={`nav-link-item-${item.link}`} className="ml-4 block sm:ml-6">
              <Link to={item.link} className={linkClassName(item.link)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <SideBar links={links} />
      </nav>
    </div>
  )
}
