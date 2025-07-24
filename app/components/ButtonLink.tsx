// components/ButtonLink.tsx
import Link from 'next/link'
import React from 'react'

interface ButtonLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children, className = '' }) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <a
        className={`inline-block cursor-pointer select-none px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${className}`}
        aria-label={`Lien vers ${href}`}
      >
        {children}
      </a>
    </Link>
  )
}

export default ButtonLink
