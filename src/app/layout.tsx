// ... (Previous imports remain the same)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* ... (Previous scripts remain the same) ... */}
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* CHANGED: Theme color is now Pink for the USA market */}
        <meta name="theme-color" content="#db2777" />

        {/* ... (Remaining Head content) ... */}
      </head>
      <body className={font.className}>
        <Header />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  )
}