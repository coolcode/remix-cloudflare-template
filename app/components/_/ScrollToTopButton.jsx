import { useEffect, useState } from "react"

export default function ScrollToTopButton({ ...props }) {
  const [isVisible, setIsVisible] = useState(false)

  // Add a scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // If the user has scrolled down 200 pixels or more, show the button
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      // Clean up the event listener
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div {...props}>
      {isVisible && (
        <button
          className="fixed bottom-6 right-6 rounded-full border-2 border-white bg-primary-500 px-4 py-2 font-semibold text-white hover:brightness-125"
          onClick={scrollToTop}>
          <i className="fa fa-plane-up mr-2"></i>To Top
        </button>
      )}
    </div>
  )
}
