import "@/styles/globals.css"
import type { Metadata } from 'next'
//import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from '@/redux/redux_useclient_export.js'; 
import { QueryClientProv } from '@/tanstackquery/queryclient_useclient_export'; 
import { Toaster } from "@/components/ui/toaster"
//import NextAuthProvider from '@/context/NextAuthProvider'


export const metadata: Metadata = {
	title: {
		default: 'My app',
		template: 'My app'
	},
	description: 'This is the Awesome App.',
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`min-h-screen bg-background text-foreground font-sans antialiased`} >
        {/* <NextAuthProvider> */}
          <ReduxProvider>
            <QueryClientProv>
                { children }
                <Toaster />
            </QueryClientProv>
          </ReduxProvider>
				{/* </NextAuthProvider> */}
      </body>
    </html>
  )
}
