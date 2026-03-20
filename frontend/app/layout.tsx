import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ReplyGen | AI Email Assistant',
  description: 'Generate professional email replies in seconds using GPT-4.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-full scroll-smooth'>
      <body
        className={`${inter.className} bg-slate-50 h-full text-slate-900 antialiased`}
      >
        <div className='flex flex-col min-h-screen'>
          {/* Header / Navbar */}
          <header className='sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-md'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
              {/* Logo Area */}
              <div className='flex items-center gap-3 group cursor-pointer'>
                <div className='w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform'>
                  R
                </div>
                <div className='flex flex-col leading-none'>
                  <span className='text-lg font-bold tracking-tight text-slate-900'>
                    ReplyGen
                  </span>
                  <span className='text-[10px] font-medium text-blue-600 tracking-widest uppercase'>
                    Architect
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className='hidden md:flex gap-8 text-sm font-semibold'>
                <a href='/' className='text-blue-600 transition-colors'>
                  Generator
                </a>
                <a
                  href='#'
                  className='text-slate-500 hover:text-blue-600 transition-colors'
                >
                  Analytics
                </a>
                <a
                  href='#'
                  className='text-slate-500 hover:text-blue-600 transition-colors'
                >
                  API Settings
                </a>
              </nav>

              {/* Action Button (Optional) */}
              <div className='flex items-center gap-4'>
                <div className='hidden sm:block h-4 w-1px bg-slate-200'></div>
                <button className='text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all active:scale-95'>
                  Upgrade
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className='grow w-full py-8 md:py-12'>
            {/* Standardized container for all pages */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className='border-t bg-white'>
            <div className='max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4'>
              <p className='text-sm text-slate-500'>
                © {new Date().getFullYear()} ReplyGen Architect. Built for
                efficiency.
              </p>
              <div className='flex gap-6 text-xs font-medium text-slate-400'>
                <a href='#' className='hover:text-slate-600 transition'>
                  Privacy Policy
                </a>
                <a href='#' className='hover:text-slate-600 transition'>
                  Terms of Service
                </a>
                <a href='#' className='hover:text-slate-600 transition'>
                  Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
