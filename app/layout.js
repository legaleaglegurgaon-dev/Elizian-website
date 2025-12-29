import './globals.css'

export const metadata = {
  title: 'Elizian | Experience Luxury. Own Prestige.',
  description: 'Your gateway to lifestyle rewards, powered by blockchain. Book premium services and earn EZT tokens.',
  keywords: 'Elizian, EZT, luxury, rewards, blockchain, crypto, dining, events, healthcare, spa, wellness, travel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#141917] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
