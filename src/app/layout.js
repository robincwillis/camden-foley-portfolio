import { Open_Sans } from "next/font/google"
import localFont from 'next/font/local'
import { ViewTransitions } from 'next-view-transitions'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "./globals.css"

import { getSite } from '@/lib/api/site'
import { getAllPages } from '@/lib/api/pages'
import { AppProvider } from '@/app/_context/app-context'

// import { revalidatePath } from 'next/cache'
// revalidatePath('/', 'layout')

import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import Transition from '@/app/_components/page-transition';

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });


const halyard = localFont({
  src: [
    {
      path: '../../public/fonts/Halyard/Halyard_Display_Light.otf',
      weight: '300'
    },
    {
      path: '../../public/fonts/Halyard/Halyard_Display_Book.otf',
      weight: '400'
    },
    {
      path: '../../public/fonts/Halyard/Halyard_Display_Regular.otf',
      weight: '500'
    },
    {
      path: '../../public/fonts/Halyard/Halyard_Display.otf',
      weight: '600'
    }
  ],
  variable: '--font-halyard'
})

const site = await getSite(process.env.SITE_ID)
const pages = await getAllPages()

export const metadata = {
  title: {
    template: `%s | ${site.title}`,
    default: site.title,
  },
   
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body className={`${halyard.variable} ${openSans.variable} font-sans font-normal bg-white h-screen flex flex-col`}>
          <AppProvider site={site}>
            <Header pages={pages} />
            <Transition>
              {children}
            </Transition>
            <Footer site={site} />
          </AppProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
