import React, { useState, useEffect } from 'react'
import { FaChevronUp } from 'react-icons/fa'

const GoTop: React.FC = () => {
  const [isVisible, setisVisible] = useState(false)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      toggleVisibility()
    })
  }, [])

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setisVisible(true)
    } else {
      setisVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <div role="presentation" className='go-top active' onClick={scrollToTop}>
          <FaChevronUp style={{ height: "100%" }} />
        </div>
      )}
    </>
  )
}

export default GoTop
